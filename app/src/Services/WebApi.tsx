import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://localhost:",
    headers: {
        'Content-Type': 'application/json'
    }
})
/*
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
);*/
export class CandidateService {
    static GetAllCandidates(){
        return axiosInstance.get('/Candidate/GetAllCandidates');
    }
    static GetCandidateById(){
        return axiosInstance.get('/Candidate/GetCandidateById')
    }
}
export class CandidatureService {
    static GetAllCandidatures(id: number){
        return axiosInstance.get('/Candidature/GetAllCandidatures');
    }
    static CreateCandidature(data: { idf_Candidate: number; idf_Vacancy: number }) {
        return axiosInstance.post('/Candidature/CreateCandidature', data);
    }
}
export class QuestionService {
    static GetAllQuestions(){
        return axiosInstance.get('/Questions/GetAllQuestions');
    }
    static GetAllQuestionsByVacancyId(){
        return axiosInstance.post('/Questions/GetAllQuestionsByVacancyId');
    }
    static GetAllQuestionsByOrigem(){
        return axiosInstance.post('/Questions/GetAllQuestionsByOrigem');
    }
    static CreateQuestionsByIA(){
        return axiosInstance.post('/Questions/CreateQuestionsByIA');
    }
    static CreateQuestion(){
        return axiosInstance.post('/Questions/CreateQuestion');
    }
}
export class ResponseService {
    static GetAllResponses(){
        return axiosInstance.get('/Questions/GetAllResponses');
    }
    static GetResponseByCandidatureId(){
        return axiosInstance.get('/Questions/GetResponseByCandidatureId');
    }
    static CreateResponse(){
        return axiosInstance.post('/Questions/CreateResponse');
    }
}
export class VacancyService {
    static GetVacancyByExternalId(externalId: number, origem: number) {
        return axiosInstance.get('/Vacancy/GetVacancyByExternalId', {
            headers: {
                externalId: externalId,
                origem: origem
            }
        });
    }
}
export class RankingService {
    static GetAllRankings(){
        return axiosInstance.get('/Vacancy/GetAllRankings');
    }
    static GetAllRankingsByVacancyId(){
        return axiosInstance.get('/Vacancy/GetAllRankingsByVacancyId');
    }
    static GetAllRankingsByOrigem(){
        return axiosInstance.get('/Vacancy/GetAllRankingsByOrigem');
    }
    static CreateRankingByIA(){
        return axiosInstance.get('/Vacancy/CreateRankingByIA');
    }
}
export class NoteService {
    static GetAllNotes(queryOptions: any) {
        return axiosInstance.get('/Notes/GetAllNotes', {
            params: queryOptions
        });
    }

    static GetAllNotesByVacancyId(vacancyId: number) {
        return axiosInstance.get('/Notes/GetAllNotesByVacancyId', {
            headers: {
                VacancyId: vacancyId
            }
        });
    }

    static GetAllNotesByOrigem(origemEnum: number) {
        return axiosInstance.get('/Notes/GetAllNotesByOrigem', {
            headers: {
                origemEnum: origemEnum
            }
        });
    }

    static CreateNotes(noteData: {
        idf_Vacancy: number;
        idf_Candidate: number;
        origemEnum: number;
        note: string;
    }) {
        return axiosInstance.post('/Notes/CreateNotes', noteData);
    }
}
