import { ListStockState } from "./liststock.state";
import { ListStockActions } from "./liststock.actions";


export const liststockReducer = (state: ListStockState, action: ListStockActions): ListStockState => {
  switch (action.type) {
    case 'set-list-stock-data': {
      return { ...state, ...action.stocks };
    }
    case 'set-search-number': {
      return { ...state, searchNumber : action.searchNumber };
    }
  }
}
