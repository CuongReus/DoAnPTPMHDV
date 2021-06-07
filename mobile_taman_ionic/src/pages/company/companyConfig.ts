import { asyncRequests } from '../../data/dataApi';

export async function loadCompany() {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/company/listAll");
        if (project) {
            resolve(project);
        } else {
            resolve(null);
        }
    })
}


