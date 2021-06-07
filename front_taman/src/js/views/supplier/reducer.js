import {
    LOAD_UPDATING_SUPPLIER
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_SUPPLIER: {
            return {
                ...state,
                updatingSupplier: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};