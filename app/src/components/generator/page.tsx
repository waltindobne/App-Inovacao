"use client"
import {useState, useEffect} from "react";
import { SendHorizonal, UploadIcon, Paperclip, ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CandidateService, CandidatureService, NoteService, QuestionService, VacancyService } from "@/Services/WebApi";
import { useData, Vacancy, Candidate} from "@/Context/AppContext";

function Page(){
    const router = useRouter();
    const { data, setData } = useData();
    const [ note, setNote] = useState('');
    const idCandidate = localStorage.getItem('idCandidate');
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);

    const idVaga = localStorage.getItem('idVaga');
    const origemEnum = localStorage.getItem('origem');

    useEffect(() => {
        VacancyService.GetVacancyByExternalId(Number(idVaga), Number(origemEnum))
            .then((response) => {
                console.log(response.data);
                setVacancy(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        CandidateService.GetCandidateById(Number(origemEnum), Number(idCandidate))
            .then((response) => {
                console.log(response.data);
                setCandidate(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleEntrevista = async() => {
        try{
            if (!candidate || !vacancy) return;
            const responseNote = NoteService.CreateNotes(candidate.id, vacancy.id, note, Number(origemEnum));
            console.log(responseNote);

            if (!responseNote) return;
            const responseQuestions = QuestionService.CreateQuestionsByIA(vacancy.id, candidate.id, Number(origemEnum));
            console.log(responseQuestions);
        }
        catch(error){
            console.log('Erro ao finalizar entrevista:', error)
        }
    }      

    return (
        <div className="">
            <div className="w-3xl my-10">
                <form onSubmit={handleEntrevista} className="w-full p-8 bg-white rounded-2xl text-slate-800 flex flex-col">
                    <h1 className="text-2xl text-blue-900 mb-4">Entrevista</h1>
                    <div className="">
                        <div className="mb-3">
                            <label htmlFor="vaga" className="font-bold">Vaga:</label>
                            <div>
                                <p>{vacancy?.VacancyName}</p>
                                <p>{vacancy?.VacancyCreator}</p>
                                <p>{vacancy?.Description}</p>
                            </div>
                                
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="curriculo" className="font-bold">Candidato:</label>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="anotacao" className="font-bold">Coloque suas Anotações aqui:</label>
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