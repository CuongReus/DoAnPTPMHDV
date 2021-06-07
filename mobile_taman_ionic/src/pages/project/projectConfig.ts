import { asyncRequests } from '../../data/dataApi';

export function loadProject() {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/project/listAll");
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function listFindByProjectYear(projectYearId : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/project/listFindByProjectYear?projectYearId=" + projectYearId);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadProjectYear(companyid : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/projectYear/listFindByCompany?company=" + companyid);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadAuthCurrentUser () {
    return new Promise((resolve, rejects) => {
        const user = asyncRequests.get("/auth/getCurrentUser");
        if (user) {
            resolve(user);
        } else {
            resolve(null);
        }
    })
}

export function loadListProjectByProjectItemId(projectItemId : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/projectDetail/listFindByProject?projectId=" + projectItemId);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}
export function loadProjectByProjectDetailId(projectDetailId : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/projectDetailDto/findByProjectDetailId?projectDetailId=" + projectDetailId);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataQuotation(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/quotation/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataApproval (idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/approval/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataAcceptance(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/acceptance/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataCloseProject(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/closeProject/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataEfficiency(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/efficiency/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataInvoiceVer1(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/invoiceVer1/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataInvoiceVer2(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/invoiceVer2/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataInvoiceVer3(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/invoiceVer3/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataContract(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/contract/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataComplete(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/complete/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}

export function loadDataIncurred(idProgress : number) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/incurred/" + idProgress);
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}




