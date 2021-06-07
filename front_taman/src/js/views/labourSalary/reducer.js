import {
    LOAD_UPDATING_LABOUR_SALARY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_LABOUR_SALARY: {
            return {
                ...state,
                updatingLabourSalary: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};