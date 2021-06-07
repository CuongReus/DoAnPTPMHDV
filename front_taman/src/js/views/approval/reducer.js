import {
    LOAD_UPDATING_APPROVAL
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_APPROVAL: {
            return {
                ...state,
                updatingApproval: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};