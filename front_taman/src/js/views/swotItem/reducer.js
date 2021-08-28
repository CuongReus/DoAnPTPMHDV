import {
    LOAD_UPDATING_SWOT_ITEM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_SWOT_ITEM: {
            return {
                ...state,
                updatingSwotItem: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};