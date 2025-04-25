"use client"
import { Paperclip, Check, ArrowBigLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData, Vaga, Candidato } from "@/Context/AppContext";
import { CandidateService, CandidatureService, QuestionService, ResponseService, VacancyService } from "@/Services/WebApi";

const candidates:Candidato[] = [
    {
        "id": 1,
        "nome": "João",
        "email": "joao@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 20,
        "aptidao": 90,
        "motivo": "João demonstrou excelente domínio técnico, destacando-se na resolução de problemas e na habilidade de aprender novas tecnologias rapidamente. Seu envolvimento ativo em projetos acadêmicos e pessoais evidencia sua iniciativa e potencial de crescimento.",
        "vaga": 1,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs6NOtbwDZZAe8GpwIjUTq2WYn_ExYBshhhQ&s"
    },
    {
        "id": 2,
        "nome": "Maria",
        "email": "maria@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 25,
        "aptidao": 74,
        "motivo": "Maria se destacou pela sua comunicação clara e objetiva, sendo uma peça-chave em atividades colaborativas. Seu histórico profissional demonstra grande habilidade em liderar equipes e propor soluções inovadoras.",
        "vaga": 2,
        "foto": "https://i0.wp.com/blog.infojobs.com.br/wp-content/uploads/2023/08/aproximacao-de-uma-jovem-profissional-feminina-fazendo-contato-visual-contra-o-fundo-colorido.jpg?resize=604%2C403&ssl=1"
    },
    {
        "id": 3,
        "nome": "Carlos",
        "email": "carlos@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 30,
        "aptidao": 30,
        "motivo": "Carlos demonstrou forte comprometimento e dedicação. Embora tenha apresentado dificuldades técnicas, seu empenho em buscar melhorias contínuas e sua experiência prévia em ambientes corporativos agregam valor ao time.",
        "vaga": 3,
        "foto": "https://f.i.uol.com.br/fotografia/2025/01/28/17380813716799045bb0ffb_1738081371_3x2_md.jpg"
    },
    {
        "id": 4,
        "nome": "Ana",
        "email": "ana@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 22,
        "aptidao": 85,
        "motivo": "Ana apresentou excelente capacidade analítica e espírito crítico, sendo muito elogiada pelo seu raciocínio lógico durante as entrevistas técnicas. Sua postura profissional e segurança nas respostas mostram preparo e experiência.",
        "vaga": 4,
        "foto": "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        "id": 5,
        "nome": "Felipe",
        "email": "felipe@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 27,
        "aptidao": 78,
        "motivo": "Felipe possui forte habilidade em gestão de tempo e organização, destacando-se por sua abordagem prática e soluções criativas durante os testes. Sua experiência anterior fortalece suas competências na área administrativa.",
        "vaga": 5,
        "foto": "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
        "id": 6,
        "nome": "Juliana",
        "email": "juliana@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 24,
        "aptidao": 95,
        "motivo": "Juliana se destacou pela sua facilidade em lidar com pessoas e sua capacidade de criar conexões rapidamente. Sua empatia e habilidades interpessoais são grandes diferenciais para cargos que exigem interação constante com clientes.",
        "vaga": 6,
        "foto": "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
        "id": 7,
        "nome": "Ricardo",
        "email": "ricardo@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 35,
        "aptidao": 60,
        "motivo": "Ricardo demonstrou habilidades sólidas em gestão de conflitos e negociação. Sua experiência anterior em liderança de equipes foi crucial para a resolução eficiente de problemas durante as dinâmicas de grupo.",
        "vaga": 7,
        "foto": "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
        "id": 8,
        "nome": "Carolina",
        "email": "carolina@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 28,
        "aptidao": 88,
        "motivo": "Carolina possui grande habilidade analítica e lógica. Sua experiência anterior em áreas de tecnologia e sua capacidade de adaptação às mudanças foram pontos fortes destacados durante o processo seletivo.",
        "vaga": 8,
        "foto": "https://randomuser.me/api/portraits/women/46.jpg"
    },
    {
        "id": 9,
        "nome": "Marcos",
        "email": "marcos@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 32,
        "aptidao": 40,
        "motivo": "Marcos demonstrou ser uma pessoa extremamente dedicada e esforçada. Embora tenha apresentado algumas dificuldades técnicas, seu interesse em aprender e evoluir ficou evidente durante o processo seletivo.",
        "vaga": 9,
        "foto": "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
        "id": 10,
        "nome": "Beatriz",
        "email": "beatriz@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 29,
        "aptidao": 92,
        "motivo": "Beatriz demonstrou habilidades excepcionais em comunicação e persuasão. Sua experiência na área comercial e sua postura profissional garantiram um desempenho acima da média durante todas as etapas do processo seletivo.",
        "vaga": 10,
        "foto": "https://randomuser.me/api/portraits/women/47.jpg"
    }
];
const vagas:Vaga[] = [
    {
        "id": 1,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-Xu2k0C4wdc35bq-r9uI1813kclztywZhw&s",
        "vaga": "Desenvolvedor Frontend",
        "quantidade": 2,
        "salario": 4000,
        "requisitos": "html, css, javascript, react, tailwind"
    },
    {
        "id": 2,
        "foto": "https://i.pinimg.com/564x/b4/00/bb/b400bba24a3ac713c5611facf4376d7e.jpg",
        "vaga": "Desenvolvedor Backend",
        "quantidade": 3,
        "salario": 4500,
        "requisitos": "c#, sql, github, azure"
    }
];

function Page() {
    const router = useRouter();
    const { data, setData } = useData();
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [currentResposta, setRespostas] = useState(data.respostas || []);
    console.log(data)
    //const [perguntas, setPerguntas] = useState(data.perguntas || []);
    //const [respostas, setRespostas] = useState(Array((data.perguntas || []).length).fill(""));
    //const [candidate, setCandidate] = useState([]);
    //const [candidature, setCandidature] = useState([]);
    //const [perguntas, setPerguntas] = useState([]);
    //const [respostas, setRespostas] = useState([]); 

    const currentCandidate = data.curriculo?.[0] || null;
    const currentPergunta = data.perguntas || [];
    
    
    const returnHome = () => {
        router.push('/')
    }


    

    /*useEffect(() => {
        CandidateService.GetCandidateById()
        .then((response) => {
            console.log(response.data);
            setCandidate(response.data);
        })
        .catch((error) => {
            console.log('Erro ao encontrar o usario pelo id na pagina de questions', error);
        })
    }, [])
    useEffect(() => {
        CandidatureService.GetAllCandidatures()
        .then((response) => {
            console.log(response.data);
            setCandidature(response.data);
        })
        .catch((error) => {
            console.log('Erro ao encontrar o usario pelo id na pagina de questions', error);
        })
    }, [])

    useEffect(() => {
        QuestionService.GetAllQuestions()
            .then((response) => {
                console.log(response.data);
                setPerguntas(response.data);
            })
            .catch((error) => {
                console.log('Erro ao listar as perguntas geradas para o candidato:', error)
            })
    })

    const handleSaveResponse = async () =>{
        try{
            if(respostas.length > 0){
                for(let i=0; i>perguntas.length; i++){
                    try{
                        const SaveQuestions = await ResponseService.CreateResponse(
                            //parametros para salvar as respostas
                        )
                    }
                    catch(error){
                        console.log('erro ao tentar salvar as respostas')
                    }
                }
            }
            console.log('Nenhuma resposta enviada')
        }
        catch(error){
            
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const novasRespostas = [...respostas];
        novasRespostas[index] = e.target.value;
        setRespostas(novasRespostas);
    };*/

    const handleRespostaChange = (index: number, value: string) => {
        const novasRespostas = [...currentResposta];
        novasRespostas[index] = value;
    
        setRespostas(novasRespostas);
        setData(prev => ({ ...prev, respostas: novasRespostas }));
    
        if (value.trim() !== "" && index === indiceAtual && indiceAtual < currentPergunta.length - 1) {
            setTimeout(() => {
                setIndiceAtual(prev => prev + 1);
            }, 1200);
        }
    };
    const handleSubmit = () => {
        router.push('/Ranking')
    }

    return (
        <div className="w-3/5 p-8 mx-auto my-10 border-2 border-blue-900 rounded-2xl">
            {/*<h1 className="text-blue-900 text-2xl">Perguntas e Respostas</h1>*/}
            <div className="w-full text-slate-800">
                <div className="w-full flex mb-6 pb-4 border-b border-slate-200">
                    {currentCandidate && (
                        <>
                            <img 
                                src={currentCandidate.foto} 
                                alt={`Foto de ${currentCandidate.nome}`} 
                                className="w-50 rounded-md"
                            />
                            <div className="w-full mx-4 flex flex-col items-start">
                                <div className="w-full flex border-b border-gray-200">
                                    <span className="font-bold mr-2">Nome:</span>
                                    <span>{currentCandidate.nome}</span>
                                </div>
                                <div className="w-full flex border-b border-gray-200">
                                    <span className="font-bold mr-2">Email:</span>
                                    <span>{currentCandidate.email}</span>
                                </div>
                                <div className="w-full flex">
                                    <span className="font-bold mr-2">Idade:</span>
                                    <span>{currentCandidate.idade}</span>
                                </div>
                            </div>
                        </>
                    )}
                    {!currentCandidate && (
                        <p className="text-red-500">Nenhum candidato selecionado</p>
                    )}
                </div>
                <form action={handleSubmit}>
                    {currentPergunta.slice(0, indiceAtual + 1).map((pergunta, index) => (
                        <div key={index} className="mt-4 flex flex-col w-full">
                            <label><b>{pergunta}</b></label>
                            <input
                                type="text"
                                value={currentResposta[index] || ""}
                                onChange={(e) => handleRespostaChange(index, e.target.value)}
                                className="w-full p-2 bg-slate-50 border-b border-slate-400 outline-0"
                            />
                        </div>
                    ))}

                    {currentResposta.length === currentPergunta.length && currentResposta.every(resposta => resposta?.trim() !== "") && (
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