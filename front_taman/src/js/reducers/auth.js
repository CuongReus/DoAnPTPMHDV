import {
    LOGIN
} from '../constants/action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                inProgress: false,
                errors: action.payload.error ? action.payload.error_description : null
            };
        default:
            return state;
    }
};