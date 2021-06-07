import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import leaveLetterReducer from '../screens/leaveLetter/reducer';
import auth from "./auth";
import commonReducer from "./common";
const combinedReducer = combineReducers({
    form: formReducer,
    // router: routerReducer,
    auth,
    common: commonReducer,
    leaveLetterReducer: leaveLetterReducer,
    
});



export default combinedReducer;
