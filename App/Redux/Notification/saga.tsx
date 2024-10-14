import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  BLOG_BOOKMARK,
  BLOG_LIKE,
  BLOG_LIST,
  DELETE_ALL_NOTIFICATION,
  GET_BLOG_DETAILS,
  GET_CATEGORY,
  NOTIFICATION_LIST,
  READ_ALL_NOTIFICATION,
  READ_NOTIFICATION,
  USER_CREATE_POST_UPLOAD,
} from "../../services/request/ApiPoint";
import { deleteCallNoti, get, post, postFile,put as Put } from "../../services/request/request";
import showToast from "../../utils/toast";
import { selectCurrentPage, selectSearchText } from "./selectors.";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";

export function* doGetListRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const pageNo: number = yield select(selectCurrentPage);
    const search: string = yield select(selectSearchText);
    yield put(actions.setLoading(true));
    if (pageNo == 1) {
      yield put(actions.setLoading(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
    const response: AxiosResponse = yield get(
      NOTIFICATION_LIST.concat(
        `?pageSize=10&pageNo=${pageNo}${
          search.length > 0 ? "&search=" + search : ""
        }`
      )
    );
    if (pageNo == 1) {
      yield put(actions.setLoading(false));
    } else {
      yield put(actions.setMoreLoading(false));
    }
    yield put(actions.setLoading(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setList(response.data.data.results));
    yield put(actions.setNewNotification(response.data.data.newNotification));
    yield put(actions.setListMeta(response.data.data.meta));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}

export function* doReadAllRequest(action: { payload: { callback: any } }) {
  try {
      
    yield delay(500);
    const response: AxiosResponse = yield Put( READ_ALL_NOTIFICATION, { });
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doDeleteAllRequest(action: {
  payload: { callback: any };
}) {

  try {
    yield delay(500);
    const response: AxiosResponse = yield deleteCallNoti(DELETE_ALL_NOTIFICATION);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }  
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doReadRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    const response: AxiosResponse = yield Put(READ_NOTIFICATION.concat(
      `/${action.payload.id}`
    ), {});

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* NotificationRepoSaga() {
  yield takeLatest(actions.doGetList, doGetListRequest);
  yield takeLatest(actions.doReadAll, doReadAllRequest);
    yield takeLatest(actions.doRead, doReadRequest);
  yield takeLatest(actions.doDeleteAll, doDeleteAllRequest);

}
