import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  DO_COMPLETEQUESTION,
  DO_COMPLETEQUESTIONARRAY,
  DO_GET_QUESTION,
  DO_SWITCH_CHILD,
  GET_ACTIVITY,
  GET_HOME_ACTIVITY,
  GET_HOME_ACTIVITY_DETAILS,
  GET_HOME_MEAL,
  GET_TOY,
} from "../../../services/request/ApiPoint";
import {
  get,
  post,
  put as putAPI,
  putWithIdWithoutData,
} from "../../../services/request/request";
import showToast from "../../../utils/toast";
import {
  selectActivityDate,
  selectDate,
  selectQuestionList,
} from "./selectors.";
import { actions } from "./slice";
import CatchBlockFunction from "../../../components/Catch";
import { doCompleteQuestionListInterface } from "./types";

export function* doGetListRequest(action: { payload: { callback: any } }) {
  try {
    const date: string = yield select(selectDate);
    const data = {
      date: date,
    };
    yield delay(500);
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(GET_HOME_ACTIVITY, data);

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setList(response.data.data));
    yield put(actions.setLoading(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetDetailsRequest(action: {
  payload: { id: string; callback: any; showLoading: boolean };
}) {
  try {
    yield delay(500);
    if (action.payload.showLoading) {
      yield put(actions.setLoading(true));
    }

    const response: AxiosResponse = yield get(
      GET_HOME_ACTIVITY_DETAILS.concat(`${action.payload.id}`)
    );

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setBlogDetails(response.data.data[0]));
    yield put(actions.setLoading(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doSelectChildRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield putWithIdWithoutData(
      DO_SWITCH_CHILD,
      action.payload.id
    );

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setLoading(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* CompleteActivityRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    const response: AxiosResponse = yield putWithIdWithoutData(
      DO_COMPLETEQUESTION,
      action.payload.id
    );
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doGetToyListRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield get(GET_TOY);

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.settoyList(response.data.data));
    yield put(actions.setLoading(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetMealListRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const date: string = yield select(selectDate);
    const data = {
      date: date,
    };
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(GET_HOME_MEAL, data);

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setMealList(response.data.data));
    yield put(actions.setLoading(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetAllActivityListRequest(action: {
  payload: { callback: any };
}) {
  try {
    const date: string = yield select(selectActivityDate);
    const data = {
      date: date,
    };
    yield delay(500);
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(GET_ACTIVITY, data);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setActivityList(response.data.data.data));
    yield put(actions.setLoading(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetQuestionRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);

    const response: AxiosResponse = yield get(
      DO_GET_QUESTION.concat(`${action.payload.id}`)
    );
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setQuestionList(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* submitQuestionRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const List: doCompleteQuestionListInterface[] = yield select(
      selectQuestionList
    );
    const response: AxiosResponse = yield putAPI(DO_COMPLETEQUESTIONARRAY, {
      questionData: List,
    });
    // console.log(response, "response");

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* HomeRepoSaga() {
  yield takeLatest(actions.doGetList, doGetListRequest);
  yield takeLatest(actions.selectChild, doSelectChildRequest);
  yield takeLatest(actions.doGetDetails, doGetDetailsRequest);
  yield takeLatest(actions.CompleteActivity, CompleteActivityRequest);
  yield takeLatest(actions.doGetToyList, doGetToyListRequest);
  yield takeLatest(actions.doGetMealList, doGetMealListRequest);
  yield takeLatest(actions.doGetAllActivityList, doGetAllActivityListRequest);
  yield takeLatest(actions.doGetQuestion, doGetQuestionRequest);
  yield takeLatest(actions.submitQuestion, submitQuestionRequest);
}
