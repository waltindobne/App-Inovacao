"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useData } from "@/Context/AppContext";

interface Vaga {
    id: number;
    foto: string;
    vaga: string;
    quantidade: number;
    salario: number;
    requisitos: string;
}

interface Candidato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    idade: number;
    aptidao: number;
    motivo: string;
    vaga: number;
    foto: string;
}

interface Data {
    perguntas: string[];
    respostas: string;
    vaga: Vaga[];
    curriculo: string[];
    anotacoes: string;
    transcricao: string;
    relatorios: string;
    candidato?: Candidato | null;
}

const vagas: Vaga[] = [
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

function Page() {
    const router = useRouter();
    const { data, setData } = useData();
    const [isOpen, setIsOpen] = useState(false);

    const toggleCandidatos = (vagaData: Vaga) => {
        if (!setData) return;
        
        setData((prevData: Data) => ({
            ...prevData,
            vaga: [vagaData]
        }));
        
        router.push('/candidate');
    };

    return (
        <div className="w-4/5 mx-auto my-10">
            <h1 className="w-full flex justify-center text-sky-900 text-2xl py-3">
                Vagas Disponiveis - {vagas.length}
            </h1>
            <div className="w-full flex flex-wrap justify-center">
                {vagas.map((vaga, index) => (
                    <button 
                        onClick={() => toggleCandidatos(vaga)} 
                        className="w- m-2 p-4 flex text-slate-900 bg-white border-2 border-blue-900 rounded-2xl hover:bg-slate-200 hover:scale-102 cursor-pointer transition duration-200 ease-in-out" 
                        key={vaga.id}
                    >
                        <img src={vaga.foto} alt="" className="w-60 rounded-md"/>
                        <div className="w-60 mx-4 flex flex-col items-start">
                            <div className="w-full flex border-b border-gray-400">
                                <span className="font-bold mr-2">Vaga:</span>
                                <span>{vaga.vaga}</span>
                            </div>
                            <div className="w-full flex border-b border-gray-400">
                                <span className="font-bold mr-2">Disponiveis:</span>
                                <span>{vaga.quantidade}</span>
                            </div>
                            <div className="w-full flex border-b border-gray-400">
                                <span className="font-bold mr-2">Salario:</span>
                                <span>{vaga.salario}</span>
                            </div>
                            <div className="w-full flex">
                                <span className="font-bold mr-2">Requisitos:</span>
                                <span>{vaga.requisitos}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Page;