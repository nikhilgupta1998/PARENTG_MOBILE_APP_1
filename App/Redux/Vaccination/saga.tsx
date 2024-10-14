import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  ADD_VACCINATION,
  EDIT_VACCINATION,
  VACCINATION_IMAGE_ADD,
  VACCINATION_LIST,
} from "../../services/request/ApiPoint";
import { get, patch, post, returnSignUrl } from "../../services/request/request";
import showToast from "../../utils/toast";
import {
  selectCurrentPage,
  selectMonth,
  selectSearchText,
  selectVaccinationForm,
} from "./selectors.";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";
import { VaccinationAddInterface } from "./types";

export function* doGetListRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const page: number = yield select(selectCurrentPage);
    const months: Number = yield select(selectMonth);
    const search: string = yield select(selectSearchText);
    if (page == 1) {
      yield put(actions.setLoading(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
    const response: AxiosResponse = yield get(
      VACCINATION_LIST.concat(
        `?pageSize=5&pageNo=${page}&month=${months}${
          search.length > 0 ? "&search=" + search : ""
        }`
      )
    );
    yield put(actions.setList(response.data.data.results));
    yield put(actions.setStatusCount(response.data.data.statusCount));
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
export function* doAddVaccinationRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const from: VaccinationAddInterface = yield select(selectVaccinationForm);
    // if (from.date.length == 0) {
    //   showToast("please select date");
    //   return;
    // }
    if (from.heightFeet.length == 0) {
      showToast("please enter height in Feet");
      return;
    }
    if (from.heightInch.length == 0) {
      showToast("please enter height in inch");
      return;
    }
    if (from.weight.length == 0) {
      showToast("please enter weight");
      return;
    }
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(ADD_VACCINATION, from);
    if (response && !response.status) {
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
export function* doEditVaccinationRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const from: VaccinationAddInterface = yield select(selectVaccinationForm);
    if (from.image.length == 0) {
      showToast("please upload image");
      return;
    }
    const data = {
      Id:from._id,
      heightFeet: from.heightFeet,
      heightInch: from.heightInch,
      weight: from.weight,
      date: from.date,
      image:from.image,
    };
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield patch(EDIT_VACCINATION, data);
    if (response && !response.status) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
//IMAGE UPLOAD
export function* UploadRequest(action: {
  payload: { data: any; signedUrl: string; result: any; callback: any };
}) {
  yield delay(500);
  try {
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield returnSignUrl(
      action.payload.signedUrl,
      action.payload.data,
      action.payload.result
    );
    if (!response.status) {
      showToast(response.data.message);
      return;
    } else {
    }
    yield call(action?.payload?.callback());
    yield put(actions.setLoading(false));
  } catch (error: any) {
    yield put(actions.setLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doAddImagesRequest(action: {
  payload: { data: any; callback: any };
}) {
  try {
    yield delay(500);
    const data = {
      fileName: action.payload.data,
    };
    yield put(actions.setLoading(true));
    const response: AxiosResponse = yield post(VACCINATION_IMAGE_ADD, data);
    if (!response.status) {
      showToast(response.data.message);
      return;
    }
    yield call(
      action?.payload?.callback(
        response.data.signedUrl,
        response.data.fileNameWithPrefix
      )
    );
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* VaccinationRepoSaga() {
  yield takeLatest(actions.doAddVaccination, doAddVaccinationRequest);
  yield takeLatest(actions.doGetList, doGetListRequest);
  yield takeLatest(actions.doEditVaccination, doEditVaccinationRequest);
  yield takeLatest(actions.UploadeImage, UploadRequest);
  yield takeLatest(actions.doAddImages, doAddImagesRequest);
  yield takeLatest(actions.doAddImages, doAddImagesRequest);
}
