import axios from 'axios';

const service = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
    })
export default service;

function question(category, difficulty) {
    return service.get(`/question?category=${category}&difficulty=${difficulty}`)
        .then(response => response.data)
    }
export {question}

function solution(questionId, userResponse, correct_answer){
    return service.post(`/solution/${questionId}`, {userResponse, correct_answer})
        .then(response => response.data)
}
export {solution}

function history(){
    return service.get(`/history`)
      .then(response => response.data)
}
export {history}