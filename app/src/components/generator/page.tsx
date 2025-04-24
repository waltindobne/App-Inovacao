"use client"
import {useState, useEffect} from "react";
import { SendHorizonal, UploadIcon, Paperclip, ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { QuestionService } from "@/Services/WebApi";
import { useData } from "@/Context/AppContext";

interface Candidato {
    nome: string;
    email: string;
    telefone: string;
    idade: number;
    aptidao: number;
    motivo: string;
    vaga: number;
    foto: string;
}
interface DataQuest{
    perguntas: string[],
    respostas: string,
    vaga: string,
    curriculo: string,
    anotacoes: string,
    transcricao: string,
    relatorios: string
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
const vagas = [
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

function Page(){
    const router = useRouter();
    const { data, setData } = useData();

    console.log(data)
    const [ vaga, setVaga] = useState([])
    const [selectedCandidate, setSelectedCandidate] = useState<Candidato | null>(null);
    const [ anotacoes, setAnotacoes] = useState('')
    const [ transcricao, setTranscricao] = useState('')
    const [ numQuest, setNumQuest] = useState(1);
    const [perguntas, setPerguntas] = useState<string[]>([]);
    const [quantidadePerguntas, setQuantidadesPerguntas] = useState(10)
    const [formValues, setFormValues] = useState({
        vaga: "",   
        anotacoes: "",
        transcricao: "",
        relatorios: "",
        perguntas: "",
        respostas: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        const idCandidate = localStorage.getItem('idCandidate');
        const idVaga = localStorage.getItem('idVaga');
      
        if (idCandidate) {
            const Candidate = candidates.find(x => x.id === parseInt(idCandidate));
            const Vaga = vagas.find(x => x.id === parseInt(idVaga));

            console.log(Candidate)
            setSelectedCandidate(Candidate);

            console.log(Vaga)
            setVaga(Vaga);
        }
      }, []);

    /*
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Atualizando o contexto com os novos dados
        setData({
            ...data,
            vaga: formValues.vaga,
            curriculo: formValues.curriculo,
            anotacoes: formValues.anotacoes,
            transcricao: formValues.transcricao,
            relatorios: formValues.relatorios,
            perguntas: formValues.perguntas ? [formValues.perguntas] : [],
            respostas: formValues.respostas
        });

        console.log("Dados atualizados no contexto!");
        router.push("/questions")
    };*/
    
    const handleChangeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let novasPerguntas = [...perguntas];
            while (novasPerguntas.length < quantidadePerguntas) {
                novasPerguntas.push(`${novasPerguntas.length + 1} - Lorem ipsum dolor sit amet...`);
            }
    
            setData({
                ...data,
                vaga,
                anotacoes,
                transcricao,
                relatorios: formValues.relatorios,
                perguntas: novasPerguntas,
                respostas: formValues.respostas
            });
    
            setPerguntas(novasPerguntas);
    
            console.log("Dados atualizados no contexto!", {
                ...data,
                perguntas: novasPerguntas
            });
    
            router.push('/questions');
        } catch (error) {
            console.error('Erro ao gerar perguntas:', error);
        }
    };
    


    return (
        <div className="w-full flex justify-center">
            <div className="w-3/5 my-10">
                <form method="post" onSubmit={handleChangeSubmit} className="w-full p-8 bg-gray-100 rounded-2xl border-2 border-blue-900 text-slate-800 flex flex-col">
                    <h1 className="text-2xl text-blue-900 mb-4">Dados do Candidato</h1>
                    <div className="">
                        <div className="mb-3">
                            <label htmlFor="vaga" className="font-bold">Vaga:</label>
                            <p>{vaga?.vaga}</p>
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="curriculo" className="font-bold">Descreva o curriculo aqui:</label>
                            <p>{selectedCandidate?.id}</p>
                            <p>{selectedCandidate?.nome}</p>
                            <p>{selectedCandidate?.email}</p>
                            <p>{selectedCandidate?.idade}</p>
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
                        <div className="mb-3">
                            <label htmlFor="transcricao" className="font-bold">Coloque suas Transcrições aqui:</label>
                            <textarea 
                                name="trascricao" 
                                id="" 
                                placeholder="Digite aqui" 
                                value={transcricao} 
                                onChange={(e) => setTranscricao(e.target.value)}
                                className="w-full p-2 min-h-24 max-h-24 bg-white border border-slate-400 rounded-lg outline-0"
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