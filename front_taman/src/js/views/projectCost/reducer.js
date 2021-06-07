import {
    LOAD_UPDATING_PROJECT_COST,
    LOAD_PROJECT_COST_DTO
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PROJECT_COST: {
            return {
                ...state,
                updatingProjectCost: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_PROJECT_COST_DTO: {
            return {
                ...state,
                projectCostDto: action.projectCostDto
            };
        };
        
        default:
            return state;
    }
    
};