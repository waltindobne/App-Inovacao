"use client"
import {useState, useEffect} from "react";
import { SendHorizonal, UploadIcon, Paperclip, ArrowBigLeft, Building, DatabaseZap } from "lucide-react";
import { useRouter } from "next/navigation";
import { CandidateService, CandidatureService, NoteService, QuestionService, VacancyService } from "@/Services/WebApi";
import { useData, Vacancy, Candidate} from "@/Context/AppContext";

const Enum = [
    "",
    "BNE",
    "TBR"
]

function Page(){
    const router = useRouter();
    const { data, setData } = useData();
    const [ note, setNote] = useState('');
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);

    const [idCandidate, setIdCandidate] = useState<number | null>(null);
    const [idVaga, setIdVaga] = useState<number | null>(null);
    const [origemEnum, setOrigemEnum] = useState<number | null>(null);


    useEffect(() => {
        const idC = Number(localStorage.getItem('idCandidate'));
        const idV = Number(localStorage.getItem('idVaga'));
        const origem = Number(localStorage.getItem('origem'));
    
        if (isNaN(idC) || isNaN(idV) || isNaN(origem)) {
            console.error("Dados inválidos no localStorage");
            return;
        }
    
        setIdCandidate(idC);
        setIdVaga(idV);
        setOrigemEnum(origem);
    
        VacancyService.GetVacancyByExternalId(idV, origem)
            .then((response) => {
                console.log(response.data);
                setVacancy(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            
        CandidateService.GetCandidateById(origem, idC)
            .then((response) => {
                console.log(response.data);
                setCandidate(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    

    const handleEntrevista = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (!candidate || !vacancy || !origemEnum) return;
    
            const responseNote = await NoteService.CreateNotes(candidate.id, vacancy.id, note, origemEnum);
            console.log("Nota salva:", responseNote);
    
            if (!responseNote || responseNote.status !== 200) {
                console.log("Erro ao salvar a nota.");
                return;
            }
            const responseQuestions = await QuestionService.CreateQuestionsByIA(vacancy.id, candidate.id, origemEnum);
            console.log("Perguntas geradas:", responseQuestions);
    
            if (!responseQuestions || !responseQuestions.data) {
                console.log("Erro ao gerar perguntas.");
                return;
            }
            setData({
                questions: responseQuestions.data
            });
            
    
            router.push('/questions');
        } catch (error) {
            console.error("Erro ao finalizar entrevista:", error);
        }
    };    

    return (
        <div className="w-full">
            <div className="w-4/5 mb-10 mx-auto">
                <form onSubmit={handleEntrevista} className="w-full p-8 bg-white rounded-2xl text-slate-800 flex flex-col">
                    <div className="">
                        <div className="bg-sky-800 py-4 px-6 rounded-2xl">
                            <div className="w-full flex justify-between">
                                <p className="w-full flex justify-start items-center font-bold text-2xl text-amber-100">{vacancy?.vacancyName}</p>
                                <p className="w-64 flex justify-center items-center text-amber-100"><b className="mr-2">Empresa: </b> {vacancy?.vacancyCreator} <Building className="ml-2 text-blue-300"/></p>
                                <p className="w-64 ml-4 flex justify-end items-center text-amber-100"><b className="mr-2">Origem:</b> {Enum[vacancy?.origemEnum ?? 0]} <DatabaseZap className="ml-2 text-orange-300" /></p>
                            </div>
                            <div className="my-3 flex text-slate-100 justify-between items-start">
                                <div className="w-80">
                                    <p><b className="mr-1.5">Id:</b> {candidate?.id}</p>
                                    <p><b className="mr-1.5">Nome:</b> {candidate?.candidateName}</p>
                                </div>
                                <div className="w-full flex justify-start items-start ml-3">
                                    <p className="font-bold mr-1.5">Curriculo:</p>
                                    <p>{candidate?.candidate_CV}</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="anotacao" className="font-bold mx-2">Coloque suas Anotações aqui:</label>
                            <textarea 
                                name="anotacao" 
                                id="" 
                                placeholder="Digite aqui" 
                                value={note} 
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full min-h-60 max-h-60 p-2 bg-white border border-slate-400 rounded-lg outline-0"
                            />
                        </div>
                        <div className="w-full">
                            <button type="submit" className="w-full p-2 bg-white border-2 border-green-500 flex justify-center rounded-lg hover:bg-green-500 hover:text-white cursor-pointer"><p className="pr-2 font-bold">Enviar</p> <SendHorizonal/></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Page;