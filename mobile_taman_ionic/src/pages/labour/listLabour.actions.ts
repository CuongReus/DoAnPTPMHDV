import { ActionType } from '../../util/types';
import { asyncRequests } from '../../data/dataApi';
import { ListLabourState } from './listLabour.state';

export const loadListLabour = () => async (dispatch: React.Dispatch<any>) => {
  const labours = await asyncRequests.get("/labour/listAll");
  dispatch(setListLabourData({ labours: labours }));
};

export const setListLabourData = (labours: Partial<ListLabourState>) => ({
  type: 'set-list-labour-data',
  labours
} as const);

export const loadListLabourAttendanceForSupervisor = (createdUserId :number , dateToWorkStart:any, dateToWorkEnd : any ) => async (dispatch: React.Dispatch<any>) => {
  const laboursForSupervisor = await asyncRequests.get("/labourAttendance/findByCreatedUserId?createdUserId=" + createdUserId + "&dateToWorkStart=" + dateToWorkStart + "&dateToWorkEnd=" + dateToWorkEnd);
  dispatch(setListLabourAttendanceForSupervisorData({ laboursForSupervisor: laboursForSupervisor }));
};

export const setListLabourAttendanceForSupervisorData = (laboursForSupervisor: Partial<ListLabourState>) => ({
  type: 'set-list-labour-for-supervisor-data',
  laboursForSupervisor
} as const);

export type ListLabourActions =
  ActionType<typeof setListLabourData> |
  ActionType<typeof setListLabourAttendanceForSupervisorData>



