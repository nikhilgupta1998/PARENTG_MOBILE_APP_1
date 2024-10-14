import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../../types";

const selectDomain = (state: RootState) => state?.homeActivityState || initialState;

export const selectList = createSelector(
  [selectDomain],
  (state) => state.list
);
export const selectActivityList = createSelector(
  [selectDomain],
  (state) => state.ActivityList
);
export const selectActivityDetails = createSelector(
  [selectDomain],
  (state) => state.details
);
export const selectType = createSelector([selectDomain], (state) => state.type);
export const selectBookmark = createSelector(
  [selectDomain],
  (state) => state.bookmark
);
export const selectQuestionList= createSelector(
  [selectDomain],
  (state) => state.questionList
);
export const selectSearchText = createSelector(
  [selectDomain],
  (state) => state.searchText
);
export const selectCategory = createSelector(
  [selectDomain],
  (state) => state.category
);
export const selectPostCreated = createSelector(
  [selectDomain],
  (state) => state.postCreated
);

export const selectCategoryList = createSelector(
  [selectDomain],
  (state) => state.categoryList
);
export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
export const selectToyList = createSelector(
  [selectDomain],
  (state) => state.toyList
);
export const selectMealList= createSelector(
  [selectDomain],
  (state) => state.MealList
);
export const selectDate= createSelector(
  [selectDomain],
  (state) => state.date
);
export const selectMaterialDate= createSelector(
  [selectDomain],
  (state) => state.MaterialDate
);
export const selectActivityDate= createSelector(
  [selectDomain],
  (state) => state.ActivityDate
);const selectCompleteQuestionList = createSelector(
  [selectDomain],
  (state) => state.doCompleteQuestionList
);