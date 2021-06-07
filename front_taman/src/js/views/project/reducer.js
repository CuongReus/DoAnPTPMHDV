import {
    LOAD_UPDATING_PROJECT,LOAD_PROJECT_YEAR_DTO
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PROJECT: {
            return {
                ...state,
                updatingProject: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_PROJECT_YEAR_DTO: {
            return {
                ...state,
                projectYearDto: action.projectYearDto
            };
        };
        default:
            return state;
    }
    
};