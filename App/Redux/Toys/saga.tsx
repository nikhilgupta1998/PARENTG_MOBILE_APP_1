import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  GET_TOY_DETAILS,
  TOYS_CATEGORY_LIST,
  TOYS_LIST,
  TOYS_RANDOM,
  TOY_BOOKMARK,
} from "../../services/request/ApiPoint";
import { get, post } from "../../services/request/request";
import showToast from "../../utils/toast";
import {
  selectAgeFilter,
  selectBookmark,
  selectCategory,
  selectCurrentPage,
  selectRandomData,
  selectSearchText,
  selectSelectedToyCategory,
} from "./selectors.";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";
import { ToysItem, ageFilterInterface } from "./types";

export function* doGetListRequest(action: { payload: { callback: any } }) {
  try {
    const ageFilter: ageFilterInterface = yield select(selectAgeFilter);
    const categoryToy: [] = yield select(selectSelectedToyCategory);
    const bookmark: Number = yield select(selectBookmark);
    const category: string = yield select(selectCategory);
    const search: string = yield select(selectSearchText);
    const page: number = yield select(selectCurrentPage);
    if (page == 1) {
      yield put(actions.setLoading(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
    yield delay(500);
    const response: AxiosResponse = yield post(
      TOYS_LIST.concat(
        `?pageSize=6&pageNo=${page}&bookmark=${bookmark}&search=${search}&categoryId=${category}&maxAge=${
          ageFilter.maxAge
        }&minAge=${ageFilter.minAge}&isApplied=${Boolean(ageFilter.isApplied)}`
      ),
      {
        toysCategory: categoryToy,
      }
    );

    yield put(actions.setList(response.data.data.results));
    yield put(actions.setListMeta(response.data.data.meta));
    if (page == 1) {
      yield put(actions.setLoading(false));
    } else {
      yield put(actions.setMoreLoading(false));
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetRandomRequest(action: { payload: { callback: any } }) {
  try {
    const categoryToy: [] = yield select(selectSelectedToyCategory);
    const ageFilter: ageFilterInterface = yield select(selectAgeFilter);
    const category: string = yield select(selectCategory);
    const items: any[] = yield select(selectRandomData);
    const indexItem = items.findIndex((x) => x.id == category);

    if (indexItem !== -1) {
      if (items[indexItem].item.length > 0) {
        yield call(action.payload.callback());
        return
      }
    }

    yield put(actions.setLoading(true));
    yield delay(500);
    const response: AxiosResponse = yield post(
      TOYS_RANDOM.concat(
        `?categoryId=${category}&maxAge=${ageFilter.maxAge}&minAge=${
          ageFilter.minAge
        }&isApplied=${Boolean(ageFilter.isApplied)}`
      ),
      {
        toysCategory: categoryToy,
      }
    );
    yield put(actions.setRandomData(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}

export function* doAddBookmarkRequest(action: {
  payload: { id: string; bookmark: number; callback: any };
}) {

  try {
    const response: AxiosResponse = yield post(TOY_BOOKMARK, {
      toyId: action.payload.id,
      bookmark: action.payload.bookmark,
    });
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doGetToyCategoryListRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);

    const response: AxiosResponse = yield get(TOYS_CATEGORY_LIST);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setToyCategory(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doGetDetailsRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);

    const response: AxiosResponse = yield get(
      GET_TOY_DETAILS.concat(action.payload.id)
    );
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setToyDetails(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* ToysRepoSaga() {
  yield takeLatest(actions.doGetDetails, doGetDetailsRequest);
  yield takeLatest(actions.doGetList, doGetListRequest);
  yield takeLatest(actions.doGetToyCategoryList, doGetToyCategoryListRequest);
  yield takeLatest(actions.doAddBookmark, doAddBookmarkRequest);
  yield takeLatest(actions.doGetRandomList, doGetRandomRequest);
}
