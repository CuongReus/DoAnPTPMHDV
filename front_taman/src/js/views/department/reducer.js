import {
    LOAD_UPDATING_DEPARTMENT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DEPARTMENT: {
            return {
                ...state,
                updatingDepartment: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};