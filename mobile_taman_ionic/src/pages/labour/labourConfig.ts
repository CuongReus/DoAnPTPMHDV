import { asyncRequests } from '../../data/dataApi';

export async function loadCurrentUser(email : string) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/auth/getByEmail?email=" +email);
        if (project) {
            resolve(project);

        } else {
            resolve(null);
        }
    })
}
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
export function loadListEfficiency() {
  return new Promise((resolve, rejects) => {
      const efficiency = asyncRequests.get("/efficiency/listAll");
      if (efficiency) {
          resolve(efficiency);
      } else {
          resolve(null);
      }
  })
}
export function loadLabourById(idLabour : number) {
  return new Promise((resolve, rejects) => {
      const labour = asyncRequests.get(`/labour/${idLabour}`);
      if (labour) {
          resolve(labour);
      } else {
          resolve(null);
      }
  })
}
export function loadLabourAttendanceById(idLabour : number) {
  return new Promise((resolve, rejects) => {
      const labour = asyncRequests.get(`/labourAttendance/${idLabour}`);
      if (labour) {
          resolve(labour);
      } else {
          resolve(null);
      }
  })
}
export function loadListLabourAttendanceForSupervisor(createdUserId :number , dateToWorkStart:any, dateToWorkEnd : any ) {
  return new Promise((resolve, rejects) => {
      const labourAttendanceForSupervisor = asyncRequests.get("/labourAttendance/findByCreatedUserId?createdUserId=" + createdUserId + "&dateToWorkStart=" + dateToWorkStart + "&dateToWorkEnd=" + dateToWorkEnd);
      if (labourAttendanceForSupervisor) {
          resolve(labourAttendanceForSupervisor);
      } else {
          resolve(null);
      }
  })
}



