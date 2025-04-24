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
    static CreateCandidate(){
        return axiosInstance.post('/Candidate/CreateCandidate');
    }
}
export class CandidatureService {
    static GetAllCandidatures(){
        return axiosInstance.get('/Candidature/GetAllCandidatures');
    }
    static CreateCandidature(){
        return axiosInstance.post('/Candidature/CreateCandidature');
    }
}
export class QuestionService {
    static GetAllQuestions(){
        return axiosInstance.get('/Questions/GetAllQuestions');
    }
    static CreateQuestionsWithIA(){
        return axiosInstance.post('/Questions/CreateQuestionsWithIA');
    }
    static CreateQuestions(){
        return axiosInstance.post('/Questions/CreateQuestion');
    }
}
export class ResponseService {
    static GetResponseByQuestionId(){
        return axiosInstance.get('/Questions/GetResponseByQuestionId');
    }
    static GetResponseByCandidatureId(){
        return axiosInstance.get('/Questions/GetResponseByCandidatureId');
    }
    static CreateResponse(){
        return axiosInstance.post('/Questions/CreateResponse');
    }
}
export class VacancyService {
    static GetAllVacancies(){
        return axiosInstance.get('/Vacancy/GetAllVacancies');
    }
    static CreateVacancy(){
        return axiosInstance.post('/Vacancy/CreateVacancy');
    }
}