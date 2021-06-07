import { applyMiddleware, createStore } from "redux";
import { createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {promiseMiddleware, localStorageMiddleware} from '../services/middleware';
import rootReducer from "../reducers/index";

import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV == 'production') {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
    } else {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger());
    }
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(getMiddleware())
);

