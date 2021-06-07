import {
    LOAD_UPDATING_CONSTRUCTION_TEAM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CONSTRUCTION_TEAM: {
            return {
                ...state,
                updatingConstructionTeam: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};