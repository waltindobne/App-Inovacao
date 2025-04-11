"use client";

import { useData } from "@/Context/AppContext";

export default function MostrarDados() {
    const { data } = useData();

    return (
        <div>
            <h2>Dados Atualizados</h2>
            <p><strong>Vaga:</strong> {data.vaga}</p>
            <p><strong>Currículo:</strong> {data.curriculo}</p>
            <p><strong>Anotações:</strong> {data.anotacoes}</p>
            <p><strong>Transcrição:</strong> {data.transcricao}</p>
            <p><strong>Relatórios:</strong> {data.relatorios}</p>
            <h3>Perguntas:</h3>
            <ul>
                {data.perguntas.map((pergunta, index) => (
                    <li key={index}>{pergunta}</li>
                ))}
            </ul>
            <p><strong>Respostas:</strong> {data.respostas}</p>
        </div>
    );
}
