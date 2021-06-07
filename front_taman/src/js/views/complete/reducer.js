import {
    LOAD_UPDATING_COMPLETE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_COMPLETE: {
            return {
                ...state,
                updatingComplete: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};