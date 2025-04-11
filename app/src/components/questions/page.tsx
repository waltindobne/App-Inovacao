"use client"
import { Paperclip, Check, ArrowBigLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/Context/AppContext";

const Candidato = {
    foto: "https://i.pinimg.com/564x/b4/00/bb/b400bba24a3ac713c5611facf4376d7e.jpg",
    nome: "João Teste",
    email: "joao@gmail.com",
    idade: 3,
}

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
    console.log(data)

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
        <div className="w-3/5 p-8 mx-auto my-10 border-2 border-blue-900 rounded-2xl">
            {/*<h1 className="text-blue-900 text-2xl">Perguntas e Respostas</h1>*/}
            <div className="w-full text-slate-800">
                <div className="w-full flex mb-6 pb-4 border-b border-slate-200">
                    <img src={Candidato.foto} alt="" className="w-50 rounded-md"/>
                    <div className="w-full mx-4 flex flex-col items-start">
                        <div className="w-full flex border-b border-gray-200">
                            <tr className="font-bold mr-2">Nome:</tr>
                            <td>{Candidato.nome}</td>
                        </div>
                        <div className="w-full flex border-b border-gray-200">
                            <tr className="font-bold mr-2">Email:</tr>
                            <td>{Candidato.email}</td>
                        </div>
                        <div className="w-full flex">
                            <tr className="font-bold mr-2">Idade:</tr>
                            <td>{Candidato.idade}</td>
                        </div>
                    </div>
                </div>
                <form action="">
                    {perguntas.slice(0, indiceAtual + 1).map((pergunta, index) => (
                        <div key={index} className="mt-4 flex flex-col w-full">
                            <label htmlFor="respostas"><b>{pergunta}</b></label>
                            <input
                                type="text"
                                name="respostas"
                                placeholder="Digite aqui a resposta"
                                value={respostas[index]} 
                                onChange={(e) => handleChange(e, index)}
                                required
                                className="w-full p-2 bg-slate-50 border-b border-slate-400 outline-0"
                            />
                        </div>
                    ))}

                    {indiceAtual === perguntas.length - 1 && respostas[indiceAtual].trim() !== "" && (
                        <div>
                            <button className="w-full flex justify-center items-center mt-4 p-2 border-2 border-green-500 rounded-lg font-bold hover:bg-green-500 hover:text-white" type="submit"><Check />Confirmar</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Page;