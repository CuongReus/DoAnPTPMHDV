import { createSelector } from 'reselect';
import { AppState } from '../../data/state';
import { SecurityUtils } from '../../util/javascriptUtils';

const getUsers = (state: AppState) => {
  return state.listuser.users
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredUsers = createSelector(
  getUsers, getSearchText,
  (users, searchText) => {
    if (!searchText) {
      return users;
    }
    return users.filter(user => (user.fullName && user.fullName.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                              || (user.email && user.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                              || (user.phone && user.phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
  }
)

export const getAllowApprovalUsers = createSelector(
  getUsers, getSearchText,
  (users, searchText) => {
    return users.filter(item => {
      return SecurityUtils.hasPermission(item, "admin.holiday.approvalLetter")});
  }
)
