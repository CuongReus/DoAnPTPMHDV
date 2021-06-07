import { createSelector } from 'reselect';
import { AppState } from '../../data/state';

const getEmployeeSalary = (state: AppState) => {
  return state.listemployeeSalary.employeeSalarys
};

const getSearch = (state: AppState) => state.data.searchText;

export const getFilteredEmployeeSalarys = createSelector(
  getEmployeeSalary, getSearch,
  (employeeSalarys, searchText) => {
    if (!searchText) {
      return employeeSalarys;
    }
    // return employeeSalarys.filter(employeeSalary => (employeeSalary.userId && employeeSalary.userId == searchNumber));
    return employeeSalarys.filter(employee => (employee.user.fullName && employee.user.fullName.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                              || (employee.user.email && employee.user.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
  }
)
