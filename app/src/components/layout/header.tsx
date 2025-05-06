"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page(){
    const router = useRouter();
    
    const handleSendToVagas = () =>{
        router.push("/")
    }
    const handleSendToRanking = () =>{
        router.push("/Ranking")
    }
    const handleSendToEntrevista = () =>{
        router.push("/generator")
    }


    return(
        <div className="w-full flex justify-between items-center px-4 py-3">
            <h1 className="text-blue-900 text-3xl mx-4 my-3">InterView Front</h1>
            <nav>
                <button className="cursor-pointer px-3 py-2 border-2 bg-gray-200 mx-1 border-blue-900 hover:bg-blue-900 rounded-lg text-blue-900 hover:text-white transition duration-200 ease-in-out" onClick={handleSendToVagas}>Inicio</button>
                <button className="cursor-pointer px-3 py-2 border-2 bg-gray-200 mx-1 border-blue-900 hover:bg-blue-900 rounded-lg text-blue-900 hover:text-white transition duration-200 ease-in-out" onClick={handleSendToRanking}>Ranking</button>
                <button className="cursor-pointer px-3 py-2 border-2 bg-gray-200 mx-1 border-blue-900 hover:bg-blue-900 rounded-lg text-blue-900 hover:text-white transition duration-200 ease-in-out" onClick={handleSendToEntrevista}>Entrevista</button>
            </nav>
        </div>
    )
}