import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import { actions } from "./slice";
import {
  get,
  getWithID,
  putWithIdWithoutData,
} from "../../services/request/request";
import CatchBlockFunction from "components/Catch";
import {
  DO_COMPLETE_QUESTION,
  GET_ASSESSMENT_DATA,
  GET_FAQ_DATA,
  GET_MILESTONE_BY_CATEGORIES,
  GET_PROGRESS_BAR_DATA,
  GET_QUESTION_BY_MILESTONE,
} from "../../services/request/ApiPoint";
import showToast from "utils/toast";
import {
  selectMilestoneCurrentPage,
  selectQuestionCurrentPage,
} from "./selector";
import { YellowBox } from "react-native";
export function* doGetProgressBarListRequest(action: {
  payload: { callback: any };
}) {
  yield put(actions.setloader(true));
  try {
    yield delay(500);

    const response: AxiosResponse = yield get(GET_PROGRESS_BAR_DATA);

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setProgressBarData(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetMilestoneListRequest(action: {
  payload: { id: string; callback: any };
}) {
  yield delay(500);
  try {
    const page: number = yield select(selectMilestoneCurrentPage);
    if (page == 1) {
      yield put(actions.setLoadermilestone(true));
    } else {
      yield put(actions.setMoreLoadingMilestone(true));
    }
    const response: AxiosResponse = yield getWithID(
      GET_MILESTONE_BY_CATEGORIES,
      action.payload.id.concat(`?pageSize=5&pageNo=${page}`)
    );
    if (page == 1) {
    } else {
      yield put(actions.setMoreLoadingMilestone(false));
    }
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setMilestoneData(response.data.data));
    yield put(actions.setListMetaMilestone(response.data.data.data.meta));
    yield put(actions.setLoadermilestone(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoadermilestone(false));
    CatchBlockFunction(error);
  }
}
export function* doGetMilestoneQuestionListRequest(action: {
  payload: { id: string; callback: any };
}) {
  yield delay(500);
  try {
    const page: number = yield select(selectQuestionCurrentPage);
    if (page == 1) {
      yield put(actions.setLoaderQuestion(true));
    } else {
      yield put(actions.setMoreLoadingQuestion(true));
    }

    const response: AxiosResponse = yield getWithID(
      GET_QUESTION_BY_MILESTONE,
      action.payload.id.concat(`?pageSize=5&pageNo=${page}`)
    );
    if (page == 1) {
    } else {
      yield put(actions.setMoreLoadingQuestion(false));
    }
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setquestionData(response.data.data));
    yield put(actions.setListMetaQuestion(response.data.data.data.meta));
    yield put(actions.setLoaderQuestion(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoaderQuestion(false));
    CatchBlockFunction(error);
  }
}
export function* doCompleteQuestionRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    const response: AxiosResponse = yield putWithIdWithoutData(
      DO_COMPLETE_QUESTION,
      action.payload.id
    );
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action?.payload?.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doGetAssessmentListRequest(action: {
  payload: { callback: any };
}) {
  yield put(actions.setloader(true));
  try {
    yield delay(500);
    const response: AxiosResponse = yield get(GET_ASSESSMENT_DATA);

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setAssessmentData(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetFaqListRequest(action: { payload: { callback: any } }) {
  yield put(actions.setloader(true));
  try {
    yield delay(500);
    const response: AxiosResponse = yield get(GET_FAQ_DATA);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setFaqList(response.data.data.results));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}
export function* MilestoneRepoSaga() {
  yield takeLatest(actions.doGetProgressBarList, doGetProgressBarListRequest);
  yield takeLatest(actions.doGetAssessmentList, doGetAssessmentListRequest);
  yield takeLatest(actions.doGetFaqList, doGetFaqListRequest);
  yield takeLatest(actions.doGetMilestoneList, doGetMilestoneListRequest);
  yield takeLatest(
    actions.doGetMilestoneQuestionList,
    doGetMilestoneQuestionListRequest
  );
  yield takeLatest(actions.doCompleteQuestion, doCompleteQuestionRequest);
}
