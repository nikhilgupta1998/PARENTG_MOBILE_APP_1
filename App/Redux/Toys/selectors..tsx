import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../types";

const selectDomain = (state: RootState) => state?.toysState || initialState;

export const selectList = createSelector([selectDomain], (state) => state.Toys);

export const selectType = createSelector([selectDomain], (state) => state.type);
export const selectBookmark = createSelector(
  [selectDomain],
  (state) => state.bookmark
);
export const selectSearchText = createSelector(
  [selectDomain],
  (state) => state.searchText
);
export const selectPageNo = createSelector(
  [selectDomain],
  (state) => state.pageNo
);
export const selectCategory = createSelector(
  [selectDomain],
  (state) => state.category
);
export const selectRandomData = createSelector(
  [selectDomain],
  (state) => state.randomData
);


export const selectPageSize = createSelector(
  [selectDomain],
  (state) => state.pageSize
);
export const selectTotalRow = createSelector(
  [selectDomain],
  (state) => state.totalRow
);
export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
export const selectToyCategory = createSelector(
  [selectDomain],
  (state) => state.ToyCategory
);
export const selectSelectedToyCategory = createSelector(
  [selectDomain],
  (state) => state.selectToyCategory
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
export const selectAgeFilter = createSelector([selectDomain], (state) => state.ageFilter);
export const selectToyDetails = createSelector([selectDomain], (state) => state.toyDetails);

