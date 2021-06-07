import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessions/sessions.reducer';
import { userReducer } from './user/user.reducer';
import { listuserReducer } from '../pages/user/listuser.reducer';
import { listlabourReducer } from '../pages/labour/listLabour.reducer';
import { liststockReducer } from '../pages/stock/liststock.reducer';
import { listemployeeSalaryReducer } from '../pages/employeeSalary/listemployeeSalary.reducer';
import { listEmployeeAttendanceReducer } from '../pages/employeeAttendance/listEmployeeAttendance.reducer';


export const initialState: AppState = {
  data: {
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false
  },
  listuser: {
    users:[],
  },
  listlabour: {
    labours:[],
    laboursForSupervisor:[]
  },
  // listLeaveletter: {
  //   leaveletter:[],
  // },
  liststock: {
    stocks:[],
    searchNumber : 0,
  },
  listemployeeSalary: {
    employeeSalarys: [],
    searchText: '',
  },
  listEmployeeAttendance: {
    employees:[],
  },
};

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer,
  listuser: listuserReducer,
  listlabour: listlabourReducer,
  // listLeaveletter: listuserReducer,
  liststock: liststockReducer,
  listemployeeSalary: listemployeeSalaryReducer,
  listEmployeeAttendance: listEmployeeAttendanceReducer
});

export type AppState = ReturnType<typeof reducers>;
