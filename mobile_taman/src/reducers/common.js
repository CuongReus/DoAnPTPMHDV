import {
    APP_LOAD,
    REDIRECT,
    FIRE_REDIRECT,
    LOGIN,
    LOGOUT
} from '../constants/action-types';

const defaultState = {
    appName: 'loghis',
    token: null,
    currentUser: null,
    viewChangeCounter: 0
};

const commonReducer = (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload : null
            };
        case REDIRECT:
            return {...state, redirectTo: null};
        case FIRE_REDIRECT:
            return {...state, redirectTo: action.toUrl};
        case LOGIN:
            return {
                ...state,
                redirectTo: (!action.payload.error && action.isRequiredRedirect) ? '/' : null,
                token: action.payload.error ? null : action.payload.access_token
            };
        case LOGOUT:
            return {...state, redirectTo: '/login', token: null, currentUser: null};
        default:
            return state;
    }
};

export default commonReducer;