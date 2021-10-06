import {
    LOAD_UPDATING_CALENDER_TYPE,
    LOAD_UPDATING_CALENDER_BOOKING

} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CALENDER_TYPE: {
            return {
                ...state,
                updatingCalendarType: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_UPDATING_CALENDER_BOOKING: {
            return {
                ...state,
                updatingCalenderBooking: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};