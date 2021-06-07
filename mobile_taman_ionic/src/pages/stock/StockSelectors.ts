import { createSelector } from 'reselect';
import { AppState } from '../../data/state';

const getStocks = (state: AppState) => {
  return state.liststock.stocks
};

const getSearch = (state: AppState) => state.data.searchText;

export const getFilteredStocks = createSelector(
  getStocks, getSearch,
  (stocks, searchText) => {
    if (!searchText) {
      return stocks;
    }
    return stocks.filter(stock => (stock.product.name && stock.product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) || (stock.product.code && stock.product.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
  }
)
