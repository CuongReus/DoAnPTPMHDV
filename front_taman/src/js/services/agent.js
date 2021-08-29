import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { CacheService } from './middleware';

const superagent = superagentPromise(_superagent, global.Promise);

// const getApiRoot() = 'http://localhost:8080/api';
// const getApiToken() = 'http://localhost:8080/oauth/token';
// const getApiRoot() = 'http://125.212.243.69:8080/api';
// const getApiToken() = 'http://125.212.243.69:8080/oauth/token';

let backendUrl = null;

let getBackendUrl = () => {
    return backendUrl;
}

let setBackendUrl = (_backendUrl) => { backendUrl = _backendUrl };

let getApiRoot = () => {
    return backendUrl +  '/api';
}
let getApiToken = () => {
    return backendUrl +  '/oauth/token';
}

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Bearer ${token}`); // TODO: Check how to set request header
    }
};

const requests = {
    del: url =>
        superagent.del(`${getApiRoot()}${url}`).withCredentials().use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${getApiRoot()}${url}`).withCredentials().use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${getApiRoot()}${url}`, body).withCredentials().use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${getApiRoot()}${url}`, body).withCredentials().use(tokenPlugin).then(responseBody),
    getPage: (url, page) => {
        var size = 20;
        if (!page) {
            page = 0;
        } else {
            page = page - 1; // to look url same as pagination
        }
        if (url.indexOf('?') != -1) {
            return superagent.get(`${getApiRoot()}${url}` + '&page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
        } else {
            return superagent.get(`${getApiRoot()}${url}` + '?page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
        }
    }

};

const asyncRequests = {
    del: url =>
        superagent.del(`${getApiRoot()}${url}`).withCredentials().use(tokenPlugin),
    get: url =>
        superagent.get(`${getApiRoot()}${url}`).withCredentials().use(tokenPlugin),
    put: (url, body) =>
        superagent.put(`${getApiRoot()}${url}`, body).withCredentials().use(tokenPlugin),
    post: (url, body) =>
        superagent.post(`${getApiRoot()}${url}`, body).withCredentials().use(tokenPlugin),
    getPage: (url, page) => {
            var size = 20;
            if (!page) {
                page = 0;
            } else {
                page = page - 1; // to look url same as pagination
            }
            if (url.indexOf('?') != -1) {
                return superagent.get(`${getApiRoot()}${url}` + '&page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
            } else {
                return superagent.get(`${getApiRoot()}${url}` + '?page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
            }
        }
};

const AuthService = {
    initBackendUrl: () => {
        superagent.get("/assets/config_data.json").then((data) => {
            var backendUrl = data.body.backendUrl;
            window.sessionStorage.setItem("backendUrl", backendUrl);
            setBackendUrl(backendUrl);
        });
    },
    current: () =>
        requests.get('/auth/getCurrentUser'),
    login: (email, password) => {
        return superagent.post(`${getApiToken()}`, `username=${encode(email)}&password=${encode(password)}&grant_type=password`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002"))
            .withCredentials().then(responseBody);
    },
    loginRememberMe: (refreshToken) =>
        superagent.post(`${getApiToken()}`, `refresh_token=${encode(refreshToken)}&grant_type=refresh_token`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002"))
            .withCredentials().then(responseBody),
};



const UserApi = {
    listPersonel: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/user/list?search=' + encode(search), page, 20);
    },
    listAllPersonel: () => requests.get('/user/listAll'),
    getPersonel: (id) => requests.get('/user/' + id),
    getRole: (id) => requests.get('/role/' + id),
};

const LeaveDayApi = {
    listLeaveDay: (year, page) => {
        return requests.getPage('/leaveLetter/listLeaveDay?year='+year, page, 20);
    },
    listAllLeaveDay: () => requests.get('/user/listAll')
    // getPersonel: (id) => requests.get('/user/' + id)
};

const LeaveLetterApi = {
    getLeaveLetter: (id) => requests.get('/leaveLetter/' + id)
};


const ProjectApi = {
    listProject: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/project/list?search=' + encode(search), page, 20);
    },
    listAllProject: () => requests.get('/project/listAll'),
    getProject: (id) => requests.get('/project/' + id)
};

const ProjectDetailApi = {
    listProjectDetail: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/projectDetail/list?search=' + encode(search), page, 20);
    },
    listAllProjectDetail: () => requests.get('/projectDetail/listAll'),
    getProjectDetail: (id) => requests.get('/projectDetail/' + id)
};

const CompanyApi = {
    listCompany: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/company/list?search=' + encode(search), page, 20);
    },
    listAllCompany: () => requests.get('/company/listAll'),
    getCompany: (id) => requests.get('/company/' + id)
};

const ConstructionTeamApi = {
    listConstructionTeam: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/constructionTeam/list?search=' + encode(search), page, 20);
    },
    listAllConstructionTeam: () => requests.get('/constructionTeam/listAll'),
    getConstructionTeam: (id) => requests.get('/constructionTeam/' + id)
};

const ApprovalApi = {
    listApproval: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/approval/list?search=' + encode(search), page, 20);
    },
    listAllApproval: () => requests.get('/approval/listAll'),
    getApproval: (id) => requests.get('/approval/' + id)
};


const EfficiencyApi = {
    listEfficiency: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/efficiency/list?search=' + encode(search), page, 20);
    },
    listAllEfficiency: () => requests.get('/efficiency/listAll'),
    getEfficiency: (id) => requests.get('/efficiency/' + id)
};


const CompleteApi = {
    listComplete: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/complete/list?search=' + encode(search), page, 20);
    },
    listAllComplete: () => requests.get('/complete/listAll'),
    getComplete: (id) => requests.get('/complete/' + id)
};

const LabourApi = {
    listLabour: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/labour/list?search=' + encode(search), page, 20);
    },
    listAllLabour: () => requests.get('/labour/listAll'),
    getLabour: (id) => requests.get('/labour/' + id)
};

const LabourAttendanceApi = {
    listLabourAttendance: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/labourAttendance/list?search=' + encode(search), page, 20);
    },
    listAllLabourAttendance: () => requests.get('/labourAttendance/listAll'),
    getLabourAttendance: (id) => requests.get('/labourAttendance/' + id)
};

const EmployeeAttendanceApi = {
    listEmployeeAttendancey: (search, page) => {
        if (!search) {
            search = 0;
        }
        return requests.getPage('/employeeAttendance/list?search=' + encode(search), page, 20);
    },
    listAllEmployeeAttendance: () => requests.get('/employeeAttendance/listAll'),
    getEmployeeAttendance: (id) => requests.get('/employeeAttendance/' + id)
};

const DepartmentApi = {
    listDepartment: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/department/list?search=' + encode(search), page, 20);
    },
    listAllDepartment: () => requests.get('/department/listAll'),
    getDepartment: (id) => requests.get('/department/' + id)
};

const SwotItemApi = {
    listSwotItem: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/swotItem/list?search=' + encode(search), page, 20);
    },
    listAllSwotItem: () => requests.get('/swotItem/listAll'),
    getSwotItem: (id) => requests.get('/swotItem/' + id)
};

const SwotUserApi = {
    listSwotUser: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/swotUser/list?search=' + encode(search), page, 20);
    },
    listAllSwotUser: () => requests.get('/swotUser/listAll'),
    getSwotUser: (id) => requests.get('/swotUser/' + id)
};

const JobApi = {
    listJob: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/job/list?search=' + encode(search), page, 20);
    },
    listAllJob: () => requests.get('/job/listAll'),
    getJob: (id) => requests.get('/job/' + id)
};

const SwotJobApi = {
    listSwotJob: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/swotJob/list?search=' + encode(search), page, 20);
    },
    listAllSwotJob: () => requests.get('/swotJob/listAll'),
    getSwotJob: (id) => requests.get('/swotJob/' + id)
};

const ContactApi = {
    listContact: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/contact/list?search=' + encode(search), page, 20);
    },
    listAllContact: () => requests.get('/contact/listAll'),
    getContact: (id) => requests.get('/contact/' + id)
};

const ContactDetailApi = {
    listContactDetail: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/contactDetail/list?search=' + encode(search), page, 20);
    },
    listAllContactDetail: () => requests.get('/contactDetail/listAll'),
    getContactDetail: (id) => requests.get('/contactDetail/' + id)
};


export default {
    asyncRequests,
    AuthService,
    UserApi,
    LeaveDayApi,
    LeaveLetterApi,
    ProjectApi,
    ProjectDetailApi,
    CompanyApi,
    ConstructionTeamApi,
    ApprovalApi,
    EfficiencyApi,
    CompleteApi,
    LabourApi,
    LabourAttendanceApi,
    EmployeeAttendanceApi,
    DepartmentApi,
    SwotItemApi,
    SwotUserApi,
    JobApi,
    SwotJobApi,
    ContactApi,
    ContactDetailApi,
    setToken: _token => { token = _token },
    setBackendUrl,
    getBackendUrl,
}