import {
    LOAD_UPDATING_CONTACT_DETAIL
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CONTACT_DETAIL: {
            return {
                ...state,
                updatingContactDetail: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};