"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Vacancy {
    id: number;
    VacancyName: string;
    Description: string;
    VacancyCreator: string;
}

export interface Candidate {
    id: number;
    CandidateName: string;
    Candidate_CV: string;
}
export interface Questions {
    id: number;
    Question: string;
    Idf_Candidature: number;
    Date_Create: string;
    Date_Update: string;
}
export interface Responses {
    id: number;
    Response: string;
    Idf_Question: number;
    Date_Create: string;
    Date_Update: string;
}
export interface Note {
    id: number;
    Note: string;
    Idf_Candidature: number;
    Date_Create: string;
    Date_Update: string;
}
export interface Responses {
    id: number;
    Response: string;
    Idf_Question: number;
    Date_Create: string;
    Date_Update: string;
}

export interface Candidature {
    id: number;
    TAB_Candidate: Candidate;
    TAB_Vacancy: Vacancy;
    TAB_Interview_Notes: Note;
    TAB_Questions: Questions;
    Date_Create: string;
    Date_Update: string;
}

/**/
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