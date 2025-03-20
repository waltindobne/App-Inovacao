"use client";
import styles from "./candidate.module.css";
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
        "vaga": 1,
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs6NOtbwDZZAe8GpwIjUTq2WYn_ExYBshhhQ&s"
    },
    {
        "nome": "Maria",
        "email": "maria@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 25,
        "aptidao": 74,
        "vaga": 2,
        "foto": "https://i0.wp.com/blog.infojobs.com.br/wp-content/uploads/2023/08/aproximacao-de-uma-jovem-profissional-feminina-fazendo-contato-visual-contra-o-fundo-colorido.jpg?resize=604%2C403&ssl=1"
    },
    {
        "nome": "Carlos",
        "email": "carlos@gmail.com",
        "telefone": "(41) 9 8765 4321",
        "idade": 30,
        "aptidao": 30,
        "vaga": 3,
        "foto": "https://f.i.uol.com.br/fotografia/2025/01/28/17380813716799045bb0ffb_1738081371_3x2_md.jpg"
    }
];

function Page(){
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleCurriculo = () => setIsOpen(!isOpen);

    const returnHome = () => {
        router.push('/')
    }
    return(
        <div className={styles.main}>
            <button className={styles.returnHome} onClick={returnHome}><ArrowBigLeft/>Home</button>
            <h1 className={styles.titulo}>Candidatos Aptos - 3</h1>
            <div className={styles.bodyCandidates}>
                {Candidatos.map((candidato, index) => (
                <button onClick={toggleCurriculo} className={styles.candidate} key={index}>
                    {/*<img src={candidato.foto} alt="" />*/}
                    <div className={styles.details}>
                        <div className={styles.linha}>
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
                        <div className={styles.linha}>
                            <tr>Aptidão:</tr>
                            <td>{candidato.aptidao}%</td>
                        </div>
                        <div className={styles.linha}>
                            <tr>motivo:</tr>
                            <td></td>
                        </div>
                    </div>
                </button>
                ))}
            </div>





            {isOpen && (
            <div className={styles.bodyCurriculo}>
                <div className={styles.curriculo}>
                    <div className={styles.cabecalho}>
                        <div className="flex">
                            <img src="https://media.licdn.com/dms/image/v2/D4D03AQE-gQEecOmEyg/profile-displayphoto-shrink_200_200/B4DZQgPyT.HwAY-/0/1735707797234?e=2147483647&v=beta&t=QXYg9A1fyjKX2FgWFC4p2eWl5-lGr6CvhkTgl1oaWGI" alt="" />
                            <div className={styles.details}>
                                <div className={styles.linha}>
                                    <tr>nome:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className={styles.linha}>
                                    <tr>Email:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className={styles.linha}>
                                    <tr>Telefone:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className={styles.linha}>
                                    <tr>Vaga:</tr>
                                    <td>joão silva</td>
                                </div>
                            </div>
                        </div>
                        <button onClick={toggleCurriculo}>X</button>
                    </div><br /><hr /><br />
                    <div className={styles.result}>
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