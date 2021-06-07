import {
    LOAD_UPDATING_INVOICE_VAT_OUTPUT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INVOICE_VAT_OUTPUT: {
            return {
                ...state,
                updatingInvoiceVATOutput: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};