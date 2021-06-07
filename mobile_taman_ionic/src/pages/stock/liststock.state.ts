import { Stock } from "./Stock";

type searchNumber = 0;

export interface ListStockState {
  stocks: Stock[];
  searchNumber? : number ;
};
