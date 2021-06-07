import {
    LOAD_UPDATING_LABOUR,LOAD_UPDATING_LABOUR_DTO
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_LABOUR: {
            return {
                ...state,
                updatingLabour: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_UPDATING_LABOUR_DTO: {
            return {
                ...state,
                labourDto: action.labourDto
            };
        };
        default:
            return state;
    }
    
};