import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { Meta, ToyDetails, ToysItem } from "./types";
import { set } from "lodash";

const userSlice = createSlice({
  name: "toysState",
  initialState,
  reducers: {
    doGetList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doGetRandomList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetToyCategoryList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.moreLoading = action.payload;
    },
    setListMeta: (state, action: PayloadAction<Meta>) => {
      state.meta = action.payload;
    },
    setbookmark: (state, action: PayloadAction<number>) => {
      state.bookmark = action.payload;
    },
    setToyDetails: (state, action: PayloadAction<ToyDetails>) => {
      state.toyDetails = action.payload;
    },
    setRandomData: (state, action: PayloadAction<Array<ToysItem>>) => {
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
    setList: (state, action: PayloadAction<Array<ToysItem>>) => {
      if (state.currentPage > 1) {
        state.Toys = state.Toys.concat(action.payload);
      } else {
        state.Toys = action.payload;
      }
    },
    doGetDetails: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    setToyCategory: (state, action: PayloadAction<any>) => {
      state.ToyCategory = action.payload;
    },
    setselectToyCategory: (state, action: PayloadAction<any>) => {
      state.selectToyCategory = action.payload;
    },
    resetdata: (state) => {
      state.Toys = initialState.Toys;
      state.toyDetails = initialState.toyDetails;
      state.searchText = initialState.searchText;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAddBookmark: (state, action: PayloadAction<number>) => {
      state.toyDetails.bookmark = action.payload;
    },
    doAddBookmark: (
      state,
      action: PayloadAction<{
        id: string;
        bookmark: number;
        callback: (type: boolean) => void;
      }>
    ) => {},
    doAddBookmarkManually: (
      state,
      action: PayloadAction<{
        id: string;
        bookmark: number;
        index: number;
      }>
    ) => {
      state.Toys[action.payload.index].bookmark = action.payload.bookmark;
    },
    doAddRandomBookmarkManual: (
      state,
      action: PayloadAction<{
        bookmark: number;
        index: number;
      }>
    ) => {
     
      if (state.randomData.filter((x) => x.id == state.category).length > 0) {
        const indexItem = state.randomData.findIndex(
          (x) => x.id == state.category
        );
        const items = state.randomData;
        items[indexItem].item[action.payload.index].bookmark =
          action.payload.bookmark;
        state.randomData = items;
      }
    },
    doAddRandomBookmarkManualDetails: (
      state,
      action: PayloadAction<{
        bookmark: number;
        category: string;
        itemId: string;
      }>
    ) => {
      if (
        state.randomData.filter((x) => x.id == "").length >
        0
      ) {
        const indexItem = state.randomData.findIndex(
          (x) => x.id == ""
        );
        const items = state.randomData;
        const indexInnerItem = items[indexItem].item.findIndex(
          (x) => x._id == action.payload.itemId
        );
        if (indexInnerItem !== -1) {
          items[indexItem].item[indexInnerItem].bookmark =
            action.payload.bookmark;
          state.randomData = items;
        }
      }
      if (
        state.randomData.filter((x) => x.id == "1").length >
        0
      ) {
        const indexItem = state.randomData.findIndex(
          (x) => x.id == "1"
        );
        const items = state.randomData;
        const indexInnerItem = items[indexItem].item.findIndex(
          (x) => x._id == action.payload.itemId
        );
        if (indexInnerItem !== -1) {
          items[indexItem].item[indexInnerItem].bookmark =
            action.payload.bookmark;
          state.randomData = items;
        }
      }
      if (
        state.randomData.filter((x) => x.id == action.payload.category).length >
        0
      ) {
        const indexItem = state.randomData.findIndex(
          (x) => x.id == action.payload.category
        );
        const items = state.randomData;
        const indexInnerItem = items[indexItem].item.findIndex(
          (x) => x._id == action.payload.itemId
        );
        if (indexInnerItem !== -1) {
          items[indexItem].item[indexInnerItem].bookmark =
            action.payload.bookmark;
          state.randomData = items;
        }
      }
    },
    setCategory: (state, action: PayloadAction<string>) => {
      // state.pageNo = 1;
      state.category = action.payload;
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setTotalRow: (state, action: PayloadAction<number>) => {
      state.totalRow = action.payload;
    },
    changeFromValue(
      state,
      action: PayloadAction<{
        name: string;
        value: any;
      }>
    ) {
      set(state, `ageFilter.${action.payload.name}`, action.payload.value);
    },
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
