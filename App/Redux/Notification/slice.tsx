import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Meta, NotificationInterface } from "./types";
import { initialState } from "./types/initialState";

const userSlice = createSlice({
  name: "notificationState",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setType: (state, action: PayloadAction<number>) => {
      state.type = action.payload;
    },

    setList: (state, action: PayloadAction<Array<NotificationInterface>>) => {
      if (state.currentPage > 1) {
        state.list = state.list.concat(action.payload);
      } else {
        state.list = action.payload;
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    doReadAll: (
      state,
      action: PayloadAction<{
        callback: () => void;
      }>
    ) => {},
    doDeleteAll: (
      state,
      action: PayloadAction<{
        callback: () => void;
      }>
    ) => {},
    doRead: (
      state,
      action: PayloadAction<{
        id: string;
        callback: () => void;
      }>
    ) => {},
    doGetList: (state, action: PayloadAction<{ callback: () => void }>) => {},

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.moreLoading = action.payload;
    },
    setListMeta: (state, action: PayloadAction<Meta>) => {
      state.meta = action.payload;
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },
    setNewNotification: (state, action: PayloadAction<number>) => {
      state.newNotification = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
