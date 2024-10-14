import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { set } from "lodash";
import { BreastFeedingTypeEnum } from "./types";

const userSlice = createSlice({
  name: "analyticsState",
  initialState,
  reducers: {
    doAddBreastFeedingList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doAddBottleFeedingList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doAddGrowthFeedingList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doAddSleepFeedingList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    getBreastFeedingData: (state, action: PayloadAction<{ callback: () => void }>) => {},
    getGrowthFeedingData: (state, action: PayloadAction<{ callback: () => void }>) => {},
    getSleepFeedingData: (state, action: PayloadAction<{ callback: () => void }>) => {},
    updateBreastFeedingFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `breastFeeding.${action.payload.key}`, action.payload.value);
    },
    updateBottleFeedingFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `bottleFeeding.${action.payload.key}`, action.payload.value);
    },
    
    updateGrowthFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `growth.${action.payload.key}`, action.payload.value);
    },
    updateSleepFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `sleep.${action.payload.key}`, action.payload.value);
    },
    clearSleepForm: (state) => {
      state.sleep.childId = "";
      state.sleep.date = new Date();
      state.sleep.from = "",
      state.sleep.to  = ""
    },
    clearGrowthForm: (state) => {
      state.growth.childId = "";
      state.growth.date = new Date();
      state.growth.heightFeet = "",
      state.growth.heightInch  = "",
      state.growth.weight  = ""
      
    },
    clearBreastFeedingForm: (state) => {
      state.breastFeeding.leftEndTime = "";
      state.breastFeeding.leftStartTime = "",
      state.breastFeeding.rightEndTime = "";
      state.breastFeeding.rightStartTime = ""
    },
    setSleepFeedingData: (state, action: PayloadAction<any>) => {
      state.sleep = action.payload;
    },
    setGrowthFeedingData: (state, action: PayloadAction<any>) => {
      state.growth = action.payload;
    },
    setBreastFeedingData: (state, action: PayloadAction<any>) => {
      state.breastFeeding = action.payload;
    },
    setGrowthWeightChartData: (state, action: PayloadAction<any>) => {
      state.GraphTableData = action.payload;
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    setGrowthHeightChartData: (state, action: PayloadAction<any>) => {
      state.growthHeightChart = action.payload;
    },
    doGetGrowthHeightChart: (
      state,
      action: PayloadAction<{
        token: string;
        startMonth: number;
        endMonth: number;
        callback: () => void;
      }>
    ) => {},
    doGetGrowthWeightChart: (
      state,
      action: PayloadAction<{
        token: string;
        startMonth: number;
        endMonth: number;
        callback: () => void;
      }>
    ) => {},
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
