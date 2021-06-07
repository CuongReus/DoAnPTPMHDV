import { ListEmployeeSalaryState } from "./listemployeeSalary.state";
import { ListEmployeeSalaryActions } from "./listemployeeSalary.actions";


export const listemployeeSalaryReducer = (state: ListEmployeeSalaryState, action: ListEmployeeSalaryActions): ListEmployeeSalaryState => {
  switch (action.type) {
    case 'set-list-employeeSalary-data': {
      return { ...state, ...action.employeeSalarys };
    }
    case 'set-search-number': {
      return { ...state, searchText : action.searchText };
    }
  }
}
