"use client";
import { SendHorizonal , ArrowBigLeft, FileUser, Tags, DatabaseZap, UserCog, Medal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect, Key} from "react";
import { Candidate, useData, Vacancy } from "@/Context/AppContext";
import { CandidateService, VacancyService } from "@/Services/WebApi";
import Entrevista from "@/components/generator/page";
import axios from "axios";

const Enum = ["","BNE","TBR"]

type SavedVacancy = {
    id: number;
    origem: number;
};

function Page(){
    const router = useRouter();
    const [isOpenEntrevista, setIsOpenEntrevista] = useState(false);
    const [modalClass, setModalClass] = useState("scale-0 opacity-0");
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [selectedVaga, setSelectedVaga] = useState<Vacancy | null>(null);

    const [externalId, setExternalId] = useState('');
    const [origem, setOrigem] = useState(1);
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('vacancies');
        if (stored) {
            const saved: SavedVacancy[] = JSON.parse(stored);

            const validSaved = saved.filter(
                (v) => typeof v.id === 'number' && typeof v.origem === 'number'
            );
        
            Promise.all(
                validSaved.map(({ id, origem }) =>
                VacancyService.GetVacancyByExternalId(id, origem).then((res) => res.data)
                )
            )
                .then((vacList) => setVacancies(vacList))
                .catch((err) => console.error("Erro ao carregar vagas salvas:", err));
        }
      }, []);      

    const handleCandidatosVaga = async () => {
        try {
            const response = await VacancyService.GetVacancyByExternalId(Number(externalId), origem);
            const vaga = response.data;
        
            const stored = localStorage.getItem('vacancies');
            const saved: SavedVacancy[] = stored ? JSON.parse(stored) : [];
        
            const exists = saved.some(v => v.id === vaga.id && v.origem === origem);
            if (!exists) {
                const updated = [...saved, { id: vaga.id, origem }];
                localStorage.setItem('vacancies', JSON.stringify(updated));
                setVacancies(prev => [...prev, vaga]);
            }
            window.location.reload(); 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro ao buscar vaga:', error.response?.data);
            }
        }
      };    

    const toggleVaga = (vagas: Vacancy) => {
        localStorage.setItem('idVaga', String(vagas.id));
        localStorage.setItem('origem', String(vagas.origemEnum  ));
        router.push('/candidate');
    };

    const handleToRanking = () => {
        router.push('/Ranking')
    }

    const handleAlterVacancacy = () => {
        setVacancies([]);
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
    return(
        <div className="w-4/5 mx-auto py-10">
            <div className="w-full flex flex-wrap justify-center items-center">
                {vacancies.length === 0 ? (
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
                    <div className="w-full flex justify-end mb-4">
                        <button onClick={handleAlterVacancacy} className="bg-green-500 border border-green-700 font-bold rounded-xl p-2 cursor-pointer text-white">Adiconar Vagas</button>
                    </div>
                    <div className="w-full flex justify-center flex-wrap">
                    {vacancies.map((vagas: Vacancy, index: Key | null | undefined) => (
                    <button
                        key={index}
                        onClick={() => toggleVaga(vagas)}
                        className="w-md m-2 p-4 rounded-2xl flex justify-center bg-sky-800 hover:scale-102 cursor-pointer transition duration-200 ease-in-out text-white"
                    >
                        <div className="flex flex-col w-full space-y-2">
                            <div className="flex w-full">
                                <p className="font-bold text-2xl text-amber-100">{vagas.vacancyName}</p>
                            </div>
                            <div className=" flex justify-between items-start flex-wrap">
                                <p className="flex"><Tags className="mr-2 text-sky-400"/>id: {vagas.id}</p>
                                <p className="flex"><DatabaseZap className="mr-2 text-orange-400"/>Origem: {Enum[vagas.origemEnum ?? 0]}</p>
                                <p className="flex"><UserCog className="mr-2 text-green-400"/>Criador: {vagas.vacancyCreator}</p>
                            </div>
                            <div className="text-justify text-white mx-2">
                                <p className="">{vagas.description.slice(0, 200)}{vagas.description.length > 200 ? "..." : ""}</p>
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