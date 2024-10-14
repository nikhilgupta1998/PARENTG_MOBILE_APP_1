import { put, takeLatest, select, call, delay } from "redux-saga/effects";
import { actions } from "./slice";
import { setObjectValue } from "../../../utils/local-storage";

import { AxiosResponse } from "axios";
import showToast from "../../../utils/toast";
import { get, post, put as putapi } from "../../../services/request/request";
import {
  APPLIED_COUPON,
  CREATE_USER_ORDER,
  GET_ORDER,
  GET_PLAN,
  UPDATE_USER_ORDER,
} from "../../../services/request/ApiPoint";
import CatchBlockFunction from "components/Catch";
import { PaymentData } from "../types";
import { selectCurrentPage } from "./selectors";

export function* GetPlanRequest() {
  try {
    yield delay(500);
// 
    const response: AxiosResponse = yield get(GET_PLAN);
    if (response && !response.data) {
      return;
    }
    yield put(actions.setPlan(response.data.data));
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* GetOrderRequest() {
  try {

    yield delay(500);
    const page: number = yield select(selectCurrentPage);
    if (page == 1) {
      yield put(actions.setLoading(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
    const response: AxiosResponse = yield get(
      GET_ORDER.concat(
        `?pageSize=5&pageNo=${page}`
      )
    );
    if (page == 1) {
      yield put(actions.setLoading(false));
    } else {
      yield put(actions.setMoreLoading(false));
    }
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setOrder(response.data.data.results ));
    yield put(actions.setListMeta(response.data.data.meta));

  } catch (error: any) {
    yield put(actions.setLoading(true));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
  
}
export function* userCreateOrderRequest(action: {
  payload: {
    plan_id: string;
    couponCode:string;
    callback: any;
  };
}) {
  try {
    yield delay(500);
    yield put(actions.setLoading(true));
    if (action.payload.plan_id.length == 0) {
      showToast("Please select plan.");
      return;
    }
    const response: AxiosResponse = yield post(CREATE_USER_ORDER, {
      planId: action.payload.plan_id,
      couponCode: action.payload.couponCode
    });
    yield put(actions.setLoading(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setPaymentAmount(response.data.data.data.amount));
    yield put(actions.setPaymentId(response.data.data.data.id));
    yield put(actions.setOrderId(response.data.data.data.receipt));
    yield put(actions.setPaymentKey(response.data.data.key));

    yield call(
      action.payload.callback({
        payment_amount: response.data.data.data.amount,
        payment_id: response.data.data.data.id,
        payment_key: response.data.data.key,
      })
    );
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* useUpdateOrderRequest(action: {
  payload: { data: any; callback: any };
}) {
  const data = {
    orderId : action.payload.data.order_id,
    orderStatus: action.payload.data.status,
    code: action.payload.data.code,
    description: action.payload.data.description,
    source: action.payload.data.source,
    step: action.payload.data.step,
    reason: action.payload.data.reason,
    paymentId : action.payload.data.payment_id,
    status : action.payload.data.status
  };
  try {
    yield delay(500);
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield putapi(
      UPDATE_USER_ORDER,
      data
    );
    yield put(actions.doGetOrders());
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doApplyCouponRequest(action: {
  payload: {
    plan_id: string;
    couponCode:string;
    callback: any;
  };
}) {
  try {
    yield delay(500);
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(APPLIED_COUPON, {
      planId: action.payload.plan_id,
      couponCode: action.payload.couponCode
    });
    yield put(actions.setLoading(false));
    if (response && !response.data) {
      if(action.payload.couponCode){
      showToast(response.data.message);
      }
      return;
    }
    if(action.payload.couponCode){
    showToast(response.data.message);
    }
    yield put(actions.setCouponResponse(response.data.data));
    yield call(
      action.payload.callback()
    );
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* PlanSaga() {
  yield takeLatest(actions.doGetPlans, GetPlanRequest);
  yield takeLatest(actions.doGetOrders, GetOrderRequest);
  yield takeLatest(actions.doCreatePayment, userCreateOrderRequest);
  yield takeLatest(actions.doApplyCoupon, doApplyCouponRequest);
  yield takeLatest(actions.doUpdatePayment, useUpdateOrderRequest);
}
