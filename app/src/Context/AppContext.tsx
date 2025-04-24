"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DataContextType {
    data: Data;
    setData: (newData: Data) => void;
}

interface Data {
    perguntas: string[] | null;
    respostas: string | null;
    vaga: string[] | null;
    curriculo: string[] | null;
    anotacoes: string | null;
    transcricao: string | null;
    relatorios: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setDataState] = useState<Data>({
        perguntas: [],
        respostas: "",
        vaga: [],
        curriculo: [],
        anotacoes: "",
        transcricao: "",
        relatorios: ""
    });

    // Carrega os dados do sessionStorage quando o componente monta
    useEffect(() => {
        const storedData = sessionStorage.getItem("appData");
        if (storedData) {
            setDataState(JSON.parse(storedData));
        }
    }, []);

    // Atualiza tanto o estado quanto o sessionStorage
    const setData = (newData: Data) => {
        setDataState(newData);
        sessionStorage.setItem("appData", JSON.stringify(newData));
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
