import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../types";

const selectDomain = (state: RootState) => state?.analyticsState || initialState;


export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
export const selectBreastFeeding = createSelector(
  [selectDomain],
  (state) => state.breastFeeding
);
export const selectBottleFeeding = createSelector(
  [selectDomain],
  (state) => state.bottleFeeding
);
export const selectGrowth = createSelector(
  [selectDomain],
  (state) => state.growth
);

export const selectSleep = createSelector(
  [selectDomain],
  (state) => state.sleep
);

export const selectGraphTableData = createSelector(
  [selectDomain],
  (state) => state.GraphTableData
);

export const selectGrowthHeightChart = createSelector(
  [selectDomain],
  (state) => state.growthHeightChart
);