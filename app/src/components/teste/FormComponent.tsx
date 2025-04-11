"use client";

import { useState } from "react";
import { useData } from "@/Context/AppContext";

export default function FormComponent() {
    const { data, setData } = useData();
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
    };

    return (
        <form onSubmit={handleSubmit} className="text-black" method="post">
            <input type="text" name="vaga" value={formValues.vaga} onChange={handleChange} placeholder="Vaga" />
            <input type="text" name="curriculo" value={formValues.curriculo} onChange={handleChange} placeholder="Currículo" />
            <input type="text" name="anotacoes" value={formValues.anotacoes} onChange={handleChange} placeholder="Anotações" />
            <input type="text" name="transcricao" value={formValues.transcricao} onChange={handleChange} placeholder="Transcrição" />
            <input type="text" name="relatorios" value={formValues.relatorios} onChange={handleChange} placeholder="Relatórios" />
            <input type="text" name="perguntas" value={formValues.perguntas} onChange={handleChange} placeholder="Perguntas" />
            <input type="text" name="respostas" value={formValues.respostas} onChange={handleChange} placeholder="Respostas" />

            <button type="submit">Enviar</button>
        </form>
    );
}
