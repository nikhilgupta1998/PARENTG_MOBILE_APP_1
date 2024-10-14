import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../types";

const selectDomain = (state: RootState) =>
  state?.notificationState || initialState;

export const selectList = createSelector([selectDomain], (state) => state.list);
export const selectType = createSelector([selectDomain], (state) => state.type);
export const selectSearchText = createSelector(
  [selectDomain],
  (state) => state.searchText
);
export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
export const selectCurrentPage = createSelector(
  [selectDomain],
  (state) => state.currentPage
);
export const selectMoreLoading = createSelector(
  [selectDomain],
  (state) => state.moreLoading
);
export const selectMeta = createSelector([selectDomain], (state) => state.meta);
export const selectNewNotification = createSelector(
  [selectDomain],
  (state) => state.newNotification
);
