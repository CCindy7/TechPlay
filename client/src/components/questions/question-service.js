import axios from 'axios';

const service = axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
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

function results(round){
    return service.get(`/results?round=${round}`)
      .then(response => response.data)
}
export {results}

function questionsHistory(){
    return service.get(`/history`)
      .then(response => response.data)
}
export {questionsHistory}