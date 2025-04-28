"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Vaga {
    id: number;
    foto: string;
    vaga: string;
    quantidade: number;
    salario: number;
    requisitos: string;
}

export interface Candidato {
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
    respostas: string[];
    vaga: Vaga[];
    curriculo: Candidato[];
    anotacoes: string;
    transcricao: string;
    relatorios: string;
}

interface DataContextType {
    data: Data;
    setData: (newData: Data | ((prev: Data) => Data)) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const defaultData: Data = {
        perguntas: [],
        respostas: [],
        vaga: [],
        curriculo: [],
        anotacoes: "",
        transcricao: "",
        relatorios: ""
    };

    const [data, setDataState] = useState<Data>(defaultData);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem("appData");
            if (storedData && storedData !== "undefined") {
                const parsedData = JSON.parse(storedData);
                setDataState({
                    ...defaultData,
                    ...parsedData,
                    vaga: parsedData.vaga || [],
                    curriculo: parsedData.curriculo || [],
                    perguntas: parsedData.perguntas || [],
                    respostas: parsedData.respostas || []
                });
            }
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
            localStorage.removeItem("appData"); // Limpa dados inválidos
        }
    }, []);

    const setData = (newData: Data | ((prev: Data) => Data)) => {
        setDataState(prev => {
            const updatedData = typeof newData === 'function' ? newData(prev) : newData;
            localStorage.setItem("appData", JSON.stringify(updatedData));
            return updatedData;
        });
    };

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};