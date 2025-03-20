"use client"
import styles from "./generator.module.css";
import {useState, useEffect} from "react";
import { SendHorizonal, UploadIcon, Paperclip, ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { InovaService } from "@/Services/WebApi";
import { useData } from "@/Context/AppContext";

interface DataQuest{
    perguntas: string[],
    respostas: string,
    vaga: string,
    curriculo: string,
    anotacoes: string,
    transcricao: string,
    relatorios: string
}

function Page(){
    const router = useRouter();
    const { data, setData } = useData();
    const [ numQuest, setNumQuest] = useState(1);
    const [ vaga, setVaga] = useState('')
    const [ anotacoes, setAnotacoes] = useState('')
    const [ transcricao, setTranscricao] = useState('')
    const [ curriculo, setCurriculo] = useState('')
    const [ perguntas, setPerguntas] = useState([])

    const [formValues, setFormValues] = useState({
        vaga: "",
        curriculo: "",
        anotacoes: "",
        transcricao: "",
        relatorios: "",
        perguntas: "",
        respostas: ""
    });
    /*
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
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
    };*/

    const returnHome = () => {
        router.push('/')
    }
    const handleChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Impede o envio padrão do formulário
        useEffect(() => {
            InovaService.gerarQuest(numQuest, vaga, perguntas)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Alguma coisa nessa budega:', error);
                });
        });
        // Atualiza os dados no contexto antes de redirecionar
        setData({
            ...data,
            vaga: vaga,
            curriculo: curriculo,
            anotacoes: anotacoes,
            transcricao: transcricao,
            relatorios: formValues.relatorios,
            perguntas: perguntas,
            respostas: formValues.respostas
        });
    
        console.log("Dados atualizados no contexto!", data);
    
        // Redireciona para a página de perguntas
        router.push('/questions');
    };


    return (
        <div className={styles.main}>
            <h1 className={styles.titulo}>Gerar perguntas</h1>
            <button className={styles.returnHome} onClick={returnHome}><ArrowBigLeft/>Home</button>
            <div>
                <div className={styles.bodyInsert}>
                    <form method="post" onSubmit={handleChangeSubmit} className={styles.formGenerator}>
                        <textarea 
                            name="vaga" 
                            id="" 
                            placeholder="Descreva sua vaga aqui" 
                            value={vaga} 
                            onChange={(e) => setVaga(e.target.value)}
                        />
                        <div className={styles.descricao}>
                            <input 
                                type="text"
                                placeholder="Anotações"
                                className={styles.input}
                                value={anotacoes} 
                                onChange={(e) => setAnotacoes(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Transcrição"
                                className={styles.input}
                                value={transcricao} 
                                onChange={(e) => setTranscricao(e.target.value)}
                            />
                        </div>
                        <div className={styles.descricao}>
                            {/*
                            <label className={styles.fileInputWrapper}>
                                <Paperclip/>
                                Anexar Curriculo Base
                                <input type="file" className={styles.fileCV} hidden/>
                            </label>*/}
                            <input
                                type="text"
                                className={styles.fileCV}
                                placeholder="Curriculo" 
                                value={curriculo} 
                                onChange={(e) => setCurriculo(e.target.value)}
                            />
                            {/*<input type="number" placeholder="Descreva a vaga" required className={styles.quantCandidatos}/>*/}
                            <button type="submit"><SendHorizonal/></button>
                        </div>
                    </form>
                </div>
            </div>
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
            </div>
        </div>
    )
}
export default Page;