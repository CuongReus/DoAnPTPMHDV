import session from '../services/sessionStorage';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import base64 from 'base-64';
// import { CacheService } from './middleware';

const superagent = superagentPromise(_superagent, global.Promise);

// react native không cho kết nối đến http, nếu muốn kết nối phải thay bằng địa chỉ IP
const API_HOST = 'http://demotaman.logsik.net:8085';
const API_ROOT = 'http://demotaman.logsik.net:8085/api';
const API_TOKEN = 'http://demotaman.logsik.net:8085/oauth/token';
// For Binh
// const API_HOST = 'http://192.168.0.112:8080';
// const API_ROOT = 'http://192.168.0.112:8080/api';
// const API_TOKEN = 'http://192.168.0.112:8080/oauth/token';
const responseBody = res => res.body;
const encode = encodeURIComponent;
const btoa = base64.encode;
let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Bearer ${token}`); // TODO: Check how to set request header
    }
};
const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).withCredentials().use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).withCredentials().use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).withCredentials().use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).withCredentials().use(tokenPlugin).then(responseBody),
    getPage: (url, page) => {
        var size = 20;
        if (!page) {
            page = 0;
        } else {
            page = page - 1; // to look url same as pagination
        }
        if (url.indexOf('?') != -1) {
            return superagent.get(`${API_ROOT}${url}` + '&page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
        } else {
            return superagent.get(`${API_ROOT}${url}` + '?page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
        }
    }

};

const asyncRequests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).withCredentials().use(tokenPlugin),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).withCredentials().use(tokenPlugin),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).withCredentials().use(tokenPlugin),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).withCredentials().use(tokenPlugin),
    getPage: (url, page) => {
            var size = 20;
            if (!page) {
                page = 0;
            } else {
                page = page - 1; // to look url same as pagination
            }
            if (url.indexOf('?') != -1) {
                return superagent.get(`${API_ROOT}${url}` + '&page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
            } else {
                return superagent.get(`${API_ROOT}${url}` + '?page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
            }
        }
};

const AuthService = {
    current: () =>
        requests.get('/auth/getCurrentUser'),
    login: (email, password) => {
        return superagent.post(`${API_TOKEN}`, `username=${encode(email)}&password=${encode(password)}&grant_type=password`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002"))
            .withCredentials().then(responseBody);
    },
    loginRememberMe: (refreshToken) =>
        superagent.post(`${API_TOKEN}`, `refresh_token=${encode(refreshToken)}&grant_type=refresh_token`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002"))
            .withCredentials().then(responseBody),
};


const LeaveLetterApi = {
    getLeaveLetter: (id) => requests.get('/leaveLetter/' + id)
};
export default {
    asyncRequests,
    AuthService,
    API_HOST,
    LeaveLetterApi,
    setToken: _token => { token = _token }
}