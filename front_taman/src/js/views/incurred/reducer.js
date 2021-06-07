import {
    LOAD_UPDATING_INCURRED
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INCURRED: {
            return {
                ...state,
                updatingIncurred: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};