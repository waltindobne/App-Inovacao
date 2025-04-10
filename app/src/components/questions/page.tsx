"use client"
import { Paperclip, Check, ArrowBigLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/Context/AppContext";

function Page() {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [nomeArquivo, setNomeArquivo] = useState("");
    const router = useRouter();
    const { data } = useData();
    const [perguntas, setPerguntas] = useState(data.perguntas || []);
    const [respostas, setRespostas] = useState(Array((data.perguntas || []).length).fill(""));
    
    const returnHome = () => {
        router.push('/')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const novasRespostas = [...respostas];
        novasRespostas[index] = e.target.value;
        setRespostas(novasRespostas);
    };

    useEffect(() => {
        if (respostas[indiceAtual]?.trim() !== "" && indiceAtual < perguntas.length - 1) {
            setTimeout(() => setIndiceAtual(indiceAtual + 1), 1200);
        }
    }, [respostas, indiceAtual, perguntas]);

    return (
        <div className="">
            <h1 className="">Perguntas e Respostas</h1>
            <button className="" onClick={returnHome}><ArrowBigLeft />Home</button>
            <div className="">
                <form action="">
                    {perguntas.slice(0, indiceAtual + 1).map((pergunta, index) => (
                        <div key={index} className="">
                            <label htmlFor="respostas"><b>{pergunta}</b></label>
                            <input
                                type="text"
                                name="respostas"
                                placeholder="Digite aqui sua resposta"
                                value={respostas[index]} 
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>
                    ))}

                    {indiceAtual === perguntas.length - 1 && respostas[indiceAtual].trim() !== "" && (
                        <div>
                            <button className="" type="submit"><Check />Confirmar</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Page;