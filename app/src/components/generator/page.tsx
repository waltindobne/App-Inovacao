"use client"
import { useState, useEffect, useRef } from "react";
import { Hash, Tags, FileUser, ArrowBigLeft, Building, DatabaseZap, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { CandidateService, CandidatureService, NoteService, QuestionService, ResponseService, VacancyService } from "@/Services/WebApi";
import { useData, Vacancy, Candidate, Questions } from "@/Context/AppContext";

const Enum = [
    "",
    "BNE",
    "TBR"
]

function Page() {
    const router = useRouter();
    const { data, setData } = useData();
    const [note, setNote] = useState('');
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);

    const [idCandidate, setIdCandidate] = useState<number | null>(null);
    const [idVaga, setIdVaga] = useState<number | null>(null);
    const [origemEnum, setOrigemEnum] = useState<number | null>(null);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [responses, setResponses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const questionFormRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('appData');
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
        }
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
            console.log('Respostas Salvas com sucesso', response);
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

    useEffect(() => {
        if (questions.length > 0) {
            questionFormRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [questions]);    

    return (
        <div className="w-full">
            <div className="w-4/5 mx-auto">
                <form onSubmit={handleEntrevista} className="w-full pt-8 px-8 bg-white rounded-2xl text-slate-800 flex flex-col">
                    <div className="">
                        <div className="bg-sky-800 py-4 px-6 rounded-2xl">
                            <div className="w-full flex justify-between">
                                <p className="w-full flex justify-start items-center font-bold text-2xl text-amber-100">{vacancy?.vacancyName}</p>
                                <p className="w-64 flex justify-center items-center text-amber-100"><b className="mr-2">Empresa: </b> {vacancy?.vacancyCreator} <Building className="ml-2 text-blue-300" /></p>
                                <p className="w-64 ml-4 flex justify-end items-center text-amber-100"><b className="mr-2">Origem:</b> {Enum[vacancy?.origemEnum ?? 0]} <DatabaseZap className="ml-2 text-orange-300" /></p>
                            </div>
                            <div className="my-3 flex text-slate-100 justify-between items-start">
                                <div className="w-80 space-y-1">
                                    <p className="flex items-center"><b className="mr-1.5 flex items-center"><Hash className="mr-1 text-blue-300" />Id:</b> {candidate?.id}</p>
                                    <p className="flex items-center"><b className="mr-1.5 flex items-center"><Tags className="mr-1 text-green-400" />Nome:</b> {candidate?.candidateName}</p>
                                </div>
                                <div className="w-full flex justify-start items-start ml-3">
                                    <p className="font-bold mr-1.5 flex items-center"><FileUser className="mr-1 text-amber-400" />Curriculo:</p>
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
                ) : (
                    <form ref={questionFormRef} onSubmit={handleEntrevista} id="questions">
                        {questions.map((pergunta, index) => (
                            <div key={index} className="mt-4 flex flex-col w-full">
                                <label><b className="text-blue-900">{index + 1} -</b><b> {pergunta.question}</b></label>
                                <input
                                    type="text"
                                    value={responses[index] || ''}
                                    onChange={(e) => handleChangeResponse(index, e.target.value)}
                                    className="w-full p-2 bg-slate-50 border-b border-slate-400 outline-0 mb-3"
                                    placeholder="Digite a Resposta do Candidato"
                                />
                            </div>
                        ))}
                        <div>
                            <button className="w-full flex justify-center items-center mt-4 p-2 border-2 border-green-500 rounded-lg font-bold hover:bg-green-500 hover:text-white cursor-pointer" type="submit"><Check />Confirmar</button>
                        </div>
                    </form>
                )}
            </div>
            {loading && (
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
            )}
        </div>
    )
}
export default Page;