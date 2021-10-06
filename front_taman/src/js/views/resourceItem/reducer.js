import {
    LOAD_UPDATING_RESOURCE_ITEM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_RESOURCE_ITEM: {
            return {
                ...state,
                updatingResourceItem: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};