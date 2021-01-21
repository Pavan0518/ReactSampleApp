import axios from 'axios';
const urlPrefix = 'http://localhost:54385/api/';
const headerNoAuth = {
    headers: { 'content-type': 'application/json; charset=utf-8' }
};
const getAuthHeader = () => {
    const objHeader = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'content-type': 'application/json; charset=utf-8'
        }
    }
    return objHeader;
}
export function Get(url, bAuth = true) {
    return axios.get(urlPrefix + url, bAuth ? getAuthHeader() : headerNoAuth);
}
export function Post(url, body, bAuth = true) {
    return axios.post(urlPrefix + url, body, bAuth ? getAuthHeader() : headerNoAuth);
}
export function Put(url, body, bAuth = true) {
    return axios.put(urlPrefix + url, body, bAuth ? getAuthHeader() : headerNoAuth);
}
export function Delete(url, bAuth = true) {
    return axios.delete(urlPrefix + url, bAuth ? getAuthHeader() : headerNoAuth);
}




