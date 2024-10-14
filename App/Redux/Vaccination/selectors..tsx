import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../types";

const selectDomain = (state: RootState) =>
  state?.vaccinationState || initialState;

export const selectList = createSelector(
  [selectDomain],
  (state) => state.list
);
export const selectStatusCount = createSelector(
  [selectDomain],
  (state) => state.statusCount
);
export const selectVaccinationForm = createSelector(
  [selectDomain],
  (state) => state.addVaccination
);

export const selectType = createSelector([selectDomain], (state) => state.type);
export const selectMonth = createSelector([selectDomain], (state) => state.months);

export const selectSearchText = createSelector(
  [selectDomain],
  (state) => state.searchText
);

export const selectPostCreated = createSelector(
  [selectDomain],
  (state) => state.postCreated
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