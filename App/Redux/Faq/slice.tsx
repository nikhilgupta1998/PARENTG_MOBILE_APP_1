import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { FaqItem, Meta } from "./types";
import { set } from "lodash";

const userSlice = createSlice({
  name: "faqState",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Array<FaqItem>>) => {
      state.posts = action.payload;
    },
    setPostCreated: (state, action: PayloadAction<boolean>) => {
      state.postCreated = action.payload;
    },
    setPostLike: (
      state,
      action: PayloadAction<{ id: string; callback: (type: boolean) => void }>
    ) => {},

    doGetPost: (state) => {},
    doSubmitPost: (state) => {},
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
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.moreLoading = action.payload;
    },
    setListMeta: (state, action: PayloadAction<Meta>) => {
      state.meta = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    doGetTutorialList: (state) => {},
    setList: (
      state,
      action: PayloadAction<any>
    ) => {
      if (state.currentPage > 1) {
        state.tutorialList = state.tutorialList.concat(action.payload);
      } else {
        state.tutorialList = action.payload;
      }
    },
  },
});
export const { actions, reducer, name: sliceKey } = userSlice;
