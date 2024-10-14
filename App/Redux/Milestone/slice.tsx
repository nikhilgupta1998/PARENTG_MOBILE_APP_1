import { set } from "lodash";
import { initialState } from "./types/initialState";
import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { setStringValue } from "../../utils/local-storage";
import {
  Meta,
  QuestionsInterface,
  milestoneInterface,
  milestoneMainInterface,
  progressBarInterface,
} from "./types";

export const useClinicSlice = createSlice({
  name: "milestoneState",
  initialState,
  reducers: {
    doGetProgressBarList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetAssessmentList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetFaqList: (
      state,
      action: PayloadAction<{ callback: () => void }>
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
    doGetMilestoneList: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    doGetMilestoneQuestionList: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {
      if (state.currentPageQuestion == 1) {
        state.question.milestone.milestoneEnglishTitle = "";
        state.question.data.results = [];
      }
    },

    setQuestionComplete: (
      state,
      action: PayloadAction<{
        index: number;
        status: number;
      }>
    ) => {
      
      state.question.data.results[action.payload.index].answer =
        action.payload.status;
    },
    doCompleteQuestion: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    setProgressBarData: (
      state,
      action: PayloadAction<Array<progressBarInterface>>
    ) => {
      state.progressBar = action.payload;
    },

    setMilestoneData: (
      state,
      action: PayloadAction<milestoneMainInterface>
    ) => {
      if (state.currentPageMilestone > 1) {
        state.milestone.data.results = state.milestone.data.results.concat(
          action.payload.data.results
        );
      } else {
        state.milestone = action.payload;
      }
    },
    resetMilestoneData: (state) => {
      state.milestone = initialState.milestone;
      state.currentPage = 1;
      state.moreLoading = false;
      state.loadermilestone = true;
    },
    resetQuestionData: (state) => {
      state.question.data.results = [];
      state.currentPageQuestion = 1;
      state.question.milestone.milestoneEnglishTitle = "" ;
      state.moreLoading = false;
      state.loaderQuestion = true;
    },

    setLoadermilestone: (state, action: PayloadAction<boolean>) => {
      state.loadermilestone = action.payload;
    },
    setLoaderQuestion: (state, action: PayloadAction<boolean>) => {
      state.loaderQuestion = action.payload;
    },
    setloader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    setQuestionLoader: (state, action: PayloadAction<boolean>) => {
      state.QuestionLoader = action.payload;
    },

    clearMilestonePage: (state) => {
      state.milestone = {
        _id: "",
        category: {
          _id: "",
          categoryArabicTitle: "",
          categoryEnglishTitle: "",
          categoryHindiTitle: "",
        },
        data: {
          meta: {
            limit: 0,
            page: 1,
            total: 1,
            totalPages: 1,
          },
          results: [],
        },
      };
    },
    setAssessmentData: (state, action: PayloadAction<any>) => {
      state.assessmentData = action.payload;
    },
    setFaqList: (state, action: PayloadAction<any>) => {
      state.faqList = action.payload;
    },
    setquestionData: (state, action: PayloadAction<QuestionsInterface>) => {
      if (state.currentPageQuestion > 1) {
        state.question.data.results = state.question.data.results.concat(
          action.payload.data.results
        );
        state.question.milestone = action.payload.milestone;
      } else {
        state.question = action.payload;
      }
    },

    clearProfileForm: (state) => {},
    addProfilePhoto: (
      state,
      action: PayloadAction<{ data: any; callback: () => void }>
    ) => {},
    updateLoginFormValue: (
      state,
      action: PayloadAction<{ key: any; value: any }>
    ) => {
      set(state, `loginFrom.${action.payload.key}.value`, action.payload.value);
    },
    UploadeImage: (
      state,
      action: PayloadAction<{ data: any; signedUrl: string; callback: any }>
    ) => {},
    childAddImages: (
      state,
      action: PayloadAction<{ data: any; callback: any }>
    ) => {},
    AddImagesParent: (
      state,
      action: PayloadAction<{ data: any; callback: any }>
    ) => {},
    setCurrentPageMilestone: (state, action: PayloadAction<number>) => {
      state.currentPageMilestone = action.payload;
    },
    setMoreLoadingMilestone: (state, action: PayloadAction<boolean>) => {
      state.moreLoadingMilestone = action.payload;
    },
    setListMetaMilestone: (state, action: PayloadAction<Meta>) => {
      state.metaMilestone = action.payload;
    },
    setCurrentPageQuestion: (state, action: PayloadAction<number>) => {
      state.currentPageQuestion = action.payload;
    },
    setMoreLoadingQuestion: (state, action: PayloadAction<boolean>) => {
      state.moreLoadingQuestion = action.payload;
    },
    setListMetaQuestion: (state, action: PayloadAction<Meta>) => {
      state.metaQuestion = action.payload;
    },
  },
});

export const { reducer, actions, name: sliceKey } = useClinicSlice;
