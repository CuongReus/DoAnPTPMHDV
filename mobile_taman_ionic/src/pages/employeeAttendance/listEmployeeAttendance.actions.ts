import { ActionType } from '../../util/types';
import { asyncRequests } from '../../data/dataApi';
import { ListEmployeeState } from './listEmployeeAttendance.state';


export const loadListEmployeeAttendance = (userId : number ,startDateOfMonth : string, endDateOfMonth : string) => async (dispatch: React.Dispatch<any>) => {
  const employees = await asyncRequests.get('/employeeAttendance/findByUserId?userId=' + userId + '&dateToWorkStart=' + startDateOfMonth +
  "&dateToWorkEnd=" + endDateOfMonth);
  dispatch(setListEmployeeAttendanceData({ employees: employees }));
};

export const setListEmployeeAttendanceData = (employees: Partial<ListEmployeeState>) => ({
  type: 'set-list-employee-attendance-data',
  employees
} as const);

export type ListEmployeeActions =
  ActionType<typeof setListEmployeeAttendanceData>


