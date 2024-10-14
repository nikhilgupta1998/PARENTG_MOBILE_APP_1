import { AxiosResponse } from "axios";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  USER_ACTIVITY_GRAPH,
  USER_CATEGORY_GRAPH,
} from "../../services/request/ApiPoint";
import { get } from "../../services/request/request";
import showToast from "../../utils/toast";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";

export function* doGetMilestoneCategoryGraphListRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);

    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield get(USER_CATEGORY_GRAPH);

    yield put(actions.setLoading(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setMilestoneCategoryGraph(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetMilestoneActivityGraphListRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield get(USER_ACTIVITY_GRAPH);

    yield put(actions.setLoading(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setMilestoneActivityGraph(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}

export function* MilestoneGraphRepoSaga() {
  yield takeLatest(
    actions.doGetMilestoneCategoryGraph,
    doGetMilestoneCategoryGraphListRequest
  );
  yield takeLatest(
    actions.doGetMilestoneActivityGraph,
    doGetMilestoneActivityGraphListRequest
  );
}
