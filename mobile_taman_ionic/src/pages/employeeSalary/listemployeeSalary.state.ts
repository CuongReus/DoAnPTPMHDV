import { EmployeeSalary } from "./EmployeeSalary";

type searchText = '';

export interface ListEmployeeSalaryState {
  employeeSalarys: EmployeeSalary[];
  searchText? : string ;
};
