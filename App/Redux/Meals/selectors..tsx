import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../types";

const selectDomain = (state: RootState) => state?.mealsState || initialState;

export const selectBmiCalculateForm = createSelector(
  [selectDomain],
  (state) => state.bmiCalculateForm
);

export const selectList = createSelector(
  [selectDomain],
  (state) => state.MealsList
);
export const selectFunFoodMealsList = createSelector(
  [selectDomain],
  (state) => state.FunFoodMealsList
);
export const selectMealsDetails = createSelector(
  [selectDomain],
  (state) => state.MealsDetails
);

export const selectSearchText = createSelector(
  [selectDomain],
  (state) => state.searchText
);
export const selectCategory = createSelector(
  [selectDomain],
  (state) => state.category
);
export const selectTotalRow = createSelector(
  [selectDomain],
  (state) => state.totalRow
);
export const selectPageSize = createSelector(
  [selectDomain],
  (state) => state.pageSize
);
export const selectPageNo = createSelector(
  [selectDomain],
  (state) => state.pageNo
);

export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
export const selectfilterFood = createSelector(
  [selectDomain],
  (state) => state.filterFood
);
export const selectFilterFoodType = createSelector(
  [selectDomain],
  (state) => state.filterFoodType
);
export const selectCategoryList = createSelector(
  [selectDomain],
  (state) => state.categoryList
);
export const selecIngrident = createSelector(
  [selectDomain],
  (state) => state.ingrident
);
export const selectIngridentList = createSelector(
  [selectDomain],
  (state) => state.ingridentList
);
export const selectMessage = createSelector(
  [selectDomain],
  (state) => state.chat
);
export const selectChatList = createSelector(
  [selectDomain],
  (state) => state.chatList
);
export const selectFilterCatgory = createSelector(
  [selectDomain],
  (state) => state.filterCatgory
);
export const selectfilterCategoryform = createSelector(
  [selectDomain],
  (state) => state.filterCategoryform
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
export const selectMealsFunFoodDetails = createSelector(
  [selectDomain],
  (state) => state.MealsFunFoodDetails
);
export const selectAllMealsPageNo = createSelector(
  [selectDomain],
  (state) => state.allMealsPageNo
);
export const selectAllMealsPageSize = createSelector(
  [selectDomain],
  (state) => state.allMealsPageSize
);
export const selectChatLoader = createSelector(
  [selectDomain],
  (state) => state.chatLoader
);
export const selectAllMealsTotalRow = createSelector(
  [selectDomain],
  (state) => state.allMealsTotalRow
);
export const selectAllMealsMeta = createSelector(
  [selectDomain],
  (state) => state.allMealsMeta
);
export const selectAllMealsCurrentPage = createSelector(
  [selectDomain],
  (state) => state.allMealsCurrentPage
);
export const selectAllMealsMoreLoading = createSelector(
  [selectDomain],
  (state) => state.allMealsMoreLoading
);
export const selectAllMealList = createSelector(
  [selectDomain],
  (state) => state.allMealList
);
export const selectRandomData = createSelector(
  [selectDomain],
  (state) => state.randomFunFoodData
);

export const selectPremiumMealLoader = createSelector(
  [selectDomain],
  (state) => state.premiumMealLoader
);
export const selectChatListLoader = createSelector(
  [selectDomain],
  (state) => state.chatListLoader
);
export const selectMealDetailLoader = createSelector(
  [selectDomain],
  (state) => state.mealDetailLoader
);

export const selectFuFoodMealLoader = createSelector(
  [selectDomain],
  (state) => state.fuFoodMealLoader
);
export const selectMealLoader = createSelector(
  [selectDomain],
  (state) => state.mealLoader
);
export const selectBmiLoader = createSelector(
  [selectDomain],
  (state) => state.bmiLoader
);
