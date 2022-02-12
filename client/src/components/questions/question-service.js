import axios from 'axios';

const service = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
    })
export default service;

function question(category, number, difficulty) {
    return service.get(`/question`, {params: {category, number, difficulty}})
        .then(response => response.data)
    }
export {question}

function solution(questionId){
    return service.post(`/solution/${questionId}`)
}
export {solution}