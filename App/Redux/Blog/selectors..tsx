import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { RootState } from "../../types";

const selectDomain = (state: RootState) => state?.blogState || initialState;

export const selectList = createSelector(
  [selectDomain],
  (state) => state.blogs
);
export const selectBlogDetails = createSelector(
  [selectDomain],
  (state) => state.blogsDetails
);
export const selectType = createSelector([selectDomain], (state) => state.type);
export const selectBookmark = createSelector(
  [selectDomain],
  (state) => state.bookmark
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
export const selectPostCommnets = createSelector(
  [selectDomain],
  (state) => state.postCommnets
);
export const selectCategoryList = createSelector(
  [selectDomain],
  (state) => state.categoryList
);
export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
export const selectMoreLoading = createSelector(
  [selectDomain],
  (state) => state.moreLoading
);
export const selectMeta = createSelector([selectDomain], (state) => state.meta);
export const selectCurrentPage = createSelector(
  [selectDomain],
  (state) => state.currentPage
);
export const selectRandomData = createSelector(
  [selectDomain],
  (state) => state.randomData
);
