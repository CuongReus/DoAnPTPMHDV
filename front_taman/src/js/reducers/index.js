import { combineReducers } from "redux";
import reduceReducers from 'reduce-reducers';
import { reducer as formReducer } from 'redux-form';
import auth from "./auth";
import commonReducer from "./common";
import personelReducer from '../views/personel/reducer';
import leaveLetterReducer from '../views/leaveLetter/reducer';
import constructionTeamReducer from '../views/constructionTeam/reducer'
import { routerReducer } from 'react-router-redux';
import { LOGOUT } from '../constants/action-types';


import labourReducer from '../views/labour/reducer'
import labourAttendanceReducer from '../views/labourAttendance/reducer'
import employeeAttendanceReducer from '../views/EmployeeAttendance/reducer'
import departmentReducer from '../views/department/reducer'
import swotItemReducer from '../views/swotItem/reducer'
import swotUserReducer from '../views/swotUser/reducer'
import swotJobReducer from '../views/swotJob/reducer'
import contactReducer from '../views/contact/reducer'
import contactDetailReducer from '../views/contactDetail/reducer'
import jobReducer from '../views/job/reducer'

const combinedReducer = combineReducers({
    form: formReducer,
    auth,
    common: commonReducer,
    personelReducer: personelReducer,
    router: routerReducer,
    leaveLetterReducer: leaveLetterReducer,
    constructionTeamReducer: constructionTeamReducer,
    labourReducer: labourReducer,
    labourAttendanceReducer: labourAttendanceReducer,
    employeeAttendanceReducer: employeeAttendanceReducer,
    departmentReducer :departmentReducer,
    swotItemReducer :swotItemReducer,
    swotUserReducer :swotUserReducer,
    swotJobReducer :swotJobReducer,
    jobReducer :jobReducer,
    contactReducer: contactReducer,
    contactDetailReducer: contactDetailReducer,
});

const crossSliceReducer = (state, action) => {
    switch (action.type) {
        case LOGOUT:
            // Modify state if needed. The LOGOUT is handled in each reducer now.
            return state;
        default: return state;
    }
};

const rootReducer = reduceReducers(combinedReducer, crossSliceReducer);

export default rootReducer;
