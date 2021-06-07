import {
    LOAD_UPDATING_PROJECT_YEAR,
    LOAD_COMPANY_DTO
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PROJECT_YEAR: {
            return {
                ...state,
                updatingProjectYear: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_COMPANY_DTO: {
            return {
                ...state,
                companyDto: action.companyDto
            };
        };
        default:
            return state;
    }
    
};