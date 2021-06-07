import { ListLabourState} from './listLabour.state';
import { ListLabourActions } from './listLabour.actions';

export const listlabourReducer = (state: ListLabourState, action: ListLabourActions): ListLabourState => {
  switch (action.type) {
    case 'set-list-labour-data': {
      return { ...state, ...action.labours };
    }
    case 'set-list-labour-for-supervisor-data': {
      return { ...state, ...action.laboursForSupervisor };
    }
  }
}
