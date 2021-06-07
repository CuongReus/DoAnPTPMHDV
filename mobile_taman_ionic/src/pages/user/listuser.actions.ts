import { ActionType } from '../../util/types';
import { asyncRequests } from '../../data/dataApi';
import { ListUserState } from './listuser.state';
// import { setCurrentUserSate } from '../../redux/actions';

export const loadListUser = () => async (dispatch: React.Dispatch<any>) => {
  const users = await asyncRequests.get("/user/listAllActive");
  dispatch(setListUserData({ users: users }));
};

export const setListUserData = (users: Partial<ListUserState>) => ({
  type: 'set-list-user-data',
  users
} as const);

export type ListUserActions =
  ActionType<typeof setListUserData>


