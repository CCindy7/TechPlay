import axios from 'axios';

const service = axios.create({
baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
withCredentials: true
})
export default service;

function login(email, password) {
return service.post('/login', {email, password})
    .then(response => response.data)
}
export {login}

function signup(username, email, password, confirmation) {
return service.post('/signup', {
    username,
    email,
    password,
    confirmation
})
    .then(response => response.data)
}
export {signup}

function loggedin() {
return service.get('/loggedin')
    .then(response => response.data)
}
export {loggedin}

function logout() {
return service.get('/logout', {})
    .then(response => response.data)
}
export {logout}

function edit(id, username) {
    return service.put(`/edit/${id}`, {username}).then(response => response.data)
}
export {edit}