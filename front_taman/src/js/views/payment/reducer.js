import {
    LOAD_UPDATING_PAYMENT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PAYMENT: {
            return {
                ...state,
                updatingPayment: action.payload.error ? null : action.payload.resultData
            };
        };
        
        default:
            return state;
    }
    
};