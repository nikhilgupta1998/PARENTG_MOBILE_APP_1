import { AxiosResponse } from "axios";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  BLOG_LIKE,
  BMI_CALCULATE,
  GET_CHAT_LIST,
  GET_FILTER_DATA,
  GET_FUN_MEALS,
  GET_MEALS,
  GET_MEALS_DETAILS,
  GET_MEAL_CATEGORY,
  GET_MEAL_INGRIDENT,
  GET_PREMIUM_MEAL,
  GET_RANDOM_FUN_MEALS,
  MEAL_BOOKMARK,
  SEND_MESSAGE,
  UPDATE_MEAL_FILTER,
  USER_CREATE_POST_UPLOAD,
} from "../../services/request/ApiPoint";
import { get, post, postFile } from "../../services/request/request";
import showToast from "../../utils/toast";
import {
  selecIngrident,
  selectAllMealsCurrentPage,
  selectBmiCalculateForm,
  selectCurrentPage,
  selectFilterFoodType,
  selectMessage,
  selectRandomData,
  selectSearchText,
  selectfilterCategoryform,
  selectfilterFood,
} from "./selectors.";
import { actions } from "./slice";
import CatchBlockFunction from "components/Catch";
import {
  CalculateBMIInterface,
  TypeEnum,
  filterFoodInterface,
  filterformInterface,
} from "./types";
import { selectProfileForm } from "../Auth/selector";
import { profiledFormInterface } from "../Auth/types";

export function* doCalculateBMIRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const form: CalculateBMIInterface = yield select(selectBmiCalculateForm);
    // if (form.heightFeet.length == 0) {
    //   showToast("please enter height in feet");
    //   return;
    // }
    // if (form.weight.length == 0) {
    //   showToast("please enter weight");
    //   return;
    // }
    yield put(actions.setBmiLoader(true));
    const response: AxiosResponse = yield post(BMI_CALCULATE, form);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(
      actions.updateBMIFormFormValue({
        key: "BMI",
        value: response.data.data.bmi,
      })
    );
    yield put(actions.setBmiLoader(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setBmiLoader(false));
    CatchBlockFunction(error);
  }
}

export function* doGetListRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const form: filterFoodInterface = yield select(selectfilterFood);
    const data = {
      mealType: form.MealType,
      recipeType: form.MealRecipe,
      date: form.Date,
      type: form.Type,
    };

    const search: string = yield select(selectSearchText);
    yield put(actions.setMealLoader(true));
    const response: AxiosResponse = yield post(
      GET_MEALS.concat(
        `?pageNo=${1}&pageSize=${10}${
          search.length > 0 ? "&search=" + search : ""
        }`
      ),
      data
    );
    yield put(actions.setList(response.data.data));
    yield put(actions.setMealLoader(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setMealLoader(false));
    CatchBlockFunction(error);
  }
}
export function* doGetDetailsRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setMealDetailLoader(true));
    const response: AxiosResponse = yield get(
      GET_MEALS_DETAILS.concat(`/${action.payload.id}`)
    );
    yield put(actions.setMealsDetails(response.data.data));
    yield put(actions.setMealDetailLoader(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setMealDetailLoader(false));
    CatchBlockFunction(error);
  }
}

export function* doGetFunFoodListRequest(action: {
  payload: { callback: any };
}) {
  const form: TypeEnum = yield select(selectFilterFoodType);
  yield put(actions.setFuFoodMealLoader(true));
  const search: number = yield select(selectSearchText);
  try {
    yield delay(500);
    const page: number = yield select(selectCurrentPage);
    if (page == 1) {
      yield put(actions.setFuFoodMealLoader(true));
    } else {
      yield put(actions.setMoreLoading(true));
    }
    const response: AxiosResponse = yield get(
      GET_FUN_MEALS.concat(
        `?pageSize=5&pageNo=${page}&type=${form}&search=${search}`
      )
    );
    yield put(actions.setFunFoodMealsList(response.data.data.results));
    yield put(actions.setListMeta(response.data.data.meta));
    if (page == 1) {
      yield put(actions.setFuFoodMealLoader(false));
    } else {
      yield put(actions.setMoreLoading(false));
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setFuFoodMealLoader(false));
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

export function* doGetCategoryListRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const response: AxiosResponse = yield get(GET_MEAL_CATEGORY);
    yield put(actions.setCategoryList(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doGetIngredientListRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const response: AxiosResponse = yield get(GET_MEAL_INGRIDENT);
    yield put(actions.setIngridentList(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* doSendMessageRequest(action: {
  payload: { id: string; callback: any };
}) {
  yield put(actions.setChatLoader(true));
  const form: profiledFormInterface = yield select(selectProfileForm);
  const message: string = yield select(selectMessage);
  const data = {
    userId: form._id,
    mealId: "",
    message: message,
  };
  try {
    yield delay(500);
    const response: AxiosResponse = yield post(SEND_MESSAGE, data);
    yield put(actions.setChatLoader(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setChatLoader(false));
    CatchBlockFunction(error);
  }
}
export function* doGetChatListRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setChatListLoader(true));
    const response: AxiosResponse = yield get(
      GET_CHAT_LIST.concat(
        `?pageNo=${1}&pageSize=${10}&mealId=${action.payload.id}`
      )
    );
    yield put(actions.setchatList(response.data.data.results));
    yield put(actions.setChatListLoader(false));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setChatListLoader(false));
    CatchBlockFunction(error);
  }
}

export function* doSendFilterRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const form: filterformInterface = yield select(selectfilterCategoryform);
    const ingrident: [] = yield select(selecIngrident);
    const data = {
      breakfast: form.breakfast,
      lunch: form.lunch,
      snack: form.snack,
      dinner: form.dinner,
      ingredients: ingrident,
    };
    yield put(actions.setMealLoader(true));
    const response: AxiosResponse = yield post(UPDATE_MEAL_FILTER, data);
    yield put(actions.setMealLoader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setMealLoader(false));
    CatchBlockFunction(error);
  }
}
export function* doGetFiterDataRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const response: AxiosResponse = yield get(GET_FILTER_DATA);
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    if (response.data.data.length > 0) {
      yield put(
        actions.updateFilterFormValue({
          key: "breakfast",
          value: response.data.data[0].breakfast,
        })
      );
      yield put(
        actions.updateFilterFormValue({
          key: "lunch",
          value: response.data.data[0].lunch,
        })
      );
      yield put(
        actions.updateFilterFormValue({
          key: "snack",
          value: response.data.data[0].snack,
        })
      );
      yield put(
        actions.updateFilterFormValue({
          key: "dinner",
          value: response.data.data[0].dinner,
        })
      );
      yield put(actions.setIngrident(response.data.data[0].ingredients));
    }

    yield call(action.payload.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}

//fun Food Details
export function* doGetFunFoodDetailsRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setMealDetailLoader(true));
    const response: AxiosResponse = yield get(
      GET_MEALS_DETAILS.concat(`/${action.payload.id}`)
    );
    yield put(actions.setMealDetailLoader(false));
    yield put(
      actions.setMealsFunFoodDetails(
        response.data.data ? response.data.data : []
      )
    );
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setMealDetailLoader(false));
    CatchBlockFunction(error);
  }
}
export function* doGetALlMealListRequest(action: {
  payload: { type: number; mealType: number; bookMark: boolean; callback: any };
}) {
  try {
    yield delay(500);
    const page: number = yield select(selectAllMealsCurrentPage);
    const search: number = yield select(selectSearchText);
    if (page == 1) {
      yield put(actions.setPremiumMealLoader(true));
    } else {
      yield put(actions.setAllMealsMoreLoading(true));
    }
    const response: AxiosResponse = yield get(
      GET_PREMIUM_MEAL.concat(
        `?mealType=${action.payload.mealType}&type=${
          action.payload.type
        }&pageNo=${page}&search=${search}&bookmark=${
          action.payload.bookMark == false ? 0 : 1
        }`
      )
    );
    yield put(actions.setAllMealsMeta(response.data.data.meta));
    yield put(actions.setAllMealList(response.data.data.results));
    if (page == 1) {
      yield put(actions.setPremiumMealLoader(false));
    } else {
      yield put(actions.setAllMealsMoreLoading(false));
    }
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setPremiumMealLoader(false));
    CatchBlockFunction(error);
  }
}
export function* doGetRandomFunFoodListRequest(action: {
  payload: { callback: any };
}) {
  const form: TypeEnum = yield select(selectFilterFoodType);
  yield put(actions.setFuFoodMealLoader(true));
  const search: number = yield select(selectSearchText);
  const page: number = yield select(selectCurrentPage);
  try {
    yield delay(500);

    const items: any[] = yield select(selectRandomData);
    const indexItem = items.findIndex((x) => x.id == form);

    if (indexItem !== -1) {
      if (items[indexItem].item.length > 0) {
        yield call(action.payload.callback());
        return;
      }
    }

    const response: AxiosResponse = yield get(
      GET_RANDOM_FUN_MEALS.concat(
        `?pageSize=20&pageNo=${page}&type=${form}&search=${search}`
      )
    );
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setRandomData(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setFuFoodMealLoader(false));
    CatchBlockFunction(error);
  }
}
export function* doAddBookmarkRequest(action: {
  payload: { id: string; bookmark: number; callback: any };
}) {
  try {
    const response: AxiosResponse = yield post(MEAL_BOOKMARK, {
      mealId: action.payload.id,
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
export function* MealsRepoSaga() {
  yield takeLatest(actions.doCalculateBMI, doCalculateBMIRequest);
  yield takeLatest(actions.doGetList, doGetListRequest);
  yield takeLatest(actions.doGetFunFoodList, doGetFunFoodListRequest);
  yield takeLatest(actions.doSendFilter, doSendFilterRequest); // look
  yield takeLatest(actions.doGetDetails, doGetDetailsRequest);
  yield takeLatest(actions.doLikeBlog, doLikeBlogRequest);
  yield takeLatest(actions.doGetCategoryList, doGetCategoryListRequest);
  yield takeLatest(actions.dogetIngredient, doGetIngredientListRequest);
  yield takeLatest(actions.doSendMessage, doSendMessageRequest);
  yield takeLatest(actions.doGetChatList, doGetChatListRequest);
  yield takeLatest(actions.doGetFilterData, doGetFiterDataRequest);
  //fun Food Details
  yield takeLatest(actions.doGetFunFoodDetails, doGetFunFoodDetailsRequest);
  yield takeLatest(actions.doGetRandomList, doGetRandomFunFoodListRequest);
  yield takeLatest(actions.doGetALlMealList, doGetALlMealListRequest);
  yield takeLatest(actions.doAddBookmark, doAddBookmarkRequest);
}
