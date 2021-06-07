import { ListEmployeeState} from './listEmployeeAttendance.state';
import { ListEmployeeActions } from './listEmployeeAttendance.actions';

export const listEmployeeAttendanceReducer = (state: ListEmployeeState, action: ListEmployeeActions): ListEmployeeState => {
  switch (action.type) {
    case 'set-list-employee-attendance-data': {
      return { ...state, ...action.employees };
    }
  }
}
