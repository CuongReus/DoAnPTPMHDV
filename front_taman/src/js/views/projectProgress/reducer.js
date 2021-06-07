import {
    LOAD_UPDATING_COMPANY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_COMPANY: {
            return {
                ...state,
                updatingCompany: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};