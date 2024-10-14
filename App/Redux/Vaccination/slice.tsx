import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  Meta,
  VaccinationItemInterface,
  VaccinationStatusCountInterface,
} from "./types";
import { initialState } from "./types/initialState";
import { set } from "lodash";

const userSlice = createSlice({
  name: "vaccinationState",
  initialState,
  reducers: {
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
    setType: (state, action: PayloadAction<number>) => {
      state.type = action.payload;
    },
    setMonths: (state, action: PayloadAction<number>) => {
      state.months = action.payload;
    },

    setList: (
      state,
      action: PayloadAction<Array<VaccinationItemInterface>>
    ) => {
      if (state.currentPage > 1) {
        state.list = state.list.concat(action.payload);
      } else {
        state.list = action.payload;
      }
    },
    setStatusCount: (
      state,
      action: PayloadAction<VaccinationStatusCountInterface>
    ) => {
      state.statusCount = action.payload;
    },

    setPostCreated: (state, action: PayloadAction<boolean>) => {
      state.postCreated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    doAddVaccination: (
      state,
      action: PayloadAction<{
        callback: (type: boolean) => void;
      }>
    ) => {},
    doEditVaccination: (
      state,
      action: PayloadAction<{
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
      set(state, `addVaccination.${action.payload.name}`, action.payload.value);
    },
    clearFrom: (state) => {
      state.addVaccination._id = "";
      state.addVaccination.vaccineId = "";
      state.addVaccination.date = "";
      state.addVaccination.heightInch = "";
      state.addVaccination.heightFeet = "";
      state.addVaccination.weight = "";
      state.addVaccination.image = [];
    },
    setDataVaccination: (state, action: PayloadAction<{ item: any }>) => {
      // console.log(action.payload.item , "setDataVaccination");
      
      state.addVaccination._id = action.payload.item?._id;
      state.addVaccination.vaccineId = action.payload.item?.vaccineId;
      state.addVaccination.date = action.payload.item?.date;
      state.addVaccination.heightInch = action.payload.item?.heightInch;
      state.addVaccination.heightFeet = action.payload.item?.heightFeet;
      state.addVaccination.weight = action.payload.item?.weight;
      state.addVaccination.image = action.payload.item?.image == "" ? [] : action.payload.item?.image;
    },
    doAddImages: (
      state,
      action: PayloadAction<{ data: any; callback: any }>
    ) => {},
    setAddImages: (state, action: PayloadAction<any>) => {
      state.addVaccination.image.push(action.payload);
    },
    UploadeImage: (
      state,
      action: PayloadAction<{
        data: any;
        signedUrl: string;
        result: any;
        callback: any;
      }>
    ) => {},
    updateFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `addVaccination.${action.payload.key}`, action.payload.value);
    },
    doGetList: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doGetDetails: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
