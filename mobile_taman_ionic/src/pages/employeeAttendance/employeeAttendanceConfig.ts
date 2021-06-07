import { asyncRequests } from '../../data/dataApi';

export function loadEmployeeAttendanceById(id : number) {
  return new Promise((resolve, rejects) => {
      const employee = asyncRequests.get(`/employeeAttendance/${id}`);
      if (employee) {
          resolve(employee);
      } else {
          resolve(null);
      }
  })
}


