import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../types";

const selectDomain = (state: RootState) =>
  state?.milestoneGraphState || initialState;

export const selectMilestoneCategoryGraph = createSelector(
  [selectDomain],
  (state) => state.milestoneCategoryGraph
);
export const selectMilestoneActivityGraph = createSelector(
  [selectDomain],
  (state) => state.milestoneActivityGraph
);

export const selectSearchText = createSelector(
  [selectDomain],
  (state) => state.searchText
);

export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
