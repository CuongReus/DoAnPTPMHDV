import {
    LOAD_UPDATING_LEAVE_DAY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_LEAVE_DAY: {
            return {
                ...state,
                updatingLeaveDay: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};