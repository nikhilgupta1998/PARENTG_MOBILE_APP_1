import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../types";

const selectDomain = (state: RootState) => state?.faqState || initialState;

export const selectFaq = createSelector([selectDomain], (state) => state.posts);
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

export const selecList = createSelector(
  [selectDomain],
  (state) => state.tutorialList
);