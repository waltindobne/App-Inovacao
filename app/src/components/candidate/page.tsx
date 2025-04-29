"use client";
import { SendHorizonal , ArrowBigLeft, FileUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect, Key} from "react";
import { Candidate, useData, Vacancy } from "@/Context/AppContext";
import { CandidateService, VacancyService } from "@/Services/WebApi";
import Entrevista from "@/components/generator/page";
import axios from "axios";

const Enum = [
    "",
    "BNE",
    "TBR"
]

function Page(){
    const router = useRouter();
    const [isOpenEntrevista, setIsOpenEntrevista] = useState(true);
    const [modalClass, setModalClass] = useState("scale-0 opacity-0");
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [selectedVaga, setSelectedVaga] = useState<Vacancy | null>(null);

    const [externalId, setExternalId] = useState('');
    const [origem, setOrigem] = useState(1);

    const handleCandidatosVaga = async() => {
        try{
            localStorage.setItem('idVaga', String(externalId));
            localStorage.setItem('origem', String(origem));
            console.log(origem)
            const responseVaga = await VacancyService.GetVacancyByExternalId(Number(externalId), origem);
            console.log('Vaga Encontrada:', responseVaga);
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
        setTimeout(() => {
            setModalClass("scale-100 opacity-100");
        }, 10);
    };

    const handleToRanking = () => {
        router.push('/Ranking')
    }

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
    return(
        <div className="w-4/5 mx-auto py-10">
            
            <div className="w-full flex flex-wrap justify-center items-center">
            {candidates.length === 0 ? (
                <div className="w-full h-screen bg-[rgb(0,0,0,0.5)] fixed inset-0 flex justify-center items-center">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleCandidatosVaga();
                        }} className="w-xl p-6 bg-white rounded-xl">

                        <h1 className="
                        text-red-900 w-full bg-red-300 flex justify-center p-4 border border-red-700 rounded-2xl">!! Nenhuma Vaga foi selecionada passe a Origem e o Idf da Vaga !!</h1>
                        <select name="OrigemEnum" className="w-full p-3 mt-6 bg-gray-300 rounded-lg text-slate-800 outline-0 cursor-pointer"
                        value={origem} onChange={(e) => setOrigem(Number(e.target.value))}>
                            <option value="1" className="">BNE</option>
                            <option value="2" className="">TBR</option>
                        </select>
                        <input type="number" placeholder="Idf da Vaga" className="w-full px-3 py-2 mt-3 rounded-lg bg-gray-300 text-slate-800 outline-0" value={externalId} onChange={(e) => setExternalId(e.target.value)}/>
                        <button className="w-full p-2 mt-6 bg-gray-100 border-2 border-green-500 rounded-lg text-slate-800 font-bold hover:bg-green-500 hover:text-white transition duration-200 cursor-pointer">Confirmar</button>
                    </form>
                </div>
                ) : (
                <div className="w-full bg-white shadow-lg shadow-slate-500 rounded-2xl">
                    <div className="w-full flex justify-center items-center mb-10">
                        <div className="w-full py-6 px-8 bg-sky-900 rounded-t-2xl ">
                            <h1 className="text-2xl font-bold">Nome</h1>
                            <p>Description</p>
                            <div className="flex justify-around mt-4">
                                <p>id</p>
                                <p>Origem</p>
                                <p>Creador</p>
                                <p>Update</p>
                            </div>
                        </div>
                    </div>

                    {candidates.map((candidato: Candidate, index: Key | null | undefined) => (
                    <button
                        key={index}
                        onClick={() => toggleEntrevista(candidato)}
                        className="w-full p-4 border-2 border-blue-900 rounded-2xl flex text-slate-800 my-2 mx-8 min-h-50 hover:bg-slate-200 hover:text-sky-900 hover:scale-102 cursor-pointer transition duration-200 ease-in-out"
                    >
                        <div className="">
                            <div className="flex w-full justify-between items-center space-x-5">
                                <h1 className=""><b className="mr-1">Id:</b> {candidato.id}</h1>
                                <div className="flex justify-center">
                                    <tr className="mr-2 font-bold">Nome:</tr>
                                    <td>{candidato.candidateName}</td>
                                </div>
                                <div className="flex justify-center">
                                    <tr className="mr-2 font-bold">Origem:</tr>
                                    <td>{Enum[candidato.origemEnum]}</td>
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={(e) => OpenCV(e, candidato)} className="mr-2 font-bold text-green-700 hover:scale-110 cursor-pointer"><FileUser /></button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <tr>Curriculo:</tr>
                                <td>{candidato.candidate_CV}</td>
                            </div>
                        </div>
                    </button>
                    ))}
                </div>
                )}
            </div>

            <div className="fixed inset-0 flex justify-center items-center hidden">
                <Entrevista/>
            </div>

            {selectedCandidate && selectedVaga && (
            <div className="fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center text-slate-800" onClick={closeModal}>
                <div className={`transform transition-all duration-200 ease-out ${modalClass} w-3xl max-h-full bg-white p-10 overflow-auto shadow-xl relative`} onClick={(e) => e.stopPropagation()}>
                    <button className="absolute top-4 right-4 text-red-600 hover:text-red-500 cursor-pointer" onClick={closeModal}>X</button>
                    <div className="flex items-start pb-4 border-b border-gray-400 mb-7">
                        <div className="text-sm space-y-2">
                            <div className="flex text-lg">
                                <b className="mr-2">Nome:</b>
                                <p>Dados candidato</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 text-md w-full">
                        <div>
                            Motivo da seleção
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h1 className="full flex justify-center items-center mb-6 font-bold text-xl text-gray-700">Respostas do Candidato</h1>
                    {perguntas.map((pergunta, index) => {
                        const respostaCorrespondente = respostas[index] || "Nenhuma resposta fornecida";
                        
                        return (
                            <div key={`pergunta-${index}`} className="question-item mb-4">
                                <div className="question font-bold">
                                    {pergunta}
                                </div>
                                <div className="text-sky-800 pb-1 px-3 mb-8 border-b border-gray-400">
                                    {respostaCorrespondente}
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
export default Page;