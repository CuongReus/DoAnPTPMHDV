import {
    LOAD_UPDATING_LABOUR_ATTENDANCE,
    LOAD_LIST_LABOUR_ATTENDANCE_TODAY,
    LOAD_LIST_EFFICIENCY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_LABOUR_ATTENDANCE: {
            return {
                ...state,
                updatingLabourAttendance: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_LIST_LABOUR_ATTENDANCE_TODAY: {
            return {
                ...state,
                listAttendanceToday: action.listAttendanceToday
            };
        };
        case LOAD_LIST_EFFICIENCY: {
            return {
                ...state,
                listEfficiency: action.listEfficiency
            };
        };
        default:
            return state;
    }
    
};