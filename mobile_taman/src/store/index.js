
import { applyMiddleware, createStore } from "redux";
import {promiseMiddleware} from '../services/middleware';
import rootReducer from "../reducers/index";


// export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
// const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
        return applyMiddleware(promiseMiddleware);
    
};

export const store = createStore(
  rootReducer,getMiddleware()
);



