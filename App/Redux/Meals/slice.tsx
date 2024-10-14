import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./types/initialState";
import { set } from "lodash";
import { Meta } from "./types";

const userSlice = createSlice({
  name: "mealsState",
  initialState,
  reducers: {
    updateBMIFormFormValue: (
      state,
      action: PayloadAction<{ key: any; value: any }>
    ) => {
      set(
        state,
        `bmiCalculateForm.${action.payload.key}`,
        action.payload.value
      );
    },
    updateFilterFormValue: (
      state,
      action: PayloadAction<{ key: any; value: any }>
    ) => {
      set(
        state,
        `filterCategoryform.${action.payload.key}`,
        action.payload.value
      );
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setCategory: (state, action: PayloadAction<[]>) => {
      state.category = action.payload;
    },
    setIngrident: (state, action: PayloadAction<[]>) => {
      state.ingrident = action.payload;
    },
    clearBmiCalculateForm: (state) => {
      state.bmiCalculateForm.BMI = "";
      state.bmiCalculateForm.age = "";
      state.bmiCalculateForm.heightFeet = "";
      state.bmiCalculateForm.heightInch = "";
      state.bmiCalculateForm.weight = "";
      state.bmiCalculateForm.age = "";
    },
    setType: (state, action: PayloadAction<number>) => {
      state.type = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },
    setTotalRow: (state, action: PayloadAction<number>) => {
      state.totalRow = action.payload;
    },
    setList: (state, action: PayloadAction<[]>) => {
      state.MealsList = action.payload;
      state.loading = true;
    },
    resetData: (state) => {
      state.MealsList = [];
      state.bmiLoader = true;
      state.mealLoader = true;
      state.fuFoodMealLoader = true;
      state.mealDetailLoader = true;
      state.chatListLoader = true;
      state.premiumMealLoader = true;
      state.loading = true;
      state.moreLoading = false;
      state.FunFoodMealsList = [];
      state.allMealList = [];
      state.MealsFunFoodDetails = initialState.MealsFunFoodDetails;
      state.MealsDetails = initialState.MealsDetails;
      state.mealDetail = initialState.mealDetail;
      state.chatList = [];
      state.pageNo = initialState.pageNo;
      state.totalRow = initialState.totalRow;
      state.currentPage = initialState.currentPage;
      state.meta = initialState.meta;
      state.allMealsPageNo = initialState.allMealsPageNo;
      state.allMealsTotalRow = initialState.allMealsTotalRow;
      state.allMealsMeta = initialState.allMealsMeta;
      state.allMealsCurrentPage = initialState.allMealsCurrentPage;
      state.allMealsMoreLoading = initialState.allMealsMoreLoading;
    },
    resetDetailData: (state) => {
      state.MealsDetails = initialState.MealsDetails;
      state.mealDetail = initialState.mealDetail;
    },
    setRandomData: (state, action: PayloadAction<[]>) => {
      if (state.randomFunFoodData.filter((x) => x.id == state.filterFoodType.toString()).length > 0) {
        const indexItem = state.randomFunFoodData.findIndex(
          (x) => x.id == state.filterFoodType.toString()
        );
        const items = state.randomFunFoodData;
        items[indexItem].item = action.payload;
        state.randomFunFoodData = items;
      } else {
        const items = state.randomFunFoodData;
        items.push({
          id: state.filterFoodType.toString(),
          item: action.payload,
        });
        state.randomFunFoodData = items;
      }
    },
    doGetRandomList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    setFunFoodMealsList: (state, action: PayloadAction<[]>) => {
      if (state.currentPage > 1) {
        state.FunFoodMealsList = state.FunFoodMealsList.concat(action.payload);
      } else {
        state.FunFoodMealsList = action.payload;
      }
    },
    setMealsDetails: (state, action: PayloadAction<{}>) => {
      state.MealsDetails = action.payload;
    },
    setMealsFunFoodDetails: (state, action: PayloadAction<{}>) => {
      state.MealsFunFoodDetails = action.payload;
    },
    setchatList: (state, action: PayloadAction<[]>) => {
      state.chatList = action.payload;
    },

    setChat: (state, action: PayloadAction<string>) => {
      state.chat = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBmiLoader: (state, action: PayloadAction<boolean>) => {
      state.bmiLoader = action.payload;
    },

    setMealLoader: (state, action: PayloadAction<boolean>) => {
      state.mealLoader = action.payload;
    },

    setFuFoodMealLoader: (state, action: PayloadAction<boolean>) => {
      state.fuFoodMealLoader = action.payload;
    },
    setMealDetailLoader: (state, action: PayloadAction<boolean>) => {
      state.mealDetailLoader = action.payload;
    },

    setPremiumMealLoader: (state, action: PayloadAction<boolean>) => {
      state.premiumMealLoader = action.payload;
    },
    setChatListLoader: (state, action: PayloadAction<boolean>) => {
      state.chatListLoader = action.payload;
    },
    setChatLoader: (state, action: PayloadAction<boolean>) => {
      state.chatLoader = action.payload;
    },
    doCalculateBMI: (
      state,
      action: PayloadAction<{
        callback: () => void;
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
    filterFoodValue(
      state,
      action: PayloadAction<{
        name: string;
        value: any;
      }>
    ) {
      set(state, `filterFood.${action.payload.name}`, action.payload.value);
    },
    filterFoodTypeValue: (state, action: PayloadAction<any>) => {
      state.filterFoodType = action.payload;
    },
    doAddImages: (
      state,
      action: PayloadAction<{ data: any; callback: any }>
    ) => {},
    setCategoryList: (state, action: PayloadAction<any>) => {
      state.categoryList = action.payload;
    },
    setIngridentList: (state, action: PayloadAction<any>) => {
      state.ingridentList = action.payload;
    },
    doGetCategoryList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    // new work
    doGetList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doGetALlMealList: (
      state,
      action: PayloadAction<{
        type: number;
        mealType: number;
        bookMark : boolean;
        callback: () => void;
      }>
    ) => {},
    doGetFunFoodList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetFilterData: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doSendFilter: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetDetails: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    doGetFunFoodDetails: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    doGetChatList: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    doSendMessage: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    dogetCategory: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    dogetIngredient: (
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
    setAllMealsPageSize: (state, action: PayloadAction<number>) => {
      state.allMealsPageSize = action.payload;
    },
    setAllMealsPageNo: (state, action: PayloadAction<number>) => {
      state.allMealsPageNo = action.payload;
    },
    setAllMealsTotalRow: (state, action: PayloadAction<number>) => {
      state.allMealsTotalRow = action.payload;
    },
    setAllMealsMeta: (state, action: PayloadAction<Meta>) => {
      state.allMealsMeta = action.payload;
    },
    setAllMealsCurrentPage: (state, action: PayloadAction<number>) => {
      state.allMealsCurrentPage = action.payload;
    },
    setAllMealsMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.allMealsMoreLoading = action.payload;
    },
    doAddBookmark: (
      state,
      action: PayloadAction<{
        id: string;
        bookmark: number;
        callback: (type: boolean) => void;
      }>
    ) => {},
    setDoBookmark: (state, action: PayloadAction<{index:number , bookmark : number}>) => {      
      state.allMealList[action.payload.index].bookmark = action.payload.bookmark;
    },
    setAllMealList: (state, action: PayloadAction<[]>) => {
      if (state.allMealsCurrentPage > 1) {
        state.allMealList = state.allMealList.concat(action.payload);
      } else {
        state.allMealList = action.payload;
      }
    },
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
