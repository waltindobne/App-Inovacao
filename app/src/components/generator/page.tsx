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

    const idCandidate = Number(localStorage.getItem('idCandidate'));
    const idVaga = Number(localStorage.getItem('idVaga'));
    const origemEnum = Number(localStorage.getItem('origem'));

    useEffect(() => {
        VacancyService.GetVacancyByExternalId(idVaga, origemEnum)
            .then((response) => {
                console.log(response.data);
                setVacancy(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        CandidateService.GetCandidateById(origemEnum, idCandidate)
            .then((response) => {
                console.log(response.data);
                setCandidate(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleEntrevista = async () => {
        try {
            if (!candidate || !vacancy) return;
    
            const responseNote = await NoteService.CreateNotes(candidate.id, vacancy.id, note, Number(origemEnum));
            console.log(responseNote);
    
            if (!responseNote) return;
    
            const responseQuestions = await QuestionService.CreateQuestionsByIA(vacancy.id, candidate.id, Number(origemEnum));
            console.log(responseQuestions);
    
            setData(prev => ({
                ...prev,
                questions: responseQuestions.data
            }));
        } catch (error) {
            console.log('Erro ao finalizar entrevista:', error);
        }
    };

    return (
        <div className="w-full">
            <div className="w-3xl my-10 mx-auto">
                <form onSubmit={handleEntrevista} className="w-full p-8 bg-white rounded-2xl text-slate-800 flex flex-col">
                    <div className="">
                        <div className="bg-sky-800 py-4 px-6 rounded-2xl">
                            <div className="w-full flex justify-between">
                                <p className="w-full flex justify-start items-center font-bold text-2xl text-amber-200">{vacancy?.vacancyName}</p>
                                <p className="w-64 flex justify-center items-center text-amber-100"><b className="mr-2">Empresa: </b> {vacancy?.vacancyCreator} <Building className="ml-2 text-blue-300"/></p>
                                <p className="w-64 ml-4 flex justify-end items-center text-amber-100"><b className="mr-2">Origem:</b> {Enum[vacancy?.origemEnum ?? 0]} <DatabaseZap className="ml-2 text-orange-300" /></p>
                            </div>
                            <div className="my-3 flex text-slate-100 justify-between items-start">
                                <div className="w-80">
                                    <p><b>Id:</b> {candidate?.id}</p>
                                    <p><b>Nome:</b> {candidate?.candidateName}</p>
                                </div>
                                <div className="w-full flex justify-start items-start">
                                    <p className="font-bold">Curriculo:</p>
                                    <p>{candidate?.candidate_CV}</p>
                                </div>
                                <div className="">
                                    
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
                                className="w-full min-h-24 max-h-24 p-2 bg-white border border-slate-400 rounded-lg outline-0"
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