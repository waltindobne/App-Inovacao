"use client";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
import { VacancyService } from "@/Services/WebApi";

/*const Vagas = [
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
];*/

function Page(){
    const router = useRouter();
    const [vagas, setVagas] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        VacancyService.GetAllVacancies()
            .then((response) => {
                console.log(response.data);
                setVagas(response.data);
            })
            .catch((error) => {
                console.error('Erro ao listar as vagas:', error);
            })
    }, []);

    const toggleCandidatos = () => {
        router.push('/candidate')
    }

    return(
        <div className="w-4/5 mx-auto my-10">
            <h1 className="w-full flex justify-center text-sky-900 text-2xl py-3">Vagas Disponiveis - {vagas.length}</h1>
            <div className="w-full flex flex-wrap justify-center">
                {vagas.map((vaga, index) => (
                <button onClick={toggleCandidatos} className="w- m-2 p-4 flex text-slate-900 bg-white border-2 border-blue-900 rounded-2xl hover:bg-slate-200 hover:scale-102 cursor-pointer transition duration-200 ease-in-out" key={index}>
                    <img src={vaga.foto} alt="" className="w-60 rounded-md"/>
                    <div className="w-60 mx-4 flex flex-col items-start">
                        <div className="w-full flex border-b border-gray-400">
                            <tr className="font-bold mr-2">Vaga:</tr>
                            <td>{vaga.vaga}</td>
                        </div>
                        <div className="w-full flex border-b border-gray-400">
                            <tr className="font-bold mr-2">Disponiveis:</tr>
                            <td>{vaga.quantidade}</td>
                        </div>
                        <div className="w-full flex border-b border-gray-400">
                            <tr className="font-bold mr-2">Salario:</tr>
                            <td>{vaga.salario}</td>
                        </div>
                        <div className="w-full flex">
                            <tr className="font-bold mr-2">Requisitos:</tr>
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