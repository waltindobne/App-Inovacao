"use client";
import { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Hash, DatabaseZap, FileUser, Medal, Tags, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { Candidate, useData, Vacancy } from "@/Context/AppContext";
import { CandidateService, RankingService, VacancyService } from "@/Services/WebApi";

const Enum = ["", "BNE", "TBR"]

function Page() {
    const router = useRouter();
    const [modalClass, setModalClass] = useState("scale-0 opacity-0");

    const [vacancy, setVacancy] = useState<Vacancy | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    const [idCandidate, setIdCandidate] = useState<number | null>(null);
    const [idVaga, setIdVaga] = useState<number | null>(null);
    const [origemEnum, setOrigemEnum] = useState<number | null>(null);


    useEffect(() => {
        const idC = Number(localStorage.getItem('idCandidate'));
        const idV = Number(localStorage.getItem('idVaga'));
        const origem = Number(localStorage.getItem('origem'));

        setIdCandidate(idC);
        setIdVaga(idV);
        setOrigemEnum(origem);
    }, []);

    useEffect(() => {
        if (idVaga == null || origemEnum == null) return;
        const fetchRanking = async () => {
            try {
                console.log("idVaga:", idVaga, "origemEnum:", origemEnum);
                const responseRanking = await RankingService.GetAllRankingsByVacancyId(idVaga);
                const responseVacancy = await VacancyService.GetVacancyByExternalId(idVaga, origemEnum);
                setVacancy(responseVacancy.data);

                if (!responseRanking || !responseRanking.data || responseRanking.data.length === 0) {
                    const response = await RankingService.CreateRankingByIA(origemEnum, idVaga);
                    setCandidates(response.data);
                    console.log("Candidatos retornados:", response.data);
                } else {
                    console.log('Ranking ja existente na base de dados, não foi gerado, caso queira clique para gerar manualmente');
                    console.log("Dados do ranking existentes:", responseRanking.data);
                    setCandidates(responseRanking.data);
                }
            } catch (error) {
                console.log('Erro ao listar o ranking:', error);
            }
        };

        fetchRanking();
    }, [idVaga]);

    const OpenCV = async (e: React.MouseEvent, candidato: Candidate) => {
        try {
            const response = await CandidateService.GetCandidateById(candidato.origemEnum, candidato.idf_Candidate);
            setSelectedCandidate(response.data);
            console.log('Sucesso ao encontrar o candidato', response.data);

            setTimeout(() => {
                setModalClass("scale-100 opacity-100");
            }, 10);
        } catch (error) {
            console.log('Erro ao tentar listar os dados do candidato', error);
        }
    }
    const closeModal = () => {
        setModalClass("scale-0 opacity-0");
        setTimeout(() => {
            setSelectedCandidate(null);
        }, 200);
    };

    const handleRanking = async () => {
        try {
            if (!origemEnum || !idVaga) return;
            const response = await RankingService.CreateRankingByIA(origemEnum, idVaga);
            setCandidates(response.data);
            console.log("Candidatos retornados:", response.data);
            router.push('/Ranking');
        }
        catch (error) {
            console.log('Erro ao tentar criar o ranking manualmente: ', error);
        }
    }

    // nesta função abaixo de listar da maior porcentagem para a menor ele pega somente até 50% menos que isso ele não pega

    /*const ordenarPorAptidao = (lista:Candidate[]) => {
        return [...lista]
        .filter(candidato => candidato.percentage > 50)
        .sort((a, b) => b.percentage - a.percentage );
    };*/

    // nessa aqui ele pega todos desde o maior até o menor

    const ordenarPorAptidao = (lista: Candidate[]) => {
        return [...lista]
            .sort((a, b) => b.percentage - a.percentage);
    };

    return (
        <div className="w-4/5 mx-auto my-10">
            {candidates.length === 0 ? (
                <div className="bg-[rgb(0,0,0,0.5)] w-full inset-0 h-screen fixed flex flex-col items-center justify-center space-y-4 p-8">
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div className="w-28 h-28 border-8 animate-spin border-gray-300 flex items-center justify-center border-t-blue-800 rounded-full">
                            <svg viewBox="0 0 24 24" height="3em" width="3em" className="animate-ping">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="200%" x2="0%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: '#5ee9b5', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#38bdf8', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
                                    fill="url(#grad1)"
                                />
                            </svg>
                        </div>
                        <p className="text-xl">Carregando...</p>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full py-6 px-8 bg-sky-800 rounded-2xl ">
                            <div className="w-full flex justify-between items-center mb-2">
                                <h1 className="text-2xl font-bold text-amber-100">{vacancy?.vacancyName}</h1>
                                <button onClick={handleRanking} className="py-2 px-4 border-2 border-green-800 bg-green-500 rounded-xl text-slate-50 font-bold translate cursor-pointer">Atualizar Ranking</button>
                            </div>
                            <p>{vacancy?.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <p className="flex"><Hash className="mr-2 text-sky-400" />id: {vacancy?.id}</p>
                                <p className="flex"><DatabaseZap className="mr-2 text-orange-400" />Origem: {Enum[vacancy?.origemEnum ?? 0]}</p>
                                <p className="flex"><UserCog className="mr-2 text-green-400" />Creador: {vacancy?.vacancyCreator}</p>
                            </div>
                        </div>
                    </div>
                    <h1 className="w-full flex justify-center text-2xl text-blue-900 mt-5">Ranking dos Candidatos - {candidates.length}</h1>
                    <div className="w-full flex justify-center flex-wrap">
                        {ordenarPorAptidao(candidates).map((candidato, index) => (
                            <button className="w-96 min-h-40 p-4 border-2 border-blue-900 rounded-2xl flex text-slate-800 m-1.5 hover:bg-slate-200 hover:text-sky-900 hover:scale-102 cursor-pointer transition duration-200 ease-in-out" key={index} /*onClick={(e) => OpenCV(e,candidato)}*/>
                                <div className="">
                                    <div className="flex w-full justify-between">
                                        <h1 className={`mr-1 flex items-center ${index + 1 === 1 ? "text-yellow-500" : index + 1 === 2 ? "text-gray-500" : index + 1 === 3 ? "text-orange-500" : "" }`}>
                                            <b className="mr-1 flex items-center">
                                                <Medal className={`mr-1 flex items-center ${index + 1 === 1 ? "text-yellow-500" : index + 1 === 2 ? "text-gray-500" : index + 1 === 3 ? "text-orange-500" : "text-blue-600" }`} />N°:
                                            </b>
                                            {index + 1}
                                        </h1>
                                        <div className="flex">
                                            <h1 className="flex font-bold items-center">Porcentagem:<p className="ml-1 font-light">{candidato.percentage}%</p></h1>
                                        </div>
                                        <div className="flex">
                                            <button onClick={(e) => OpenCV(e, candidato)} className="mr-2 font-bold text-green-700 hover:scale-110 cursor-pointer flex">CV<FileUser /></button>
                                        </div>
                                    </div>
                                    <div className=" mt-2">
                                        <td>{candidato.reason.slice(0, 130)}{candidato.reason.length > 130 ? "..." : ""}</td>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {selectedCandidate && (
                <div className="fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center text-slate-800" onClick={closeModal}>
                    <div className={`transform transition-all duration-200 ease-out ${modalClass} w-3xl max-h-full bg-white p-10 overflow-auto shadow-xl relative`} onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-4 right-4 text-red-600 hover:text-red-500 cursor-pointer" onClick={closeModal}>X</button>
                        <div className="flex items-start pb-4 border-b border-gray-400 mb-7">
                            <div className="text-sm space-y-2">
                                <div className="flex text-lg">
                                    <b className="mr-2">Nome:</b>
                                    <p>{selectedCandidate.candidateName}</p>
                                </div>
                                {/*<div className="flex text-lg">
                                <b className="mr-2">Porcentagem:</b>
                                <p>{selectedCandidate.percentage}</p>
                            </div>*/}
                                <div className="flex text-lg">
                                    <b className="mr-2">Vaga:</b>
                                    <p>{vacancy?.vacancyName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 text-md w-full">
                            <div>
                                {selectedCandidate.candidate_CV}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Page;