import { RootState } from "../../../types";

import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../types/initialState";

const selectDomain = (state: RootState) => state?.postState || initialState;

export const selectList = createSelector(
  [selectDomain],
  (state) => state.posts
);
export const selectPostCreated = createSelector(
  [selectDomain],
  (state) => state.postCreated
);
export const selectPostForm = createSelector(
  [selectDomain],
  (state) => state.postFrom
);
export const selectPostCommnetsList = createSelector(
  [selectDomain],
  (state) => state.postCommnets
);
export const selectPostDetails = createSelector(
  [selectDomain],
  (state) => state.postCommnetDetails
);
export const selectPostCommnetsForm = createSelector(
  [selectDomain],
  (state) => state.postCommnetsForm
);
export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
export const selectLoadingLike = createSelector(
  [selectDomain],
  (state) => state.loadingLike
);
export const selectLoadingPostGet = createSelector(
  [selectDomain],
  (state) => state.loadingPostGet
);
export const selectLoadingPost = createSelector(
  [selectDomain],
  (state) => state.loadingPost
);
export const selectLoadingComment = createSelector(
  [selectDomain],
  (state) => state.loadingComment
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
export const selectCommentCurrentPage = createSelector(
  [selectDomain],
  (state) => state.commentCurrentPage
);
export const selectCommentMeta = createSelector([selectDomain], (state) => state.commentMeta);
export const selectCommentMoreLoading = createSelector([selectDomain], (state) => state.commentMoreLoading);