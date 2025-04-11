"use client";
import { SendHorizonal , ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
import { useData } from "@/Context/AppContext";

const Candidatos = [
    {
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



function Page(){
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const { data } = useData();
    const [ Result, setResult ] = useState(data || []);
    const [modalClass, setModalClass] = useState("scale-0 opacity-0");
    const [selectedCandidate, setSelectedCandidate] = useState(null);


    const toggleCurriculo = (candidato) => {
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
    
    

    const returnHome = () => {
        router.push('/')
    }
    const handleToRanking = () => {
        router.push('/Ranking')
    }

    const ordenarPorAptidao = (lista) => {
        return [...lista].sort((a, b) => b.aptidao - a.aptidao);
    };
    return(
        <div className="w-4/5 mx-auto my-10">
            <div className=" w-full flex justify-center items-center mb-10">
                <h1 className="text-blue-900 text-2xl mr-4">Lista de Candidatos - {Candidatos.length}</h1>
                <button className="px-4 py-2 bg-gray-200 border-2 border-blue-900 rounded-lg text-blue-900 font-bold hover:bg-blue-900 hover:text-white cursor-pointer" onClick={handleToRanking}>Gerar Ranking</button>
            </div>
            <div className="w-full mt-4 flex flex-wrap justify-center items-center">
                {Candidatos.map((candidato, index) => (
                <button onClick={() => toggleCurriculo(candidato)} className="w-lg p-4 border-2 border-blue-900 rounded-2xl flex text-slate-800 m-1.5 min-h-50 hover:bg-slate-200 hover:text-sky-900 hover:scale-102 cursor-pointer  transition duration-200 ease-in-out" key={index}>
                    {/*<img src={candidato.foto} alt="" className="w-30 h-30 rounded-sm"/>*/}
                    <div className="">
                        <div className="flex w-full justify-between">
                            <h1><b className="mr-1">N° Candidato:</b> {index + 1}</h1>
                            <div className="flex">
                                <tr className="mr-2 font-bold">nome:</tr>
                                <td>{candidato.nome}</td>
                            </div>
                            {/*<div className={styles.linha}>
                                <tr>Email:</tr>
                                <td>{candidato.email}</td>
                            </div>
                            <div className={styles.linha}>
                                <tr>Telefone:</tr>
                                <td>{candidato.telefone}</td>
                            </div>*/}
                            <div className="flex">
                                <tr className="mr-2 font-bold">Aptidão:</tr>
                                <td>{candidato.aptidao}%</td>
                            </div>
                        </div>
                        <div className=" mt-2">
                            <td>{candidato.motivo}</td>
                        </div>
                    </div>
                </button>
                ))}
            </div>

            {selectedCandidate && (
            <div className="fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center text-slate-800" onClick={closeModal}>
                <div className={`transform transition-all duration-200 ease-out ${modalClass} w-3xl max-h-9/12 bg-white p-10 overflow-auto rounded-xl shadow-xl relative`} onClick={(e) => e.stopPropagation()}>
                    <button className="absolute top-4 right-4 text-red-600 hover:text-red-500 cursor-pointer" onClick={closeModal}>X</button>
                    <div className="flex items-start pb-4 border-b border-gray-400 mb-7">
                        <img
                            src=""
                            alt=""
                            className="w-24 h-24 rounded-full mr-10"
                        />
                        <div className="text-sm space-y-2">
                            <div><b>Nome:</b></div>
                            <div><b>Email:</b> </div>
                            <div><b>Telefone:</b></div>
                        </div>
                    </div>
                    <div className="space-y-4 text-md w-full">
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
export default Page;