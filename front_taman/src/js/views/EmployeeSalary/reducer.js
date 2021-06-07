import {
    LOAD_UPDATING_EMPLOYEE_SALARY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_EMPLOYEE_SALARY: {
            return {
                ...state,
                updatingEmployeeSalary: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};