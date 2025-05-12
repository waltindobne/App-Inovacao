"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { House, Medal, User2, ScrollText } from "lucide-react";

export default function Page(){
    const router = useRouter();
    
    const handleSendToVagas = () =>{
        router.push("/")
    }
    const handleSendToCandidates = () =>{
        router.push("/candidate")
    }
    const handleSendToRanking = () =>{
        router.push("/Ranking")
    }
    const handleSendToEntrevista = () =>{
        router.push("/generator")
    }


    return(
        <div className="w-full flex justify-between items-center px-4 py-3 bg-sky-800">
            <h1 className="text-amber-100 text-3xl mx-4 my-3">InterView Front</h1>
            <nav className="flex">
                <button className="cursor-pointer px-3 py-2 mx-1 rounded-lg text-white space-x-2 flex items-center hover:text-yellow-200" onClick={handleSendToVagas}><House className="mr-1"/>Inicio</button>
                <button className="cursor-pointer px-3 py-2 mx-1 rounded-lg text-white space-x-2 flex items-center hover:text-yellow-200" onClick={handleSendToCandidates}><User2 className="mr-1"/>Candidatos</button>
                <button className="cursor-pointer px-3 py-2 mx-1 rounded-lg text-white space-x-2 flex items-center hover:text-yellow-200" onClick={handleSendToRanking}><Medal className="mr-1"/>Ranking</button>
                <button className="cursor-pointer px-3 py-2 mx-1 rounded-lg text-white space-x-2 flex items-center hover:text-yellow-200" onClick={handleSendToEntrevista}><ScrollText className="mr-1"/>Entrevista</button>
            </nav>
        </div>
    )
}