/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "../../../utils/@reduxjs/toolkit";
import {
  Meta,
  OrderData,
  PaymentData,
  Plan,
  couponResponse,
  planInterface,
  planState,
} from "../types";
import { initialState } from "../types/initialState";

const userSlice = createSlice({
  name: "planState",
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
    setPlan: (state, action: PayloadAction<Array<Plan>>) => {
      state.plans = action.payload;
    },
    setCouponResponse: (state, action: PayloadAction<couponResponse>) => {
      state.couponResponse = action.payload;
    },
    doGetPlans: (state) => {},
    doApplyCoupon: (
      state,
      action: PayloadAction<{
        plan_id: string;
        couponCode: string;
        callback: () => void;
      }>
    ) => {},
    doGetOrders: (state) => {},
    setOrder: (state, action: PayloadAction<Array<OrderData>>) => {
      // state.orders = action.payload;
      if (state.currentPage > 1) {
        state.orders = state.orders.concat(action.payload);
      } else {
        state.orders = action.payload;
      }
    },
    doUpdatePayment: (
      state,
      action: PayloadAction<{ data: PaymentData; callback: () => void }>
    ) => {
      // state.phone = action.payload;
    },
    doCreatePayment: (
      state,
      action: PayloadAction<{
        plan_id: string;
        couponCode: string;
        callback: (data: {
          payment_id: string;
          payment_key: string;
          payment_amount: number;
        }) => void;
      }>
    ) => {
      // state.phone = action.payload;
    },
    setOrderId: (state, action: PayloadAction<string>) => {
      state.order_id = action.payload;
    },
    setPaymentId: (state, action: PayloadAction<string>) => {
      state.payment_id = action.payload;
    },
    setPaymentKey: (state, action: PayloadAction<string>) => {
      state.payment_key = action.payload;
    },
    setPaymentAmount: (state, action: PayloadAction<number>) => {
      state.payment_amount = action.payload;
    },
  },
});

export const { actions, reducer, name: postSliceKey } = userSlice;
