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
    const [perguntas, setPerguntas] = useState<string[]>([]);
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
    const handleChangeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //const response = await InovaService.gerarQuest(numQuest, vaga, perguntas);
            //console.log(response.data);
            var i = 0;
            for(i = 0; perguntas.length < 10; i++){
                perguntas.push(`${i+1} - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae?`)
                console.log(perguntas);
            }
        } catch (error) {
            console.error('Erro ao gerar perguntas:', error);
        }
        setData({
            ...data,
            vaga,
            curriculo,
            anotacoes,
            transcricao,
            relatorios: formValues.relatorios,
            perguntas,
            respostas: formValues.respostas
        });
    
        console.log("Dados atualizados no contexto!", data);
        router.push('/questions');
    };
    


    return (
        <div className={styles.main}>
            <nav className={styles.navigation}>
                <h1 className={styles.titulo}>Gerar perguntas</h1>
                <button className={styles.returnHome} onClick={returnHome}><ArrowBigLeft/>Home</button>
            </nav>
            <div>
                <div className={styles.bodyInsert}>
                    <form method="post" onSubmit={handleChangeSubmit} className={styles.formGenerator}>
                        <h1 className={styles.titulo2}></h1>
                        <label htmlFor="vaga">Descrição da vaga</label>
                        <textarea 
                            name="vaga" 
                            id="" 
                            placeholder="Digite aqui"  
                            value={vaga} 
                            onChange={(e) => setVaga(e.target.value)}
                        />
                        <label htmlFor="curriculo">Coloque seu curriculo aqui</label>
                        <textarea 
                            name="curriculo" 
                            id="" 
                            placeholder="Digite aqui" 
                            value={curriculo} 
                            onChange={(e) => setCurriculo(e.target.value)}
                        />
                        <label htmlFor="anotacao">Coloque suas Anotações aqui</label>
                        <textarea 
                            name="anotacao" 
                            id="" 
                            placeholder="Digite aqui" 
                            value={anotacoes} 
                            onChange={(e) => setAnotacoes(e.target.value)}
                        />
                        <label htmlFor="transcricao">Coloque suas Transcrições aqui</label>
                        <textarea 
                            name="trascricao" 
                            id="" 
                            placeholder="Digite aqui" 
                            value={transcricao} 
                            onChange={(e) => setTranscricao(e.target.value)}
                        />
                        <div className={styles.descricao}>
                            {/*
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
                            />*/}
                        </div>
                        <div className={styles.descricao}>
                            {/*
                            <label className={styles.fileInputWrapper}>
                                <Paperclip/>
                                Anexar Curriculo Base
                                <input type="file" className={styles.fileCV} hidden/>
                            </label>*/}
                            {/*<input type="number" placeholder="Descreva a vaga" required className={styles.quantCandidatos}/>*/}
                            <button type="submit">Enviar <SendHorizonal/></button>
                        </div>
                    </form>
                </div>
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