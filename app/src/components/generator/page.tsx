"use client"
import {useState, useEffect} from "react";
import { SendHorizonal, UploadIcon, Paperclip, ArrowBigLeft, Building, DatabaseZap, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { CandidateService, CandidatureService, NoteService, QuestionService, ResponseService, VacancyService } from "@/Services/WebApi";
import { useData, Vacancy, Candidate, Questions} from "@/Context/AppContext";

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
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [responses, setResponses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    localStorage.removeItem('appData');
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
            
            if (!candidate || !vacancy || !questions || !responses || !origemEnum) return;
            if (questions.length !== responses.length) {
                console.log("Número de respostas não corresponde ao número de perguntas.");
                return;
            }
            const questionsIds = questions.map(i => i.id);
            const response = ResponseService.CreateResponse(questionsIds, responses, origemEnum);
            console.log('Respostas Salvas com sucesso',response);
            localStorage.removeItem('appData');
            router.push('/');
        } catch (error) {
            console.error("Erro ao finalizar entrevista:", error);
        }
    };

    const handleCreateQuest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!candidate || !vacancy || !origemEnum) return;
            setLoading(true);
            const responseQuestions = await QuestionService.CreateQuestionsByIA(vacancy.id, candidate.id, origemEnum);
            console.log("Perguntas geradas:", responseQuestions);
    
            if (!responseQuestions || !responseQuestions.data) {
                console.log("Erro ao gerar perguntas.");
                return;
            }
            setLoading(false);
            setQuestions(responseQuestions.data);
        } catch (error) {
            console.error("Erro ao finalizar entrevista:", error);
        }
    };

    const handleChangeResponse = (index: number, value: string) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    return (
        <div className="w-full">
            <div className="w-4/5 mx-auto">
                <form onSubmit={handleEntrevista} className="w-full pt-8 px-8 bg-white rounded-2xl text-slate-800 flex flex-col">
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
                        {/*<div className="w-full">
                            <button type="submit" className="w-full p-2 bg-white border-2 border-green-500 flex justify-center rounded-lg hover:bg-green-500 hover:text-white cursor-pointer"><p className="pr-2 font-bold">Enviar</p> <SendHorizonal/></button>
                        </div>*/}
                    </div>
                </form>
            </div>
            <div className="w-4/5 mx-auto p-8 text-slate-800">
                {questions.length === 0 ? (
                    <div className="space-y-4">
                        <button onClick={handleEntrevista} className="w-full p-2 flex justify-center border-2 border-green-500 text-slate-900 font-bold rounded-lg hover:bg-green-500 hover:text-white cursor-pointer">Enviar assim mesmo</button>
                        <button onClick={handleCreateQuest} className="w-full p-2 flex justify-center border-2 border-blue-600 text-slate-900 font-bold rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer">Gerar Perguntas</button>
                    </div>
                ):(
                    <form onSubmit={handleEntrevista}>
                        {questions.map((pergunta, index) => (
                            <div key={index} className="mt-4 flex flex-col w-full">
                                <label><b className="text-blue-900">{index + 1} -</b><b> {pergunta.question}</b></label>
                                <input
                                type="text"
                                value={responses[index] || ''}
                                onChange={(e) => handleChangeResponse(index, e.target.value)}
                                className="w-full p-2 bg-slate-50 border-b border-slate-400 outline-0"
                                />
                            </div>
                        ))}
                        {responses.length === questions.length && responses.every(resposta => resposta?.trim() !== "") && (
                            <div>
                                <button className="w-full flex justify-center items-center mt-4 p-2 border-2 border-green-500 rounded-lg font-bold hover:bg-green-500 hover:text-white cursor-pointer" type="submit"><Check />Confirmar</button>
                            </div>
                        )}
                    </form>
                )}
            </div>
            {loading && (
                <div className="bg-[rgb(0,0,0,0.5)] w-full inset-0 h-screen fixed flex flex-col items-center justify-center space-y-4 p-8">
                <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-blue-300 rounded-full animate-bounce" />
                    <div 
                        className="h-3 w-3 bg-blue-100 rounded-full animate-bounce" 
                        style={{ animationDelay: '0.1s' }} 
                    />
                    <div 
                        className="h-3 w-3 bg-blue-400 rounded-full animate-bounce" 
                        style={{ animationDelay: '0.2s' }} 
                    />
                </div>
        
                <div className="text-center">
                    <p className="text-white font-medium inline-flex items-center">
                        Processando sua requisição
                        <span className="ml-1 inline-flex space-x-1">
                            <span className="animate-pulse">.</span>
                            <span className="animate-pulse delay-100">.</span>
                            <span className="animate-pulse delay-200">.</span>
                        </span>
                    </p>
                </div>
        
                <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-md overflow-hidden">
                    <div 
                    className="h-full w-full rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, #4c7fec, #60a5fa, #93c5fd, #60a5fa, #4c7fec, #60a5fa, #93c5fd, #60a5fa, #4c7fec)',
                        backgroundSize: '200% 100%',
                        animation: 'gradientMove 8s linear infinite',
                    }}
                    />
                </div>
                <style jsx>{`
                    @keyframes gradientMove {
                        0% { background-position: 100% 50%; }
                        100% { background-position: -100% 50%; }
                    }
                `}</style>
            </div>
            )}
        </div>
    )
}
export default Page;