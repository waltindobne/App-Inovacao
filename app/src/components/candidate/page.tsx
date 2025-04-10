"use client";
import { SendHorizonal , ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";

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
    const [isOpen, setIsOpen] = useState(false);

    const toggleCurriculo = () => setIsOpen(!isOpen);

    const returnHome = () => {
        router.push('/')
    }

    const ordenarPorAptidao = (lista) => {
        return [...lista].sort((a, b) => b.aptidao - a.aptidao);
    };
    return(
        <div>
            <button className="" onClick={returnHome}><ArrowBigLeft/>Home</button>
            <h1 className="">Candidatos Aptos - {Candidatos.length}</h1>
            <div className="">
                {ordenarPorAptidao(Candidatos).map((candidato, index) => (
                <button onClick={toggleCurriculo} className="" key={index}>
                    {/*<img src={candidato.foto} alt="" />*/}
                    {Candidatos.length}
                    <div className="">
                        <h1></h1>
                        <div className="">
                            <tr>nome:</tr>
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
                        <div className="">
                            <tr>Aptidão:</tr>
                            <td>{candidato.aptidao}%</td>
                        </div>
                        <div className="">
                            
                            <td>{candidato.motivo}</td>
                        </div>
                    </div>
                </button>
                ))}
            </div>





            {isOpen && (
            <div className="">
                <div className="">
                    <div className="">
                        <div className="flex">
                            <img src="https://media.licdn.com/dms/image/v2/D4D03AQE-gQEecOmEyg/profile-displayphoto-shrink_200_200/B4DZQgPyT.HwAY-/0/1735707797234?e=2147483647&v=beta&t=QXYg9A1fyjKX2FgWFC4p2eWl5-lGr6CvhkTgl1oaWGI" alt="" />
                            <div className="">
                                <div className="">
                                    <tr>nome:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className="">
                                    <tr>Email:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className="">
                                    <tr>Telefone:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className="">
                                    <tr>Vaga:</tr>
                                    <td>joão silva</td>
                                </div>
                            </div>
                        </div>
                        <button onClick={toggleCurriculo}>X</button>
                    </div><br /><hr /><br />
                    <div className="">
                        <b>1- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                        <b>2- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                        <b>3- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                        <b>4- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                        <b>5- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                    </div>  
                </div>
            </div>
             )}
        </div>
    )
}
export default Page;