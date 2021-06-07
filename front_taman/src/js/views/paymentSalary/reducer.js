import {
    LOAD_UPDATING_PAYMENT_SALARY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PAYMENT_SALARY: {
            return {
                ...state,
                updatingPaymentSalary: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};