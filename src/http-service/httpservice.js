import axios from 'axios';
const urlPrefix = 'http://localhost:54385/api/';
const header = {
    headers: {
        'Authorization': 'Bearer ' + localStorage['token'],
        'content-type': 'application/json; charset=utf-8'
    }
};
const headerNoAuth = {
    headers: { 'content-type': 'application/json; charset=utf-8' }
};
export function Get(url, bAuth = true) {
    return axios.get(urlPrefix + url, bAuth ? header : headerNoAuth);
}
export function Post(url, body, bAuth = true) {
    return axios.post(urlPrefix + url, body, bAuth ? header : headerNoAuth);
}
export function Put(url, body, bAuth = true) {
    return axios.put(urlPrefix + url, body, bAuth ? header : headerNoAuth);
}
export function Delete(url, bAuth = true) {
    return axios.delete(urlPrefix + url, bAuth ? header : headerNoAuth);
}




