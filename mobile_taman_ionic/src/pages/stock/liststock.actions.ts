import { ActionType } from '../../util/types';
import { asyncRequests } from '../../data/dataApi';
import { ListStockState } from './liststock.state';

export const loadListStock = () => async (dispatch: React.Dispatch<any>) => {
  const stocks = await asyncRequests.get("/stock/listAll");
  dispatch(setListStockData({stocks:stocks}));
};

export const setListStockData = (stocks: Partial<ListStockState>) => ({
  type: 'set-list-stock-data',
  stocks
} as const);

export const setSearchNumber = (searchNumber ?: number) => ({ 
  type: 'set-search-number', 
  searchNumber 
} as const);

export type ListStockActions =
  ActionType<typeof setListStockData>   
| ActionType<typeof setSearchNumber>   
