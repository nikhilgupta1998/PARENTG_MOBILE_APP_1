import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  BLOG_BOOKMARK,
  BLOG_LIKE,
  BLOG_LIST,
  BLOG_RANDOM_LIST,
  GET_BLOG_DETAILS,
  GET_CATEGORY,
  USER_CREATE_POST_UPLOAD,
} from "../../services/request/ApiPoint";
import { get, post, postFile } from "../../services/request/request";
import showToast from "../../utils/toast";
import {
  selectBookmark,
  selectCategory,
  selectCurrentPage,
  selectRandomData,
  selectSearchText,
  selectType,
} from "./selectors.";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";
export function* doGetListRequest(action: { payload: { callback: any } }) {
  try {
    const page: number = yield select(selectCurrentPage);
    if (page == 1) {
      yield put(actions.setLoading(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
    yield delay(500);
    const type: Number = yield select(selectType);
    const bookmark: Number = yield select(selectBookmark);
    const category: string = yield select(selectCategory);
    const search: string = yield select(selectSearchText);

    const response: AxiosResponse = yield get(
      BLOG_LIST.concat(
        `?type=${type}&bookmark=${bookmark}&search=${search}&categoryId=${category}&pageSize=5&pageNo=${page}`
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
    yield put(actions.setList(response.data.data.results));
    yield put(actions.setListMeta(response.data.data.meta));
    yield put(actions.setbookmark(response.data.data.bookmark));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetDetailsRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield get(
      GET_BLOG_DETAILS.concat(`/${action.payload.id}`)
    );
    yield put(actions.setLoading(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setBlogDetails(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}

export function* fileUploadRequest(action: {
  payload: { data: any; callback: any };
}) {
  try {
    yield delay(500);
    // yield put(actions.setLoading(true));
    const response: AxiosResponse = yield postFile(
      USER_CREATE_POST_UPLOAD,
      action.payload.data
    );
    yield put(actions.setLoading(false));
    if (response && !response.data) {
      yield call(action.payload.callback());
      return;
    }

    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}

export function* doAddBookmarkRequest(action: {
  payload: { id: string; bookmark: number; callback: any };
}) {
  try {
    yield delay(500);
    const response: AxiosResponse = yield post(BLOG_BOOKMARK, {
      blogId: action.payload.id,
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
export function* doLikeBlogRequest(action: {
  payload: { id: string; like: number; callback: any };
}) {
  try {
    yield delay(500);
    const response: AxiosResponse = yield post(BLOG_LIKE, {
      blogId: action.payload.id,
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
export function* dogetCategoryRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const response: AxiosResponse = yield get(GET_CATEGORY);

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }

    yield put(actions.setCategoryList(response.data.data.results));
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doGetRandomRequest(action: { payload: { callback: any } }) {
  try {

    const page: number = yield select(selectCurrentPage);
    if (page == 1) {
      yield put(actions.setLoading(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
   
    const type: Number = yield select(selectType);
    const bookmark: Number = yield select(selectBookmark);
    const category: string = yield select(selectCategory);
    const search: string = yield select(selectSearchText);

    const items: any[] = yield select(selectRandomData);
    const indexItem = items.findIndex((x) => x.id == category );

    if (indexItem !== -1) {
      if (items[indexItem].item.length > 0) {
        yield call(action.payload.callback());
        return
      }
    }
    yield delay(500);
    const response: AxiosResponse = yield get(
      BLOG_RANDOM_LIST.concat(
        `?type=${type}&bookmark=${bookmark}${
          search.length > 0 ? "&search=" + search : ""
        }&categoryId=${category}&pageSize=20&pageNo=1`
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
    yield put(actions.setRandomData(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}
export function* BlogRepoSaga() {
  yield takeLatest(actions.doAddBookmark, doAddBookmarkRequest);
  yield takeLatest(actions.doGetList, doGetListRequest);
  yield takeLatest(actions.doGetDetails, doGetDetailsRequest);
  yield takeLatest(actions.doLikeBlog, doLikeBlogRequest);
  yield takeLatest(actions.doGetCategoryList, dogetCategoryRequest);
  yield takeLatest(actions.doGetRandomList, doGetRandomRequest);
}
