import {
    LOAD_UPDATING_EMPLOYEE_ATTENDANCE,
    // LOAD_LIST_EMPLOYEE_ATTENDANCE_TODAY,

} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_EMPLOYEE_ATTENDANCE: {
            return {
                ...state,
                updatingEmployeeAttendance: action.payload.error ? null : action.payload.resultData
            };
        };
        
        default:
            return state;
    }
    
};