import {
    LOAD_UPDATING_CLOSE_PROJECT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CLOSE_PROJECT: {
            return {
                ...state,
                updatingCloseProject: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};