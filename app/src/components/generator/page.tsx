"use client"
import {useState, useEffect} from "react";
import { SendHorizonal, UploadIcon, Paperclip, ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CandidateService, CandidatureService, QuestionService } from "@/Services/WebApi";
import { useData, Vacancy, Candidate} from "@/Context/AppContext";

function Page(){
    const router = useRouter();
    const { data, setData } = useData();
    const [ note, setNote] = useState('');
    const [candidate, setCandidate] = useState([]);
    const idCandidate = localStorage.getItem('idCandidate')
    const [vacancy, setVacancy] = useState([]);

    const handleCreateCandidatureProcess = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // impedir reload do form
      
        try {
          // 1. Criar candidatura
          const createCandidatureResponse = await CandidatureService.CreateCandidature({
            idf_Candidate: localStorage.getItem('idCandidate'),
            idf_Vacancy: localStorage.getItem('idvaga'),
          });
          const candidaturaId = createCandidatureResponse.data.id; // Ajuste conforme a resposta da sua API
      
          // 2. Criar anotação
          await CandidateService.CreateAnotation({
            idCandidatura: candidaturaId,
            anotacao: note,
          });
      
          // 3. Gerar perguntas por IA
          await QuestionService.GenerateQuestionsIA({
            idCandidatura: candidaturaId,
          });
      
          // 4. Redirecionar para página de questões
          router.push(`/questoes/${candidaturaId}`);
      
        } catch (error) {
          console.error('Erro durante a criação de candidatura:', error);
          // Aqui você pode exibir uma mensagem de erro para o usuário, se quiser
        }
    };
      

    return (
        <div className="w-full flex justify-center">
            <div className="w-3/5 my-10">
                <form onSubmit={(e) => handleCreateCandidatureProcess(e, anotacoes)} className="w-full p-8 bg-gray-100 rounded-2xl border-2 border-blue-900 text-slate-800 flex flex-col">
                    <h1 className="text-2xl text-blue-900 mb-4">Dados do Candidato</h1>
                    <div className="">
                        <div className="mb-3">
                            <label htmlFor="vaga" className="font-bold">Vaga:</label>
                            {currentVaga ? (
                                <div className="mt-1 p-2 bg-white rounded-lg">
                                    <p className="font-semibold">{currentVaga.vaga}</p>
                                    <p>Salário: R$ {currentVaga.salario.toLocaleString('pt-BR')}</p>
                                    <p>Requisitos: {currentVaga.requisitos}</p>
                                </div>
                            ) : (
                                <p className="text-red-500">Nenhuma vaga selecionada</p>
                            )}
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="curriculo" className="font-bold">Descreva o curriculo aqui:</label>
                            {currentCandidate ? (
                                <div className="mt-1 p-2 bg-white rounded-lg">
                                    <div className="flex items-center">
                                        <img 
                                            src={currentCandidate.foto} 
                                            alt={currentCandidate.nome} 
                                            className="w-16 h-16 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="font-semibold">{currentCandidate.nome}</p>
                                            <p>Idade: {currentCandidate.idade} anos</p>
                                            <p>Aptidão: {currentCandidate.aptidao}%</p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="font-semibold">Motivo da seleção:</p>
                                        <p>{currentCandidate.motivo}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-red-500">Nenhum candidato selecionado</p>
                            )}  
                        </div>
                        <div className="mb-3">
                            <label htmlFor="anotacao" className="font-bold">Coloque suas Anotações aqui:</label>
                            <textarea 
                                name="anotacao" 
                                id="" 
                                placeholder="Digite aqui" 
                                value={anotacoes} 
                                onChange={(e) => setAnotacoes(e.target.value)}
                                className="w-full min-h-24 max-h-24 p-2 bg-white border border-slate-400 rounded-lg outline-0"
                            />
                        </div>
                        <div className="w-full">
                            <button type="submit" className="w-full p-2 bg-white border-2 border-green-500 flex justify-center rounded-lg hover:bg-green-500 hover:text-white cursor-pointer"><p className="pr-2 font-bold">Enviar</p> <SendHorizonal/></button>
                        </div>
                    </div>
                </form>
            </div>{/*}
            <div className={styles.Result}>
                <div className={styles.pergunta}>
                    <h1>1 -</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                </div>
                <div className={styles.pergunta}>
                    <h1>2 -</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                </div>
                <div className={styles.pergunta}>
                    <h1>3 -</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                </div>
                <div className={styles.pergunta}>
                    <h1>4 -</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                </div>
                <div className={styles.pergunta}>
                    <h1>5 -</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                </div>
            </div>*/}
        </div>
    )
}
export default Page;