import {
    LOAD_UPDATING_QUOTATION
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_QUOTATION: {
            return {
                ...state,
                updatingQuotation: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};