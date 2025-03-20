import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://smart.bne.com.br/",
    headers: {
        'Content-Type': 'application/json'
    }
})

export class InovaService {
    static gerarQuest(numQuest: number, vaga: string, perguntas: object){
        return axiosInstance.post(`/Entrevistador/EntrevistaCV/${numQuest}`,{
            perguntas: [
                perguntas
            ],
            respostas: "string",
            vaga: vaga,
            curriculo: "string",
            anotacoes: "string",
            transcricao: "string",
            relatorios: "string"
        })
    }
    static respostasQuest(numCandidato: number, vaga: string, perguntas: object){
        return axiosInstance.post(`/Entrevistador/Relatorio/${numCandidato}`,{
            perguntas: [
                perguntas
            ],
            respostas: "string",
            vaga: vaga,
            curriculo: "string",
            anotacoes: "string",
            transcricao: "string",
            relatorios: "string"
        })
    }
    static rankingCandidatos( vaga: string, relatorios: string){
        return axiosInstance.post(`/Entrevistador/Ranking/`,{
            vaga: vaga,
            curriculo: "string",
            anotacoes: "string",
            transcricao: "string",
            relatorios: relatorios
        })
    }
}