import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Meta, PostComments, PostItem } from "./types";
import { initialState } from "./types/initialState";
import { set } from "lodash";

const userSlice = createSlice({
  name: "blogState",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setType: (state, action: PayloadAction<number>) => {
      state.type = action.payload;
    },
    setbookmark: (state, action: PayloadAction<number>) => {
      state.bookmark = action.payload;
    },
    setList: (state, action: PayloadAction<Array<PostItem>>) => {

      if (state.currentPage > 1) {
        state.blogs = state.blogs.concat(action.payload);
      } else {
        state.blogs = action.payload;
      }
    },
    setListMeta: (state, action: PayloadAction<Meta>) => {
      state.meta = action.payload;
    },
    setBlogDetails: (state, action: PayloadAction<PostItem>) => {
      state.blogsDetails = action.payload;
    },
    setPostComments: (state, action: PayloadAction<Array<PostComments>>) => {
      state.postCommnets = action.payload;
    },
    setPostCreated: (state, action: PayloadAction<boolean>) => {
      state.postCreated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.moreLoading = action.payload;
    },
    setDoBookmark: (state, action: PayloadAction<{index:number , bookmark : number}>) => {      
      state.blogs[action.payload.index].bookmark = action.payload.bookmark;
    },
    setDoBookmarkRandom: (state, action: PayloadAction<{index:number , bookmark : number}>) => {
      if (state.randomData.filter((x) => x.id == state.category).length > 0) {
        const indexItem = state.randomData.findIndex(
          (x) => x.id == state.category
        );
        const items = state.randomData;
        items[indexItem].item[action.payload.index].bookmark= action.payload.bookmark;
        state.randomData = items;
      }
    },
    doAddBookmark: (
      state,
      action: PayloadAction<{
        id: string;
        bookmark: number;
        callback: (type: boolean) => void;
      }>
    ) => {},
    doLikeBlog: (
      state,
      action: PayloadAction<{
        id: string;
        like: number;
        callback: (type: boolean) => void;
      }>
    ) => {},
    setBookmarkUpdate: (
      state,
      action: PayloadAction<{ index: number; action: number; type: number }>
    ) => {
      if (action.payload.type == 1) {
        state.blogs[action.payload.index].bookmark = action.payload.action;
      } else {
        state.blogs[action.payload.index].bookmark = action.payload.action;
      }
    },
    doGetPost: (state) => {},

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
    setCategoryList: (state, action: PayloadAction<any>) => {
      state.categoryList = action.payload;
    },
    doGetCategoryList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    setRandomData: (state,action: PayloadAction<Array<PostItem>>) => {
       if (state.randomData.filter((x) => x.id == state.category).length > 0) {
        const indexItem = state.randomData.findIndex(
          (x) => x.id == state.category
        );
        const items = state.randomData;
        items[indexItem].item = action.payload;
        state.randomData = items;
      } else {
        const items = state.randomData;
        items.push({
          id: state.category,
          item: action.payload,
        });
        state.randomData = items;
      }
  
    },
    doGetRandomList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doGetDetails: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
