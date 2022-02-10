import axios from 'axios';

const service = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true
    })
export default service;

function question(category, difficulty) {
    return service.get(`/question?${category}&${difficulty}`, {category, difficulty})
        .then(response => response.data)
    }
export {question}