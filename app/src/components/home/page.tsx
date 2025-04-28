"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Vacancy } from "@/Context/AppContext";
import { VacancyService } from "@/Services/WebApi";

function Page() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [ vagas, setVagas] = useState<Vacancy[]>([]);

    useEffect(() => {
        VacancyService.GetAllVacancies()
            .then((response) => {
                setVagas(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log('Erro ao tentar listar todas as vagas:', error)
            })
    }, []);

    const toggleCandidatos = (vaga: Vacancy) => {
        localStorage.setItem('idVaga', vaga.id.toString());
        router.push('/candidate')
    }
    
    return (
        <div className="w-4/5 mx-auto my-10">
            <h1 className="w-full flex justify-center text-sky-900 text-2xl py-3">
                Vagas Disponíveis - {vagas.length}
            </h1>
            <div className="w-full flex flex-wrap justify-center">
                {vagas.map((vaga:Vacancy) => (
                    <button onClick={() => toggleCandidatos(vaga)} className="w-xl h-70 p-4 border-2 border-blue-900 rounded-2xl text-slate-800 flex flex-col">
                    <div className="w-full flex justify-around items-center">
                        <div className="flex space-x-1">
                            <b>id:</b>
                            <p>{vaga.VacancyName}</p>
                        </div>
                        <div className="flex space-x-1">
                            <b>Empresa:</b>
                            <p>{vaga.VacancyCreator}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start mt-4">
                        <b>Descrição:</b>
                        <p className="text-justify mx-3">{vaga.Description}</p>
                    </div>
                </button>
                ))}
            </div>
        </div>
    );
}

export default Page;