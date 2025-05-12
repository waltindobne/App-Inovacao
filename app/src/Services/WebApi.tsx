import axios from "axios";

const username = "Inovacao";
const password = "fd7aac0b-76f5-492d-8549-d11a96b1b773";
const basicAuth = btoa(`${username}:${password}`);
export const axiosInstance = axios.create({
  baseURL: "https://testing-interview.bne.com.br/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Basic ${basicAuth}`,
  }
});


export class CandidateService {
    static GetAllCandidates(VacancyId: number, origem: number){
        return axiosInstance.get(`/Candidate/GetAllCandidates?origem=${origem}`, {
            headers: {
                vacancyId: VacancyId
            }
        });
    }
    static GetCandidateById(origem: number, idCandidate: number){
        return axiosInstance.get(`/Candidate/GetCandidateById`, {
            params: {
                origem: origem
            },
            headers: {
                candidateId: idCandidate
            }
        });
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
    static CreateQuestionsByIA(VacancyId: number, CandidateId: number, origem: number) {
        return axiosInstance.post(`/Questions/CreateQuestionsByIA?candidateId=${CandidateId}&origem=${origem}`,
            {},
            {
                headers: {
                    vacancyId: VacancyId
                }
            }
        );
    }
    
    static CreateQuestion(){
        return axiosInstance.post('/Questions/CreateQuestion');
    }
}
export class ResponseService {
    static GetAllResponses(){
        return axiosInstance.get('/Responses/GetAllResponses');
    }
    static GetResponseByCandidatureId(){
        return axiosInstance.get('/Responses/GetResponseByCandidatureId');
    }
    static CreateResponse(idf_questions: number[], responses: string[], origemEnum: number){
        return axiosInstance.post('/Responses/CreateResponse', {
            idf_Questions: idf_questions,
            responses: responses,
            origemEnum: origemEnum
        });
    }
}
export class VacancyService {
    static GetVacancyByExternalId(externalId: number, origem: number) {
        return axiosInstance.get(`/Vacancy/GetVacancyByExternalId`, {
            params: {
                origem: origem
            },
            headers: {
                externalId: externalId.toString()
            }
        });
    }    
}
export class RankingService {
    static GetAllRankings(){
        return axiosInstance.get('/Ranking/GetAllRankings');
    }
    static GetAllRankingsByVacancyId(vacancyId: number){
        return axiosInstance.get('/Ranking/GetAllRankingsByVacancyId',{
            headers:{
                vacancyId: vacancyId
            }
        });
    }
    static GetAllRankingsByOrigem(){
        return axiosInstance.get('/Ranking/GetAllRankingsByOrigem');
    }
    static CreateRankingByIA(origem: number, vacancyId: number){
        return axiosInstance.post(`/Ranking/CreateRankingByIA?origemEnum=${origem}`, null, {
            headers: {
                VancacyId: vacancyId
            }
        });
    }    
}
export class NoteService {
    static GetAllNotes(queryOptions: any) {
        return axiosInstance.get('/Notes/GetAllNotes', {
            params: queryOptions
        });
    }

    static GetAllNotesByVacancyId(vacancyId: number) {
        console.log(`/Notes/GetAllNotesByVacancyId/${vacancyId}`)
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

    static CreateNotes(Idf_Candidate: number, Idf_Vacancy: number, Note: string, OrigemEnum: number) {
        return axiosInstance.post(`/Notes/CreateNotes`, {
            idf_Candidate: Idf_Candidate,
            idf_Vacancy: Idf_Vacancy,
            note: Note,
            origemEnum: OrigemEnum
        });
    } 
}
