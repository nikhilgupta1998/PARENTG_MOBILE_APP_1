import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { FAQ_LIST, GET_TUTORIAL_LIST } from "../../services/request/ApiPoint";
import { get } from "../../services/request/request";
import showToast from "../../utils/toast";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";
import { selectCurrentPage } from "./selectors.";

export function* getPostRequest() {
  try {
    yield delay(500);
    const response: AxiosResponse = yield get(FAQ_LIST);
    if (response && response.data.messageCode !== "MESSAGES.FAQ.SUCCESS") {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setPost(response.data.data.results));
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}

export function* doGetListRequest() {
  try {
    yield delay(500);
    const page: number = yield select(selectCurrentPage);
    if (page == 1) {
      yield put(actions.setLoading(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
    const response: AxiosResponse = yield get(
      GET_TUTORIAL_LIST.concat(
        `?pageSize=5&pageNo=${page}`
      )
    );
    yield put(actions.setList(response.data.data.results));
    yield put(actions.setListMeta(response.data.data.meta));
    if (page == 1) {
      yield put(actions.setLoading(false));
    } else {
      yield put(actions.setMoreLoading(false));
    }
  } catch (error: any) {
    yield put(actions.setLoading(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}

export function* FaqRepoSaga() {
  yield takeLatest(actions.doGetPost, getPostRequest);
  yield takeLatest(actions.doGetTutorialList, doGetListRequest);
}
