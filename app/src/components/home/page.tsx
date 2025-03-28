"use client";
import styles from "./home.module.css";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";

const Vagas = [
    {
        "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-Xu2k0C4wdc35bq-r9uI1813kclztywZhw&s",
        "vaga": "Desenvolvedor Frontend",
        "quantidade": 2,
        "salario": 4000,
        "requisitos": "html, css, javascript, react, tailwind"
    },
    {
        "foto": "https://i.pinimg.com/564x/b4/00/bb/b400bba24a3ac713c5611facf4376d7e.jpg",
        "vaga": "Desenvolvedor Backend",
        "quantidade": 3,
        "salario": 4500,
        "requisitos": "c#, sql, github, azure"
    }
];

function Page(){
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const navigationToGenerate = () => {
        router.push('/generator')
    }
    const navigationToQuest = () => {
        router.push('/questions')
    }
    const navigationToRanking = () => {
        router.push('/Ranking')
    }

    const toggleCandidatos = () => {
        router.push('/candidate')
    }

    return(
        <div className={styles.main}>
            <button onClick={navigationToGenerate} className={styles.buttonAddQuest}>
                Descrever Vaga
            </button>
            <button onClick={navigationToQuest} className={styles.buttonAddQuest}>
                Responder Perguntas
            </button>
            <button onClick={navigationToRanking} className={styles.buttonAddQuest}>
                Ranking Candidatos
            </button>
            
            <h1 className={styles.titulo}>Vagas Disponiveis - 2</h1>
            <div className={styles.bodyVagas}>
                {Vagas.map((vaga, index) => (
                <button onClick={toggleCandidatos} className={styles.vaga} key={index}>
                    <img src={vaga.foto} alt="" />
                    <div className={styles.details}>
                        <div className={styles.linha}>
                            <tr>Vaga:</tr>
                            <td>{vaga.vaga}</td>
                        </div>
                        <div className={styles.linha}>
                            <tr>Disponiveis:</tr>
                            <td>{vaga.quantidade}</td>
                        </div>
                        <div className={styles.linha}>
                            <tr>Salario:</tr>
                            <td>{vaga.salario}</td>
                        </div>
                        <div className={styles.linha}>
                            <tr>Requisitos:</tr>
                            <td>{vaga.requisitos}</td>
                        </div>
                    </div>
                </button>
                ))}
            </div>
        </div>
    )
}
export default Page;