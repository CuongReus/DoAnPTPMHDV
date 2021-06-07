import { combineReducers } from "redux";
import reduceReducers from 'reduce-reducers';
import { reducer as formReducer } from 'redux-form';
import auth from "./auth";
import commonReducer from "./common";
import personelReducer from '../views/personel/reducer';
import leaveLetterReducer from '../views/leaveLetter/reducer';
import storageLocationReducer from '../views/storageLocation/reducer'
import projectDetailReducer from '../views/projectDetail/reducer'
import projectReducer from '../views/project/reducer'
import projectYearReducer from '../views/projectYear/reducer'
import companyReducer from '../views/projectProgress/reducer'
import constructionTeamReducer from '../views/constructionTeam/reducer'
import supplierReducer from '../views/supplier/reducer'
import { routerReducer } from 'react-router-redux';
import { LOGOUT } from '../constants/action-types';
import quotationReducer from '../views/quotation/reducer'
import approvalReducer from '../views/approval/reducer'

import acceptanceReducer from '../views/acceptance/reducer'
import contractReducer from '../views/contract/reducer'
import invoiceVer1Reducer from '../views/invoiceVer1/reducer'
import invoiceVer2Reducer from '../views/invoiceVer2/reducer'
import invoiceVer3Reducer from '../views/invoiceVer3/reducer'
import closeProjectReducer from '../views/closeProject/reducer'
import incurredReducer from '../views/incurred/reducer'
import efficiencyReducer from '../views/efficiency/reducer'
import completeReducer from '../views/complete/reducer'
import labourReducer from '../views/labour/reducer'
import labourSalaryReducer from '../views/labourSalary/reducer'
import labourAttendanceReducer from '../views/labourAttendance/reducer'
import paymentSalaryReducer from '../views/paymentSalary/reducer'
import employeeSalaryReducer from '../views/EmployeeSalary/reducer'
import employeeAttendanceReducer from '../views/EmployeeAttendance/reducer'
import projectCostReducer from '../views/projectCost/reducer'
import projectBudgetReducer from '../views/projectBudget/reducer'
import paymentReducer from '../views/payment/reducer'
import departmentReducer from '../views/department/reducer'
import contactReducer from '../views/contact/reducer'
import contactDetailReducer from '../views/contactDetail/reducer'
import projectCostReportReducer from '../views/projectCostReport/reducer'
import invoiceVATInputReducer from '../views/invoiceVATInput/reducer'
import invoiceVATOutputReducer from '../views/invoiceVATOutput/reducer'

const combinedReducer = combineReducers({
    form: formReducer,
    auth,
    common: commonReducer,
    personelReducer: personelReducer,
    router: routerReducer,
    leaveLetterReducer: leaveLetterReducer,
    storageLocationReducer: storageLocationReducer,
    projectDetailReducer: projectDetailReducer,
    projectReducer: projectReducer,
    projectYearReducer: projectYearReducer,
    companyReducer: companyReducer,
    constructionTeamReducer: constructionTeamReducer,
    supplierReducer: supplierReducer,
    quotationReducer: quotationReducer,
    approvalReducer: approvalReducer,
    acceptanceReducer: acceptanceReducer,
    contractReducer: contractReducer,
    invoiceVer1Reducer: invoiceVer1Reducer,
    invoiceVer2Reducer: invoiceVer2Reducer,
    invoiceVer3Reducer: invoiceVer3Reducer,
    closeProjectReducer: closeProjectReducer,
    incurredReducer: incurredReducer,
    efficiencyReducer: efficiencyReducer,
    completeReducer: completeReducer,
    labourReducer: labourReducer,
    labourSalaryReducer: labourSalaryReducer,
    labourAttendanceReducer: labourAttendanceReducer,
    paymentSalaryReducer: paymentSalaryReducer,
    employeeSalaryReducer: employeeSalaryReducer,
    employeeAttendanceReducer: employeeAttendanceReducer,
    projectCostReducer: projectCostReducer,
    projectBudgetReducer: projectBudgetReducer,
    paymentReducer: paymentReducer,
    departmentReducer :departmentReducer,
    contactReducer: contactReducer,
    contactDetailReducer: contactDetailReducer,
    projectCostReportReducer: projectCostReportReducer,
    invoiceVATInputReducer: invoiceVATInputReducer,
    invoiceVATOutputReducer: invoiceVATOutputReducer,
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
