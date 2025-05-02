"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Vacancy {
    id: number;
    vacancyName: string;
    description: string;
    vacancyCreator: string;
    origemEnum: number;
}

export interface Candidate {
    id: number;
    candidateName: string;
    candidate_CV: string;
    origemEnum: number;
}

export interface Questions {
    id: number;
    question: string;
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

export interface Candidature {
    id: number;
    TAB_Candidate: Candidate;
    TAB_Vacancy: Vacancy;
    TAB_Interview_Notes: Note;
    TAB_Questions: Questions;
    Date_Create: string;
    Date_Update: string;
}


interface Data {
    questions: Questions[];
}

interface DataContextType {
    data: Data;
    setData: (newData: Data | ((prev: Data) => Data)) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const defaultData: Data = {
        questions: []
    };

    const [data, setDataState] = useState<Data>(defaultData);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem("appData");
            if (storedData && storedData !== "undefined") {
                const parsedData = JSON.parse(storedData);
                setDataState(parsedData);
            }
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
            localStorage.removeItem("appData");
        }
    }, []);

    const setData = (newData: Data | ((prev: Data) => Data)) => {
        const updatedData = typeof newData === "function" ? newData(data) : newData;
        setDataState(updatedData);
        localStorage.setItem("appData", JSON.stringify(updatedData));
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
