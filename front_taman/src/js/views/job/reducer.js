import {
    LOAD_UPDATING_JOB
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_JOB: {
            return {
                ...state,
                updatingJob: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};