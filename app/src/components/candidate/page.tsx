"use client";
import { SendHorizonal , ArrowBigLeft, FileUser, Tags, DatabaseZap, UserCog, Medal } from "lucide-react";
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
    const [isOpenEntrevista, setIsOpenEntrevista] = useState(false);
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
        router.push('/ranking')
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
                <div className="w-full bg-white">
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full py-6 px-8 bg-sky-900 rounded-2xl">
                            <div className="w-full mb-3 flex justify-between items-center">
                                <h1 className="text-2xl text-amber-100 font-bold">{selectedVaga?.vacancyName}</h1>
                                <button className="py-2 px-4 border-2 border-red-800 bg-red-400 rounded-xl text-slate-800 font-bold translate cursor-pointer">Trocar de Vaga</button>
                            </div>
                            <p>{selectedVaga?.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <p className="flex"><Tags className="mr-2 text-sky-400"/>id: {selectedVaga?.id}</p>
                                <p className="flex"><DatabaseZap className="mr-2 text-orange-400"/>Origem: {Enum[selectedVaga?.origemEnum ?? 0]}</p>
                                <p className="flex"><UserCog className="mr-2 text-green-400"/>Criador: {selectedVaga?.vacancyCreator}</p>
                                <button onClick={handleToRanking} className="flex cursor-pointer bg-yellow-300 text-slate-800 font-semibold px-3 py-2 rounded-lg"><Medal className="text-sky-800 mr-2"/>Ranking</button>
                            </div>
                        </div>
                    </div>

                    <h1 className="w-full flex justify-center my-5 text-2xl text-blue-900">Candidatos - {candidates.length}</h1>

                    <div className="w-full flex justify-center flex-wrap">
                    {candidates.map((candidato: Candidate, index: Key | null | undefined) => (
                    <button
                        key={index}
                        onClick={() => toggleEntrevista(candidato)}
                        className="w-96 p-4 border-2 border-blue-900 rounded-2xl flex justify-center text-slate-800 m-1.5  hover:bg-slate-200 hover:text-sky-900 hover:scale-102 cursor-pointer transition duration-200 ease-in-out"
                    >
                        <div className="flex flex-col w-full">
                            <div className=" flex flex-col justify-start items-start space-x-5">
                                <div className="w-full flex justify-between space-x-0">
                                    <h1 className=""><b className="mr-1">Id:</b> {candidato.id}</h1>
                                    <p onClick={(e) => OpenCV(e, candidato)} className="font-bold text-green-700 hover:scale-110 cursor-pointer"><FileUser /></p>
                                </div>
                                <div className="flex">
                                    <p className="mr-2 font-bold">Nome:</p>
                                    <p>{candidato.candidateName}</p>
                                </div>
                                <div className="flex">
                                    <p className="mr-2 font-bold">Origem:</p>
                                    <p>{Enum[candidato.origemEnum ?? 0]}</p>
                                </div>
                            </div>
                            <div className="text-justify">
                                <p className="font-bold">Curriculo:</p>
                                <p>{candidato.candidate_CV}</p>
                            </div>
                        </div>
                    </button>
                    ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
export default Page;