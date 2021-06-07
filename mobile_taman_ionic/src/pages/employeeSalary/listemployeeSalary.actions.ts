import { ActionType } from '../../util/types';
import { asyncRequests } from '../../data/dataApi';
import { ListEmployeeSalaryState } from './listemployeeSalary.state';

export const loadListEmployeeSalary = () => async (dispatch: React.Dispatch<any>) => {
  const employeeSalarys = await asyncRequests.get("/employeeSalary/listAllUserIsActive");
  dispatch(setListEmployeeSalaryData({employeeSalarys:employeeSalarys}));
};

export const setListEmployeeSalaryData = (employeeSalarys: Partial<ListEmployeeSalaryState>) => ({
  type: 'set-list-employeeSalary-data',
  employeeSalarys
} as const);

export const setSearchText = (searchText ?: string) => ({ 
  type: 'set-search-number', 
  searchText 
} as const);

export type ListEmployeeSalaryActions =
  ActionType<typeof setListEmployeeSalaryData>   
| ActionType<typeof setSearchText>   
