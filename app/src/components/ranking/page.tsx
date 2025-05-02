"use client";
import { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { ArrowBigLeft, DatabaseZap, FileUser, Medal, Tags, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useData, Vacancy } from "@/Context/AppContext";
import { CandidateService, RankingService } from "@/Services/WebApi";

interface Candidato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    idade: number;
    aptidao: number;
    motivo: string;
    vaga: number;
    foto: string;
}
interface Data {
    perguntas?: string[];
    respostas?: string[];
    // ... outras propriedades
  }
  
export interface Vaga {
    id: number;
    foto: string;
    vaga: string;
    quantidade: number;
    salario: number;
    requisitos: string;
  }
  
const candidates = [
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

const Enum = [
    "",
    "BNE",
    "TBR"
]

function Page(){
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const { data, setData } = useData();
    console.log(data);
    const [modalClass, setModalClass] = useState("scale-0 opacity-0");

    const [selectedCandidate, setSelectedCandidate] = useState<Candidato | null>(null);
    const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);


    const [vacancy, setVacancy] = useState<Vacancy | null>(null);
    
    const idCandidate = Number(localStorage.getItem('idCandidate'));
    const idVaga = Number(localStorage.getItem('idVaga'));
    const origemEnum = Number(localStorage.getItem('origem'));

    const ordenarPorAptidao = (lista:Candidato[]) => {
        return [...lista]
        .filter(candidato => candidato.aptidao > 50)
        .sort((a, b) => b.aptidao - a.aptidao );
    };

    const Ranking = async() => {
        try{
            const responseRanking = RankingService.GetAllRankingsByVacancyId(idVaga);
            if(!responseRanking){
                useEffect(() => {
                    RankingService.CreateRankingByIA()
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log('Erro ao tentar criar o Ranking',error);
                    })
                }, []);
            }
        }
        catch(error){
            console.log('Erro ao listar o rankig:', error);
        }
    }

    /*useEffect(() => {
        CandidateService.GetAllCandidates()
            .then((response) => {
                console.log(response.data);
                setCandidates(response.data);
            })
            .catch((error) => {
                console.log('Erro ao tentar listar candidatos:', error)
            })
    }, [])

    const OpenCV = (e: React.MouseEvent, candidato: Candidato) => {
            e.stopPropagation();
            setSelectedCandidate(candidato);
            const idVaga = localStorage.getItem('idVaga');
            
            if (idVaga) {
                const vagaEncontrada = vagas.find(v => v.id === parseInt(idVaga));
                setSelectedVaga(vagaEncontrada || null);
                
                // Carrega perguntas e respostas do contexto
                if (data.perguntas) {
                    setPerguntas(data.perguntas);
                }
                if (data.respostas) {
                    setRespostas(data.respostas);
                }
            } else {
                setSelectedVaga(null);
            }
            
            setTimeout(() => {
                setModalClass("scale-100 opacity-100");
            }, 10);
        };
    const closeModal = () => {
        setModalClass("scale-0 opacity-0");
        setTimeout(() => {
            setSelectedCandidate(null);
        }, 200);
    };*/

    return(
        <div className="w-4/5 mx-auto my-10">
            <div className="w-full flex justify-center items-center">
                <div className="w-full py-6 px-8 bg-sky-900 rounded-2xl ">
                    <h1 className="text-2xl font-bold">{vacancy?.vacancyName}</h1>
                    <p>{vacancy?.description}</p>
                    <div className="flex justify-around items-center mt-4">
                        <p className="flex"><Tags className="mr-2 text-sky-400"/>id: {vacancy?.id}</p>
                        <p className="flex"><DatabaseZap className="mr-2 text-orange-400"/>Origem: {Enum[vacancy?.origemEnum ?? 0]}</p>
                        <p className="flex"><UserCog className="mr-2 text-green-400"/>Creador: {vacancy?.vacancyCreator}</p>
                    </div>
                </div>
            </div>
            <h1 className="w-full flex justify-center text-2xl text-blue-900 mt-5">Ranking dos Candidatos - {ordenarPorAptidao(candidates).length}</h1>
            <div className="w-full mt-4 flex flex-wrap justify-center items-center">
                {ordenarPorAptidao(candidates).map((candidato, index) => (
                <button className="w-lg p-4 border-2 border-blue-900 rounded-2xl flex text-slate-800 m-1.5 min-h-50 hover:bg-slate-200 hover:text-sky-900 hover:scale-102 cursor-pointer transition duration-200 ease-in-out" key={index} /*onClick={(e) => OpenCV(e,candidato)}*/>
                    <div className="">
                        <div className="flex w-full justify-between">
                            <h1><b className="mr-1">N°:</b> {index + 1}</h1>
                            <h1><b className="mr-1">Id:</b> {candidato.id}</h1>
                            <div className="flex">
                                <tr className="mr-2 font-bold">nome:</tr>
                                <td>{candidato.nome}</td>
                            </div>
                            <div className="flex">
                                <tr className="mr-2 font-bold">Aptidão:</tr>
                                <td>{candidato.aptidao}%</td>
                            </div>
                            <div className="flex">
                                {/*<button onClick={(e) => OpenCV(e,candidato)} className="mr-2 font-bold text-green-700 hover:scale-110 cursor-pointer"><FileUser/></button>*/}
                            </div>
                        </div>
                        <div className=" mt-2">
                            <td>{candidato.motivo}</td>
                        </div>
                    </div>
                </button>
                ))}
            </div>

            {/*selectedCandidate && selectedVaga && (
            <div className="fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center text-slate-800" onClick={closeModal}>
                <div className={`transform transition-all duration-200 ease-out ${modalClass} w-3xl max-h-full bg-white p-10 overflow-auto shadow-xl relative`} onClick={(e) => e.stopPropagation()}>
                    <button className="absolute top-4 right-4 text-red-600 hover:text-red-500 cursor-pointer" onClick={closeModal}>X</button>
                    <div className="flex items-start pb-4 border-b border-gray-400 mb-7">
                        <div className="text-sm space-y-2">
                            <div className="flex text-lg">
                                <b className="mr-2">Nome:</b>
                                <p>{selectedCandidate.nome}</p>
                            </div>
                            <div className="flex text-lg">
                                <b className="mr-2">Email:</b>
                                <p>{selectedCandidate.email}</p>
                            </div>
                            <div className="flex text-lg">
                                <b className="mr-2">Idade:</b>
                                <p>{selectedCandidate.idade}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 text-md w-full">
                        <div>
                            {selectedCandidate.motivo}
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border border-gray-500">
                    {perguntas.map((pergunta, index) => {
                        const respostaCorrespondente = respostas[index] || "Nenhuma resposta fornecida";
                        
                        return (
                            <div key={`pergunta-${index}`} className="question-item mb-4">
                                <div className="question font-medium">
                                    Pergunta {index + 1}: {pergunta}
                                </div>
                                <div className="answer ml-4 text-gray-600">
                                    Resposta: {respostaCorrespondente}
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
            )*/}
        </div>
    )
}
export default Page;