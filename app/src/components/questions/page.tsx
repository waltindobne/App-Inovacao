"use client"
import { Paperclip, Check, ArrowBigLeft, DatabaseZap, Building } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Vacancy, Candidate, Questions, Responses, useData } from "@/Context/AppContext";
import { CandidateService, CandidatureService, QuestionService, ResponseService, VacancyService } from "@/Services/WebApi";

const Enum = [
    "",
    "BNE",
    "TBR"
]

function Page() {
    const router = useRouter();
    const [indiceAtual, setIndiceAtual] = useState(0);
    const { data, setData } = useData();
    console.log(data);
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);
    const [questions, setQuestions] = useState(data.questions || []);
    const [responses, setResponses] = useState<string[]>([]);

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
                console.log("Erro ao buscar vaga:", error);
            });
    
        CandidateService.GetCandidateById(origem, idC)
            .then((response) => {
                console.log(response.data);
                setCandidate(response.data);
            })
            .catch((error) => {
                console.log("Erro ao buscar candidato:", error);
            }); 
    }, []);
    


    const handleEntrevista = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            if (!candidate || !vacancy || !questions || !responses || !origemEnum) return;

            if (questions.length !== responses.length) {
                console.log("Número de respostas não corresponde ao número de perguntas.");
                return;
            }
            const questionsIds = questions.map(i => i.id);
            const response = ResponseService.CreateResponse(questionsIds, responses, origemEnum);
            console.log('Respostas Salvas com sucesso',response);
            router.push('/ranking');
        }
        catch(error){
            console.log('Erro ao finalizar entrevista:', error)
        }
    }
    const handleChangeResponse = (index: number, value: string) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
      };

    return (
        <div className="w-3/5 p-8 mx-auto my-10">
            {/*<h1 className="text-blue-900 text-2xl">Perguntas e Respostas</h1>*/}
            <div className="w-full text-slate-800">
                <div className="w-full flex mb-6 pb-4 border-b border-slate-200">
                <div className="w-full bg-sky-800 py-4 px-6 rounded-2xl">
                    <div className="w-full flex justify-between">
                        <p className="w-full flex justify-start items-center font-bold text-2xl text-amber-100">{vacancy?.vacancyName}</p>
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
                            <p>{candidate?.candidate_CV?.substring(0,100)}...</p>
                        </div>
                    </div>
                </div>
                </div>
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
            </div>
        </div>
    )
}

export default Page;