import agent from './agent';
import {
    ASYNC_START,
    ASYNC_END,
    LOGIN,
    LOGOUT,
    FIRE_REDIRECT,
    APP_LOAD
} from '../constants/action-types';

// All async API calls must be name "payload"
const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({type: ASYNC_START, subtype: action.type});

        const currentView = store.getState().viewChangeCounter;
        const skipTracking = action.skipTracking;

        action.payload.then(
            res => {
                const currentState = store.getState();
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return;
                }
                // console.log('Rest result: ', res);
                action.payload = res;
                if (action.isCached) {
                    CacheService.setItem(action.type, action.payload);
                }
                store.dispatch({type: ASYNC_END, promise: action.payload});
                store.dispatch(action);

            },
            error => {
                const currentState = store.getState();
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return;
                }
                console.log('Rest Error: ' + error);
                action.error = true;
                action.payload = error.response ? error.response.body : {error: "ASYNC_REST_FAILED"};
                if (!action.skipTracking) {
                    store.dispatch({type: ASYNC_END, promise: action.payload});
                }
                store.dispatch(action);
            }
        );

        return;
    }

    next(action);
};

const localStorageMiddleware = store => next => action => {
    if (action.type === LOGIN) {
        if (!action.error) { // TODO: check where the token in service backend
            if (action.rememberMe === true) {
                window.localStorage.setItem('remember_jwt', action.payload.refresh_token);
            } else {
                window.localStorage.removeItem('remember_jwt');
            }

            window.sessionStorage.setItem('jwt', action.payload.access_token);
            window.sessionStorage.setItem('jwtExpiredTime', (new Date()).getTime() + 36000000); // 10 hours

            var token = action.payload.access_token;
            agent.setToken(token);
            // Load current user
            store.dispatch({ type: APP_LOAD, payload: agent.AuthService.current(), token: token, skipTracking: true });
        }
    } else if (action.type === LOGOUT) {
        window.localStorage.clear();
        window.sessionStorage.clear();
        agent.setToken(null);
    }
    
    next(action);
};

function isPromise(v) {
    return v && typeof v.then == 'function';
}

// Note: sessionStorage only available on 1 tab.
const CacheService = {
    setItem: (key, value) => {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        var value = window.sessionStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return null;
        }
    },
    hasItem: (key) => {
       if (window.sessionStorage.getItem(key)) {
           return true;
       } else {
           return false;
       }
    },
    removeItem: (key) => {
        window.sessionStorage.removeItem(key);
    },
    clearAll: () => {
        window.sessionStorage.clear();
    }
}

// Use this with care because the cache will be stored infinity (removed in window.addEventListener("beforeunload").
// This cache can be used in multi tabs
const PermanentCacheService = {
    setItem: (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        var value = window.localStorage.getItem(key) ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return null;
        }
    },
    hasItem: (key) => {
        if ((window.localStorage.getItem(key) && window.localStorage.getItem(key) != "null") ||
            (window.sessionStorage.getItem(key) && window.sessionStorage.getItem(key) != "null")) {
            return true;
        } else {
            return false;
        }
    },
    removeItem: (key) => {
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
    },
    clearAll: () => {
        window.localStorage.clear();
        window.sessionStorage.clear();
    }
}
export {promiseMiddleware, localStorageMiddleware, CacheService, PermanentCacheService}