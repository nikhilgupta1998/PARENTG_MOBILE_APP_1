import { createSlice } from "../../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ActionType,
  Meta,
  PostComments,
  PostCommentsDetails,
  PostItem,
} from "../types/types";
import { set } from "lodash";
import { initialState } from "../types/initialState";

const userSlice = createSlice({
  name: "postState",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Array<PostItem>>) => {
      if (state.currentPage > 1) {
        state.posts = state.posts.concat(action.payload);
      } else {
        state.posts = action.payload;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCommentCurrentPage: (state, action: PayloadAction<number>) => {
      state.commentCurrentPage = action.payload;
    },
    setMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.moreLoading = action.payload;
    },
    setCommentMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.commentMoreLoading = action.payload;
    },
    setListMeta: (state, action: PayloadAction<Meta>) => {
      state.meta = action.payload;
    },
    setCommentMeta: (state, action: PayloadAction<Meta>) => {
      state.commentMeta = action.payload;
    },
    setPostComments: (state, action: PayloadAction<Array<PostComments>>) => {
      if (state.commentCurrentPage > 1) {
        state.postCommnets = state.postCommnets.concat(action.payload);
      } else {
        state.postCommnets = action.payload;
      }
    },
    setPostCommnets: (state) => {
      state.postCommnets = [];
    },
    setPostDetails: (state, action: PayloadAction<PostCommentsDetails>) => {
      state.postCommnetDetails = action.payload;
    },
    clearPostDetail: (state) => {
      (state.postCommnetDetails.createdAt = ""),
        (state.postCommnetDetails.description = ""),
        (state.postCommnetDetails.images = []),
        (state.postCommnetDetails.title = ""),
        (state.postCommnetDetails.updatedAt = ""),
        (state.postCommnetDetails.userId = ""),
        (state.postCommnetDetails._id = "");
    },
    setPostCreated: (state, action: PayloadAction<boolean>) => {
      state.postCreated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadingComment: (state, action: PayloadAction<boolean>) => {
      state.loadingComment = action.payload;
    },
    setLoadingPost: (state, action: PayloadAction<boolean>) => {
      state.loadingPost = action.payload;
    },
    setLoadingPostGet: (state, action: PayloadAction<boolean>) => {
      state.loadingPostGet = action.payload;
    },
    setLoadingLike: (state, action: PayloadAction<boolean>) => {
      state.loadingLike = action.payload;
    },

    setLikeUpdate: (
      state,
      action: PayloadAction<{ index: number; action: number; type: number }>
    ) => {
      state.posts[action.payload.index].postlikes = action.payload.action;
    },
    doGetPost: (state) => {},
    doSubmitPost: (state) => {},
    clearFrom: (state) => {
      state.postFrom.description = "";
      state.postFrom.id = "";
      state.postFrom.images = [];
      state.postFrom.title = "";
    },
    clearCommentFrom: (state) => {
      state.postCommnetsForm.comment = "";
      state.postCommnetsForm.postId = "";
    },
    changeFromValue(
      state,
      action: PayloadAction<{
        name: string;
        value: string | string[] | any[] | boolean | number | Date | null;
      }>
    ) {
      set(state, `postFrom.${action.payload.name}`, action.payload.value);
    },
    doAddImages: (
      state,
      action: PayloadAction<{ data: any; callback: any }>
    ) => {},
    setAddImages: (state, action: PayloadAction<any>) => {
      state.postFrom.images.push(action.payload);
    },
    DeleteList: (state, action: PayloadAction<number>) => {
      state.postFrom.images.splice(action.payload, 1);
    },
    doGetList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doPostAction: (
      state,
      action: PayloadAction<{ id:string, action:ActionType, callback: () => void }>
    ) => {},
    doGetCommentList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doAdd: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doGetComment: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    doPostLike: (
      state,
      action: PayloadAction<{
        id: string;
        like: number;
        index: number;
        callback: () => void;
      }>
    ) => {
      const likesCount = state.posts[action.payload.index].postlikes;
      state.posts[action.payload.index].like = action.payload.like == 1 ? 0 : 1;
      state.posts[action.payload.index].postlikes =
        state.posts[action.payload.index].like == 1
          ? likesCount + 1
          : likesCount - 1;
    },
    doPostComment: (
      state,
      action: PayloadAction<{
        id: string;
        like: number;
        index: number;
        callback: () => void;
      }>
    ) => {
      state.posts[action.payload.index].totalComments = action.payload.like;
    },
    doPostLikeManually: (
      state,
      action: PayloadAction<{
        id: string;
        like: number;
        index: number;
        callback: () => void;
      }>
    ) => {},
    doAddComments: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doUpdateCommentForm(
      state,
      action: PayloadAction<{
        name: string;
        value: string | string[] | any[] | boolean | number | Date | null;
      }>
    ) {
      set(
        state,
        `postCommnetsForm.${action.payload.name}`,
        action.payload.value
      );
    },
    doGetDetails: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
  },
});

export const { actions, reducer, name: postSliceKey } = userSlice;
