"use client"
import styles from "./questions.module.css";
import { Paperclip, Check, ArrowBigLeft } from "lucide-react";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/Context/AppContext";

const perguntas = [
    "1- Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    "2- Nemo, tenetur excepturi temporibus numquam quaerat exercitationem fugit natus sint.",
    "3- Fugiat rerum est animi mollitia at soluta praesentium accusamus ipsum nesciunt.",
    "4- Exercitationem fugit natus sint fugiat rerum est animi mollitia at soluta."
];

function Page(){
    const [respostas, setRespostas] = useState(Array(perguntas.length).fill(""));
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [nomeArquivo, setNomeArquivo] = useState("");
    const router = useRouter();
    const { data } = useData();
    
    const returnHome = () => {
        router.push('/')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const novasRespostas = [...respostas];
        novasRespostas[index] = e.target.value;
        setRespostas(novasRespostas);
    };

    /*const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const arquivo = e.target.files?.[0];
        if (arquivo) {
            setNomeArquivo(arquivo.name);  // Atualiza o nome do 
        }
        else{
            setNomeArquivo('nehnum arquivo')
        }
    };*/

    useEffect(() => {
        if (respostas[indiceAtual].trim() !== "" && indiceAtual < perguntas.length - 1) {
            setTimeout(() => setIndiceAtual(indiceAtual + 1), 800);
        }
    }, [respostas[indiceAtual]]);

    return(
        <div className={styles.main}>
            <h1 className={styles.titulo}>Perguntas e Respostas</h1>
            <button className={styles.returnHome} onClick={returnHome}><ArrowBigLeft/>Home</button>
            <div className={styles.bodyForm}>
                {/*<form action="">
                    {perguntas.slice(0, indiceAtual + 1).map((pergunta, index) => (
                        <div key={index} className={styles.perguntas}>
                            <p><b>{pergunta}</b></p>
                            <input 
                                type="text" 
                                placeholder="Digite aqui sua resposta" 
                                value={respostas[index]} 
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>
                    ))}

                    {indiceAtual === perguntas.length - 1 && respostas[indiceAtual].trim() !== "" && (
                        <div>
                            {/*<div className={styles.curriculo}>
                                
                                <label className={styles.fileInputWrapper}>
                                    <Paperclip />
                                    Anexar Currículo Base
                                    <input
                                        type="file"
                                        className={styles.fileCV}
                                        hidden
                                        required
                                        onChange={handleFileChange}  // Captura o nome do arquivo
                                    />
                                </label>
                                {nomeArquivo && (
                                    <p className={styles.fileName}>Arquivo: {nomeArquivo}</p>
                                )}
                            </div>*
                            <button className={styles.buttonConfirm} type="submit"><Check/>Confirmar</button>
                        </div>
                    )}
                    
                </form>*/}

                <div>
                    <h2>Dados Atualizados</h2>
                    <p><strong>Vaga:</strong> {data.vaga}</p>
                    <p><strong>Currículo:</strong> {data.curriculo}</p>
                    <p><strong>Anotações:</strong> {data.anotacoes}</p>
                    <p><strong>Transcrição:</strong> {data.transcricao}</p>
                    <p><strong>Relatórios:</strong> {data.relatorios}</p>
                    <h3>Perguntas:</h3>
                    <ul>
                        {data.perguntas.map((pergunta, index) => (
                            <li key={index}>{pergunta}</li>
                        ))}
                    </ul>
                    <p><strong>Respostas:</strong> {data.respostas}</p>
                </div>
            </div>
        </div>
    )
}
export default Page;