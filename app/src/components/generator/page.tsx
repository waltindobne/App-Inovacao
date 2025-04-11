"use client"
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
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
            while (novasPerguntas.length < 3) {
                novasPerguntas.push(`${novasPerguntas.length + 1} - Lorem ipsum dolor sit amet...`);
            }
    
            setData({
                ...data,
                vaga,
                curriculo,
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
                            <select name="" id="" className="w-full p-2 bg-white border border-slate-400 rounded-lg outline-0">
                                <option value="">vaga1</option>
                                <option value="">vaga2</option>
                                <option value="">vaga3</option>
                                <option value="">vaga4</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="curriculo" className="font-bold">Descreva o curriculo aqui:</label>
                            <textarea 
                                name="curriculo" 
                                id="" 
                                placeholder="Digite aqui" 
                                value={curriculo} 
                                onChange={(e) => setCurriculo(e.target.value)}
                                className="w-full min-h-24 max-h-24 p-2 bg-white border border-slate-400 rounded-lg outline-0"
                            />
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