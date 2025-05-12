"use client";
import { SendHorizonal, ArrowBigLeft, FileUser, Tags, DatabaseZap, UserCog, Medal, Hash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, Key, } from "react";
import { Candidate, useData, Vacancy } from "@/Context/AppContext";
import { CandidateService, VacancyService } from "@/Services/WebApi";
import Entrevista from "@/components/generator/page";
import axios from "axios";

const Enum = [
    "",
    "BNE",
    "TBR"
]

function Page() {
    const router = useRouter();
    const [isOpenEntrevista, setIsOpenEntrevista] = useState(false);
    const [modalClass, setModalClass] = useState("scale-0 opacity-0");
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [selectedVaga, setSelectedVaga] = useState<Vacancy | null>(null);

    const [externalId, setExternalId] = useState('');
    const [origem, setOrigem] = useState(1);

    useEffect(() => {
        const idVaga = Number(localStorage.getItem('idVaga'));
        const origem = Number(localStorage.getItem('origem'));
        VacancyService.GetVacancyByExternalId(idVaga, origem)
            .then((response) => {
                console.log('vaga:', response.data);
                setSelectedVaga(response.data);
            })
            .catch((error) => {
                console.log('Erro ao tentar retornar a vaga: ', error);
            });
        CandidateService.GetAllCandidates(idVaga, origem)
            .then((response) => {
                console.log(response.data);
                setCandidates(response.data);
            })
            .catch((error) => {
                console.log('Erro ao tentar retornar os candidato:', error);
            })
    }, [])

    const handleCandidatosVaga = async () => {
        try {
            localStorage.setItem('idVaga', String(externalId));
            localStorage.setItem('origem', String(origem));
            console.log(origem);
            const responseVaga = await VacancyService.GetVacancyByExternalId(Number(externalId), origem);
            console.log('Vaga Encontrada:', responseVaga);
            setSelectedVaga(responseVaga.data);

            const responseCandidates = await CandidateService.GetAllCandidates(responseVaga.data.id, origem);
            console.log(responseCandidates);
            setCandidates(responseCandidates.data);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Detalhes do erro:', error.response?.data);
            }
        }
    }

    const toggleEntrevista = (candidate: Candidate) => {
        localStorage.setItem('idCandidate', String(candidate.id));
        setSelectedCandidate(candidate);
        router.push('/generator');
    };

    const handleToRanking = () => {
        router.push('/Ranking')
    }

    const handleAlterVacancacy = () => {
        setCandidates([]);
        setSelectedVaga(null);
        setExternalId('');
    };


    const OpenCV = (e: React.MouseEvent, candidato: Candidate) => {
        e.stopPropagation();
        setSelectedCandidate(candidato);
        setTimeout(() => {
            setModalClass("scale-100 opacity-100");
        }, 10);
    };
    const closeModal = () => {
        setModalClass("scale-0 opacity-0");
        setTimeout(() => {
            setSelectedCandidate(null);
        }, 200);
    };
    return (
        <div className="w-4/5 mx-auto py-10">
            <div className="w-full bg-white">
                <div className="w-full flex justify-center items-center">
                    <div className="w-full py-6 px-8 bg-sky-800 rounded-2xl">
                        <div className="w-full mb-3 flex justify-between items-center">
                            <h1 className="text-2xl text-amber-100 font-bold">{selectedVaga?.vacancyName}</h1>
                            <button onClick={handleAlterVacancacy} className="py-2 px-4 border-2 border-red-800 bg-red-500 rounded-xl text-slate-50 font-bold translate cursor-pointer">Trocar de Vaga</button>
                        </div>
                        <p>{selectedVaga?.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="flex"><Hash className="mr-2 text-sky-400" />id: {selectedVaga?.id}</p>
                            <p className="flex"><DatabaseZap className="mr-2 text-orange-400" />Origem: {Enum[selectedVaga?.origemEnum ?? 0]}</p>
                            <p className="flex"><UserCog className="mr-2 text-green-400" />Criador: {selectedVaga?.vacancyCreator}</p>
                            <button onClick={handleToRanking} className="flex cursor-pointer bg-yellow-300 text-slate-800 font-semibold px-3 py-2 rounded-lg"><Medal className="text-sky-800 mr-2" />Ranking</button>
                        </div>
                    </div>
                </div>

                <h1 className="w-full flex justify-center my-5 text-2xl text-blue-900">Candidatos - {candidates.length}</h1>

                <div className="w-full flex justify-center flex-wrap">
                    {candidates.map((candidato: Candidate, index: Key | null | undefined) => (
                        <button
                            key={index}
                            onClick={() => toggleEntrevista(candidato)}
                            className="w-96 h-62 p-4 border-2 border-blue-900 rounded-2xl flex flex-col justify-between text-slate-800 m-1.5  hover:bg-slate-200 hover:text-sky-900 hover:scale-102 cursor-pointer transition duration-200 ease-in-out"
                        >
                            <div className="flex flex-col w-full space-y-1">
                                <div className="flex flex-col justify-start items-start space-y-1">
                                    <div className="flex">
                                        <p className="mr-2 font-bold flex items-center"><Tags className="text-green-500 mr-1" />Nome:</p>
                                        <p>{candidato.candidateName}</p>
                                    </div>
                                    <div className=" w-full flex items-center justify-between">
                                        <div className="flex">
                                            <p className="mr-2 font-bold flex items-center"><Hash className="mr-1 text-blue-600" />Id:</p>
                                            <p className="">{candidato.id}</p>
                                        </div>
                                        <div className="flex">
                                            <p className="mr-2 font-bold flex items-center"><DatabaseZap className="mr-1 text-orange-600" />Origem:</p>
                                            <p className="">{Enum[candidato.origemEnum ?? 0]}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-justify">
                                    <p className="font-bold">Curriculo:</p>
                                    <p>{candidato.candidate_CV.slice(0, 135)}{candidato.candidate_CV.length > 135 ? "..." : ""}</p>
                                </div>

                            </div>
                            <button className="p-2 rounded-xl bg-green-500 mt-2 font-bold text-white cursor-pointer">Entrevistar</button>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Page;