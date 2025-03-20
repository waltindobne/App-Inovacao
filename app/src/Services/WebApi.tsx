import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://smart.bne.com.br/Api/",
    headers: {
        'Content-Type': 'application/json'
    }
})
axiosInstance.interceptors.request.use(
    (config) => {
        const token = "79B43F11-F111-44BF-8946-DC4D957E3810";
        const clientId = "SmartBNE-API";

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (clientId) {
            config.headers["X-Client-Id"] = clientId;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
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