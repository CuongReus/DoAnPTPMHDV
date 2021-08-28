import {
    LOAD_UPDATING_SWOT_USER
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_SWOT_USER: {
            return {
                ...state,
                updatingSwotUser: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};