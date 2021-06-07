import {
    LOAD_UPDATING_ACCEPTANCE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_ACCEPTANCE: {
            return {
                ...state,
                updatingAcceptance: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};