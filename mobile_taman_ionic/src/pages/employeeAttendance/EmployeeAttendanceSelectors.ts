import { createSelector } from 'reselect';
import { AppState } from '../../data/state';
import { SecurityUtils } from '../../util/javascriptUtils';

const getEmployees = (state: AppState) => {
  return state.listEmployeeAttendance.employees
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredEmployees = createSelector(
  getEmployees, getSearchText,
  (employees, searchText) => {
    if (!searchText) {
      return employees;
    }
    return employees.filter(employee => (employee.user.fullName && employee.user.fullName.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                              || (employee.user.phone && employee.user.phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                              || (employee.dateToWork && employee.dateToWork.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
  }
)

