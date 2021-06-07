import {
    LOAD_UPDATING_INVOICE_VER1
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INVOICE_VER1: {
            return {
                ...state,
                updatingInvoiceVer1: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};