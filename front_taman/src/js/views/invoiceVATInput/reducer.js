import {
    LOAD_UPDATING_INVOICE_VAT_INPUT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INVOICE_VAT_INPUT: {
            return {
                ...state,
                updatingInvoiceVATInput: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};