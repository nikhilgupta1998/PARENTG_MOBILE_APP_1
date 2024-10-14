import { createSlice } from "../../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ActivityInterface,
  ActivityListInterface,
  doCompleteQuestionListInterface,
} from "./types";
import { initialState } from "./types/initialState";
import { set } from "lodash";

const userSlice = createSlice({
  name: "homeActivityState",
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
    submitQuestion: (state , action: PayloadAction<{callback: () => void }>) => {},
    editCompleteQuestionList: (
      state,
      action: PayloadAction<{
        index: number;
        answer: number;
        id: string;
      }>
    ) => {
      state.questionList[action.payload.index].answer = action.payload.answer;
    },
    setQuestionList: (state, action: PayloadAction<[]>) => {
      state.questionList = action.payload;
    },
    setList: (state, action: PayloadAction<Array<ActivityListInterface>>) => {
      state.list = action.payload;
    },
    setActivityList: (
      state,
      action: PayloadAction<Array<ActivityListInterface>>
    ) => {
      state.ActivityList = action.payload;
    },
    settoyList: (state, action: PayloadAction<[]>) => {
      state.toyList = action.payload;
    },
    setMealList: (state, action: PayloadAction<[]>) => {
      state.MealList = action.payload;
    },
    setBlogDetails: (state, action: PayloadAction<ActivityInterface>) => {
      state.details = action.payload;
    },
    setCompleteActivityList: (state, action: PayloadAction<{index:number , isCompleted : boolean}>) => {      
      state.ActivityList[action.payload.index].isCompleted = action.payload.isCompleted;
    },
    setCompleteActivityDetails: (state, action: PayloadAction<{ isCompleted : boolean}>) => {      
      state.details.isCompleted = action.payload.isCompleted;
    },
    // 
    clearBlogDetails: (state) => {
      state.details.englishTitle = "";
      state.details.hindiTitle = "";
      state.details.arabicTitle = "";
      state.details.image = "";
      state.details.englishPurpose = "";
      state.details.hindiPurpose = "";
      state.details.arabicPurpose = "";
      state.details.categoryId = "";
      state.details.milestoneId = "";
      state.details.englishVideo = "";
      state.details.hindiVideo = "";
      state.details.arabicVideo = "";
      state.details.englishDescription = "";
      state.details.hindiDescription = "";
      state.details.arabicDescription = "";
      state.details.englishMaterialList = [];
      state.details.hindiMaterialList = "";
      state.details.arabicMaterialList = "";
      state.details.visibleAge = 0;
      state.details.minAge = 0;
      (state.details.isCompleted = false), (state.details.maxAge = 0);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    CompleteActivity: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    setCategoryList: (state, action: PayloadAction<any>) => {
      state.categoryList = action.payload;
    },
    doGetList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doGetAllActivityList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetToyList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetMealList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetQuestion: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    selectChild: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    doGetDetails: (
      state,
      action: PayloadAction<{
        id: string;
        callback: () => void;
        showLoading: boolean;
      }>
    ) => {},
    setdate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
    setActivityDate: (state, action: PayloadAction<Date>) => {
      state.ActivityDate = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
