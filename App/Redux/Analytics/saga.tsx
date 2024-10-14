import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  ADD_BOTTLE_FEEDING,
  ADD_BREAST_FEEDING,
  ADD_GROWTH,
  ADD_SLEEP,
  BLOG_BOOKMARK,
  BLOG_LIKE,
  BLOG_LIST,
  GET_BLOG_DETAILS,
  GET_CATEGORY,
  GET_FEEDINGDATA,
  GRAPH_DATA,
  USER_CREATE_POST_UPLOAD,
  WEIGHT_DATA,
} from "../../services/request/ApiPoint";
import { get, getChart, post, postFile } from "../../services/request/request";
import showToast from "../../utils/toast";
import { selectBottleFeeding, selectBreastFeeding, selectGrowth, selectSleep } from "./selectors.";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";
import { useSelector } from "react-redux";
import {
  breastFeedingInterface,
  growthInterface,
  bottleFeedingInterface,
  sleepInterface,
} from "./types";

export function* doAddBreastFeedingListRequest(action: {
  payload: { callback: any };
}) {
  yield delay(500);
  const form: breastFeedingInterface = yield select(selectBreastFeeding);
  
  if (form.rightStartTime.length == 0 && form.leftStartTime.length == 0) {
    showToast("please enter data");
    return;
  }
  
  try {
    const response: AxiosResponse = yield post(ADD_BREAST_FEEDING, form);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doAddBottleFeedingListRequest(action: {
  payload: { callback: any };
}) {

  yield delay(500);
  const form: bottleFeedingInterface = yield select(selectBottleFeeding);
  try {
    const response: AxiosResponse = yield post(ADD_BOTTLE_FEEDING, form);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doAddGrowthFeedingListRequest(action: {
  payload: { callback: any };
}) {
  yield delay(500);
  try {
    const form: growthInterface = yield select(selectGrowth);
    if (form.heightFeet.length == 0 || form.heightInch.length == 0) {
      showToast("Please enter height");
      return
    }
    if (form.weight.length == 0) {
      showToast("Please enter weight");
      return
    }
    const response: AxiosResponse = yield post(ADD_GROWTH, form);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doAddSleepFeedingListRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const form: sleepInterface = yield select(selectSleep);
    if (form.from.length == 0) {
      showToast("Please fill time field");
      return
    }
    if (form.to.length == 0) {
      showToast("Please fill time field");
      return
    }
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(ADD_SLEEP, form); 
    showToast(response.data.message)
    yield put(actions.setLoading(false));
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetGrowthWeightChartRequest(action: {
  payload: {
    token: string;
    startMonth: number;
    endMonth: number;
    callback: any;
  };
}) {
  yield delay(500);
  try {
    const response: AxiosResponse = yield getChart(
      GRAPH_DATA.concat(
        `?startMonth=${action.payload.startMonth}&endMonth=${action.payload.endMonth}`
      ), action.payload.token
    );
    if (response && !response.data) {
      return;
    }
    yield put(actions.setGrowthWeightChartData(response.data.data));
    yield call(action?.payload?.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}

export function* doGetGrowthHeightChartRequest(action: {
  payload: {
    token: string;
    startMonth: number;
    endMonth: number;
    callback: any;
  };
}) {
  yield delay(500);
  try {
    const response: AxiosResponse = yield getChart(
      WEIGHT_DATA.concat(
        `?startMonth=${action.payload.startMonth}&endMonth=${action.payload.endMonth}`
      ), action.payload.token
    );
    if (response && !response.data) {
      // console.log(response.data.message);

      return;
    }
    yield put(actions.setGrowthHeightChartData(response.data.data));
    yield call(action?.payload?.callback());
  } catch (error: any) {
    CatchBlockFunction(error);

  }
}
export function* AnalyticsRepoSaga() {
  yield takeLatest(
    actions.doAddBreastFeedingList,
    doAddBreastFeedingListRequest
  );
  yield takeLatest(
    actions.doAddBottleFeedingList,
    doAddBottleFeedingListRequest
  );

  yield takeLatest(
    actions.doAddGrowthFeedingList,
    doAddGrowthFeedingListRequest
  );
  yield takeLatest(actions.doAddSleepFeedingList, doAddSleepFeedingListRequest);
  yield takeLatest(
    actions.doGetGrowthHeightChart,
    doGetGrowthHeightChartRequest
  );
  yield takeLatest(
    actions.doGetGrowthWeightChart,
    doGetGrowthWeightChartRequest
  );
}
