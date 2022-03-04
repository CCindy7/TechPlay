import axios from 'axios';

const service = axios.create({
baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
withCredentials: true
})
export default service;

function edit(id, username) {
    return service.put(`/edit/${id}`, {username}).then(response => response.data)
}
export {edit}

function deleteProfile(id) {
    return service.delete(`${id}/delete`)
}
export {deleteProfile}