"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextType {
    data: Data;
    setData: (newData: Data) => void;
}

interface Data {
        perguntas: string[],
        respostas: string,
        vaga: string,
        curriculo: string,
        anotacoes: string,
        transcricao: string,
        relatorios: string
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<Data>({
        perguntas: [],
        respostas: "",
        vaga: "",
        curriculo: "",
        anotacoes: "",
        transcricao: "",
        relatorios: ""
    });

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