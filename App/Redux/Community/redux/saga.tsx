import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  ACTION_POST,
  GET_BLOG_DETAILS,
  GET_COMMUNITY_DETAILS,
  LIKE_POST,
  POST_COMMENTS_ADD,
  POST_COMMENTS_LIST,
  POST_LIST,
  USER_CREATE_POST,
  USER_CREATE_POST_UPLOAD,
} from "../../../services/request/ApiPoint";
import { get, post, postFile } from "../../../services/request/request";
import showToast from "../../../utils/toast";
import { ActionType, Post, PostCommentsFormInterface } from "../types/types";
import {
  selectCommentCurrentPage,
  selectCurrentPage,
  selectPostCommnetsForm,
  selectPostForm,
} from "./selectors";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";

export function* doGetListRequest() {
  try {
    yield delay(500);
    const page: number = yield select(selectCurrentPage);
    if (page == 1) {
      yield put(actions.setLoadingPostGet(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
    const response: AxiosResponse = yield get(
      POST_LIST.concat(`?pageSize=5&pageNo=${page}`)
    );
    if (page == 1) {
      yield put(actions.setLoadingPostGet(false));
    } else {
      yield put(actions.setMoreLoading(false));
    }
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setPost(response.data.data.results));
    yield put(actions.setListMeta(response.data.data.meta));
  } catch (error: any) {
    yield put(actions.setLoadingPostGet(false));
    yield put(actions.setMoreLoading(false));
    CatchBlockFunction(error);
  }
}
export function* fileUploadRequest(action: {
  payload: { data: any; callback: any };
}) {
  try {
    const data = {
      fileName: action.payload.data,
    };
    yield delay(500);
    yield put(actions.setLoadingPost(true));
    const response: AxiosResponse = yield post(USER_CREATE_POST_UPLOAD, data);
    if (response && !response.data) {
      yield call(action.payload.callback());
      return;
    }
    yield call(
      action?.payload?.callback(
        response.data.signedUrl,
        response.data.fileNameWithPrefix
      )
    );
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}

export function* doAddRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const from: Post = yield select(selectPostForm);
    if (from.title.length == 0) {
      showToast("please enter title");
      return;
    }
    if (from.description.length == 0) {
      showToast("please enter description");
      return;
    }
    if (from.images.length == 0) {
      showToast("please upload image");
      return;
    }
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(USER_CREATE_POST, {
      title: from.title,
      description: from.description,
      images: from.images,
    });
    yield put(actions.setLoading(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoadingPost(false));
    CatchBlockFunction(error);
  }
}
export function* doPostLikeRequest(action: {
  payload: { id: string; like: number; index: number; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setLoadingLike(true));
    const response: AxiosResponse = yield post(LIKE_POST, {
      postId: action.payload.id,
    });

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setLoadingLike(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoadingLike(false));
    CatchBlockFunction(error);
  }
}
export function* doPostActionRequest(action: {
  payload: { id: string; action: ActionType; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setLoadingLike(true));
    const response: AxiosResponse = yield post(ACTION_POST, {
      postId: action.payload.id,
      consent: "",
      actionType: action.payload.action,
    });

    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield put(actions.setLoadingLike(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoadingLike(false));
    CatchBlockFunction(error);
  }
}
export function* doGetPostCommentsRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    const page: number = yield select(selectCommentCurrentPage);
    if (page == 1) {
      yield put(actions.setLoadingComment(true));
    } else {
      yield put(actions.setCommentMoreLoading(true));
    }
    const response: AxiosResponse = yield get(
      POST_COMMENTS_LIST.concat(action.payload.id).concat(
        `?pageSize=10&pageNo=${page}`
      )
    );
    if (page == 1) {
      yield put(actions.setLoadingComment(false));
    } else {
      yield put(actions.setCommentMoreLoading(false));
      yield put(actions.setLoadingComment(false));
    }
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setCommentMeta(response.data.data.meta));
    yield put(actions.setPostComments(response.data.data.results));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoadingComment(false));
    yield put(actions.setCommentMoreLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doPostCommentRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);

    const from: PostCommentsFormInterface = yield select(
      selectPostCommnetsForm
    );
    if (from.comment.length == 0) {
      showToast("Please enter comment");
      return;
    }
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(POST_COMMENTS_ADD, from);
    yield put(actions.setLoading(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGetDetailsRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);

    const response: AxiosResponse = yield get(
      GET_COMMUNITY_DETAILS.concat(action.payload.id)
    );
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setPostDetails(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* PostSaga() {
  yield takeLatest(actions.doGetList, doGetListRequest);
  yield takeLatest(actions.doAdd, doAddRequest);
  yield takeLatest(actions.doGetComment, doGetPostCommentsRequest);
  yield takeLatest(actions.doPostLike, doPostLikeRequest);
  yield takeLatest(actions.doPostAction, doPostActionRequest);

  yield takeLatest(actions.doAddComments, doPostCommentRequest);
  yield takeLatest(actions.doGetDetails, doGetDetailsRequest);
  yield takeLatest(actions.doAddImages, fileUploadRequest);
}
