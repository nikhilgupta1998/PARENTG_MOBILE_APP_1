import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  MilestoneCategoryGarphInterface,
  MilestoneActivityGarphInterface,
} from "./types";
import { initialState } from "./types/initialState";

const userSlice = createSlice({
  name: "milestoneGraphState",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    doGetMilestoneCategoryGraph: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetMilestoneActivityGraph: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    setMilestoneCategoryGraph: (
      state,
      action: PayloadAction<Array<MilestoneCategoryGarphInterface>>
    ) => {
      state.milestoneCategoryGraph = action.payload;
    },
    setMilestoneActivityGraph: (
      state,
      action: PayloadAction<[]>  
    ) => {
      state.milestoneActivityGraph = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
