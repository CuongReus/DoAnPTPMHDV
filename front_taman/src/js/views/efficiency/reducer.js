import {
    LOAD_UPDATING_EFFICIENCY,
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_EFFICIENCY: {
            return {
                ...state,
                updatingEfficiency: action.payload.error ? null : action.payload.resultData
            };
        }
        default:
            return state;
    }
    
};