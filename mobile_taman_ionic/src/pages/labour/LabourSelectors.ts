import { createSelector } from "reselect";
import { AppState } from "../../data/state";
// import { SecurityUtils } from "../../util/javascriptUtils";

export const getLabours = (state: AppState) => {
  return state.listlabour.labours;
};
const getLaboursForSupervisor = (state: AppState) => {
  return state.listlabour.laboursForSupervisor;
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredLabours = createSelector(
  getLabours,
  getSearchText,
  (labours, searchText) => {
    if (!searchText) {
      return labours;
    }
    return labours.filter(
      (labour) =>
        (labour.fullName &&
          labour.fullName.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1) ||
        (labour.phone &&
          labour.phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    );
  }
);
export const getFilteredLaboursForSupervisor = createSelector(
  getLaboursForSupervisor,
  getSearchText,
  (laboursForSupervisor, searchText) => {
    if (!searchText) {
      return laboursForSupervisor;
    }
    return laboursForSupervisor.filter(
      (laboursForSupervisor) =>
        (laboursForSupervisor.labour.fullName &&
          laboursForSupervisor.labour.fullName.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1) ||
        (laboursForSupervisor.labour.phone &&
          laboursForSupervisor.labour.phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    );
  }
);

