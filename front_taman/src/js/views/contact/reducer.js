import {
    LOAD_UPDATING_CONTACT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CONTACT: {
            return {
                ...state,
                updatingContact: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};