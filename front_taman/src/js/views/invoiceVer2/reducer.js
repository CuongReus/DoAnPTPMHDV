import {
    LOAD_UPDATING_INVOICE_VER2
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INVOICE_VER2: {
            return {
                ...state,
                updatingInvoiceVer2: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};