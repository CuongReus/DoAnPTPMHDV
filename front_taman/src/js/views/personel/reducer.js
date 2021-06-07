import {
    LOAD_UPDATING_PERSONEL, LOAD_UPDATING_ROLE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PERSONEL: {
            return {
                ...state,
                updatingPersonel: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_UPDATING_ROLE: {
            return {
                ...state,
                updatingRole: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};