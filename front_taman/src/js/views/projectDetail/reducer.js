import {
    LOAD_UPDATING_PROJECT_DETAIL,LOAD_PROJECT_DETAIL_DTO,LOAD_PROJECT_DTO
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PROJECT_DETAIL: {
            return {
                ...state,
                updatingProjectDetail: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_PROJECT_DETAIL_DTO: {
            return {
                ...state,
                projectDetailDto: action.projectDetailDto
            };
        };
        case LOAD_PROJECT_DTO: {
            return {
                ...state,
                projectDto: action.projectDto
            };
        };
        default:
            return state;
    }
    
};