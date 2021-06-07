import { ListUserState} from './listuser.state';
import { ListUserActions } from './listuser.actions';

export const listuserReducer = (state: ListUserState, action: ListUserActions): ListUserState => {
  switch (action.type) {
    case 'set-list-user-data': {
      return { ...state, ...action.users };
    }
  }
}
