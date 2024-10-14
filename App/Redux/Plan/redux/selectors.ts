import { RootState } from "../../../types";

import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../types/initialState";

const selectDomain = (state: RootState) => state?.planState || initialState;

export const selectPlanlist= createSelector(
  [selectDomain],
  (state) => state.planlist
);
export const selectPlans = createSelector([selectDomain], state => state.plans);
export const selectOrderId = createSelector(
  [selectDomain],
  state => state.order_id,
);
export const selectPaymentId = createSelector(
  [selectDomain],
  state => state.payment_id,
);
export const selectPaymentAmount = createSelector(
  [selectDomain],
  state => state.payment_amount,
);
export const selectPaymentKey = createSelector(
  [selectDomain],
  state => state.payment_key,
);
export const selectOrder = createSelector(
  [selectDomain],
  state => state.orders,
);
export const selectCurrentPage = createSelector(
  [selectDomain],
  (state) => state.currentPage
);
export const selectMoreLoading = createSelector(
  [selectDomain],
  (state) => state.moreLoading
);
export const selectLoading = createSelector(
  [selectDomain],
  (state) => state.loading
);
export const selectMeta = createSelector([selectDomain], (state) => state.meta);
export const selectCouponResponse = createSelector(
  [selectDomain],
  state => state.couponResponse,
);