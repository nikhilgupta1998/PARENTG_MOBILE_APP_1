import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import {
  selectChildForm,
  selectForgotPasswordEmail,
  selectGoogleLoginSetHash,
  selectHash,
  selectLoginForm,
  selectOTPForm,
  selectParentForm,
  selectProfileForm,
  selectSignUp,
  selectToken,
  selectupdatePasswordForm,
} from "./selector";
import {
  GenderEnum,
  GoogleLoginHashInterface,
  LoginFrom,
  OTPInterface,
  UserSendEmailInterface,
  UserSocialTypeEnum,
  childFormInterface,
  profiledFormInterface,
  signUpFormInterface,
  updatePasswordInterface,
} from "./types";
import { actions } from "./slice";
import {
  ADD_PARENT,
  AUTHCHECK,
  CHECK,
  CHILD_IMAGE_ADD,
  CREATE_CHILD,
  CREATE_PROFILE,
  DELETE_ACCOUNT,
  DELETE_CHILD,
  DELETE_PARENT,
  FAMILY_MOBILE_VERIFICATION,
  GETOTP,
  GET_CHILD_BYID,
  GET_CHILD_LIST,
  GET_PARENTS_LIST,
  GET_PARENT_BYID,
  GET_TUTORIAL,
  LOGINWITHPASSWORD,
  LOGIN_WITH_GOOGLE,
  ME,
  MOBILE_VERIFICATION,
  PARENT_IMAGE_ADD,
  SEND_EMAIL,
  SEND_EMAIL_CODE,
  SIGNUP,
  UPDATE_CHILD,
  UPDATE_GOOGL_LOGIN_MOBILE,
  UPDATE_LOGIN_PASSWORD,
  UPDATE_PARENT,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
  USER_IMAGE_ADD,
} from "../../services/request/ApiPoint";
import {
  patch,
  get,
  post,
  put as putAPI,
  put as PUT,
  putWithId,
  getWithID,
  deleteCall,
  returnSignUrl,
} from "../../services/request/request";
import CatchBlockFunction from "components/Catch";
import { removeValue, setStringValue } from "../../utils/local-storage";
import showToast from "utils/toast";
import ActionSheet from "react-native-actions-sheet";
export function* CheckOTPVerificationRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const OTP: OTPInterface = yield select(selectOTPForm);
    const form: LoginFrom = yield select(selectLoginForm);
    const hash: string = yield select(selectHash);
    if (!OTP.otp || OTP.otp?.length == 0) {
      showToast("please enter OTP");
      return;
    }
    const data = {
      mobileNumber: form.mobileNumber,
      countryCode: form.countryCode,
      otp: OTP.otp,
      hash: hash,
    };
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(MOBILE_VERIFICATION, data);
    yield put(actions.setloader(false));
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }

    showToast(response.data.message);
    if (response.data.data.hash) {
      //if New user
      yield put(actions.setHash(response.data.data.hash));
      yield call(action?.payload?.callback(true, false));
      //
    } else if (response.data.data.accessToken) {
      // if Old User
      yield put(actions.setUpdateTocken(response.data.data.accessToken));

      yield call(
        action?.payload?.callback(false, response.data.data.profileCompleted)
      );
    }
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* loginRequest(action: { payload: { callback: any } }) {
  yield delay(500);

  const form: LoginFrom = yield select(selectLoginForm);
  if (!form.mobileNumber || form.mobileNumber?.length == 0) {
    showToast("please enter Mobile Number");
    return;
  }
  const data = {
    mobileNumber: form.mobileNumber,
    countryCode: form.countryCode,
  };

  try {
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(AUTHCHECK, data);
    yield put(actions.setloader(false));
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    if (response.data.status == true) {
      yield put(actions.setHash(response.data.data.hash));
      yield call(action.payload.callback(response.data.status));
    } else {
      yield call(action.payload.callback(response.data.status));
    }
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* SignupRequest(action: { payload: { callback: any } }) {
  yield delay(500);
  const form: signUpFormInterface = yield select(selectSignUp);
  if (!form.name.value || form.name?.value?.length == 0) {
    showToast("please enter name");
    return;
  }
  if (!form.email.value || form.email?.value?.length == 0) {
    showToast("please enter email");
    return;
  }
  if (!form.phone || form.phone?.value?.length == 0) {
    showToast("please enter Mobile Number");
    return;
  }
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
  };

  try {
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(SIGNUP, data);
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield call(action.payload.callback(response.data.status));
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* CreatePasswordRequest(action: { payload: { callback: any } }) {
  try {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/;
    yield delay(500);
    const form: updatePasswordInterface = yield select(
      selectupdatePasswordForm
    );
    const hash: string = yield select(selectHash);
    if (!form.password || form.password?.length == 0) {
      showToast("Please Enter Password");
      return;
    }
    if (form.password.length > 0) {
      if (!regex.test(form.password)) {
        showToast("Password Must be a Strong");
        return;
      }
    }
    if (!form.confirmPassword || form.confirmPassword?.length == 0) {
      showToast("Please Enter Confirm Password");
      return;
    }
    if (form.confirmPassword.length > 0) {
      if (!regex.test(form.confirmPassword)) {
        showToast("Enter Valid Confirm Password");
        return;
      }
    }
    const data = {
      password: form.password,
      confirmPassword: form.confirmPassword,
      hash: hash,
    };
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield PUT(UPDATE_LOGIN_PASSWORD, data);
    yield put(actions.setloader(false));
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setUpdateTocken(response.data.accessToken));

    yield call(action?.payload?.callback(response.data.status));
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}

export function* CreateChildRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const form: childFormInterface = yield select(selectChildForm);
    if (!form.name || form.name?.length == 0) {
      showToast("please enter name");
      return;
    }
    if (!form.weekOfGestation || form.weekOfGestation?.length == 0) {
      showToast("please enter week Of Gestation");
      return;
    }
    if (!form.dob || form.dob?.length == 0) {
      showToast("please enter DOB");
      return;
    }
    if (
      !form.profilePic ||
      form.profilePic?.length == 0 ||
      form.profilePic == null ||
      form.profilePic == "null"
    ) {
      showToast("please Upload Image");
      return;
    }
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(CREATE_CHILD, form);
    yield put(actions.setloader(false));
    yield call(action?.payload?.callback());
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield put(actions.clearChildForm());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* gethildByIdRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield getWithID(
      GET_CHILD_BYID,
      action.payload.id
    );
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setChildForm(response.data.data));
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* getChildListRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield get(GET_CHILD_LIST);
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setChildList(response.data.data));
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* CreateProfileRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const form: profiledFormInterface = yield select(selectProfileForm);
    if (!form.name || form.name?.length == 0) {
      showToast("please enter name");
      return;
    }
    if (!form.email || form.email?.length == 0) {
      showToast("please enter email");
      return;
    }

    if (
      !form.profilePic ||
      form.profilePic?.length == 0 ||
      form.profilePic == null ||
      form.profilePic == "null"
    ) {
      showToast("please Upload Image");
      return;
    }
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(CREATE_PROFILE, form);

    // console.log(response , "response");

    yield put(actions.setloader(false));
    yield call(action?.payload?.callback());
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield put(actions.clearProfileForm());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* UpdateChildRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const form: childFormInterface = yield select(selectChildForm);
    if (!form.name || form.name?.length == 0) {
      showToast("please enter name");
      return;
    }
    if (!form.weekOfGestation || form.weekOfGestation?.length == 0) {
      showToast("please enter week Of Gestation");
      return;
    }

    if (!form.dob || form.dob?.length == 0) {
      showToast("please enter DOB");
      return;
    }
    if (
      !form.profilePic ||
      form.profilePic?.length == 0 ||
      form.profilePic == null ||
      form.profilePic == "null"
    ) {
      showToast("please Upload Image");
      return;
    }
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield putWithId(UPDATE_CHILD, form);
    yield put(actions.setloader(false));
    if (response && !response.data.statusCode) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield put(actions.clearChildForm());
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* UpdateProfileRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const form: profiledFormInterface = yield select(selectProfileForm);
    if (!form.name || form.name?.length == 0) {
      showToast("please enter name");
      return;
    }
    if (!form.email || form.email?.length == 0) {
      showToast("please enter email");
      return;
    }
    if (!form.dob || form.dob?.length == 0) {
      showToast("please enter DOB");
      return;
    }
    if (
      !form.profilePic ||
      form.profilePic?.length == 0 ||
      form.profilePic == null ||
      form.profilePic == "null"
    ) {
      showToast("please Upload Image");
      return;
    }
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield putAPI(UPDATE_PROFILE, form);
    yield put(actions.setloader(false));
    if (response && !response.data.statusCode) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* deleteChildRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield deleteCall(
      DELETE_CHILD,
      action.payload.id
    );
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* fileSignUpUploadRequest(action: {
  payload: { data: any; callback: any };
}) {
  try {
    const data = {
      fileName: action.payload.data,
    };
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(CHILD_IMAGE_ADD, data);
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
    // yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* fileUserUploadRequest(action: {
  payload: { data: any; callback: any };
}) {
  try {
    const data = {
      fileName: action.payload.data,
    };
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(USER_IMAGE_ADD, data);
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
    // yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* UploadRequest(action: {
  payload: { data: any; signedUrl: string; result: any; callback: any };
}) {
  yield delay(500);
  try {
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield returnSignUrl(
      action.payload.signedUrl,
      action.payload.data,
      action.payload.result
    );
    if (!response.status) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setloader(false));
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* AddParentequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);

    const form: profiledFormInterface = yield select(selectParentForm);
    if (!form.name || form.name?.length == 0) {
      showToast("please enter name");
      return;
    }
    if (!form.email || form.email?.length == 0) {
      showToast("please enter email");
      return;
    }

    if (!form.dob || form.dob?.length == 0) {
      showToast("please enter DOB");
      return;
    }
    if (
      !form.profilePic ||
      form.profilePic?.length == 0 ||
      form.profilePic == null ||
      form.profilePic == "null"
    ) {
      showToast("please Upload Image");
      return;
    }
    if (!form.relation || form.relation?.length == 0) {
      showToast("please select relation");
      return;
    }
    if (!form.mobileNumber || form.mobileNumber?.length == 0) {
      showToast("please enter Mobile Number");
      return;
    }
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(ADD_PARENT, form);
    yield put(actions.setloader(false));
    yield call(action?.payload?.callback());
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield put(actions.clearParentForm());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}

export function* fileSignUpUploadParentRequest(action: {
  payload: { data: any; callback: any };
}) {
  try {
    const data = {
      fileName: action.payload.data,
    };
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(PARENT_IMAGE_ADD, data);
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
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* getParentListRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield get(GET_PARENTS_LIST);
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setParentList(response.data.data));
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* getParentByIdRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield getWithID(
      GET_PARENT_BYID,
      action.payload.id
    );
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setParentForm(response.data.data));
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* deleteParentRequest(action: {
  payload: { id: string; callback: any };
}) {
  try {
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield deleteCall(
      DELETE_PARENT,
      action.payload.id
    );
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* UpdateParentRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const form: profiledFormInterface = yield select(selectParentForm);
    if (!form.name || form.name?.length == 0) {
      showToast("please enter name");
      return;
    }
    if (!form.email || form.email?.length == 0) {
      showToast("please enter email");
      return;
    }

    if (!form.dob || form.dob?.length == 0) {
      showToast("please enter DOB");
      return;
    }
    if (!form.relation || form.relation?.length == 0) {
      showToast("please select relation");
      return;
    }
    if (!form.mobileNumber || form.mobileNumber?.length == 0) {
      showToast("please enter Mobile Number");
      return;
    }
    if (
      !form.profilePic ||
      form.profilePic?.length == 0 ||
      form.profilePic == null ||
      form.profilePic == "null"
    ) {
      showToast("please Upload Image");
      return;
    }
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield putWithId(UPDATE_PARENT, form);
    yield put(actions.setloader(false));
    if (response && !response.data.statusCode) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield put(actions.clearParentForm());
    yield call(action?.payload?.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}

export function* getOtpRequest(action: {
  payload: { mobileNumber: string; countryCode: string; callback: any };
}) {
  yield delay(500);
  if (
    !action.payload.mobileNumber ||
    action.payload.mobileNumber?.length == 0
  ) {
    showToast("please enter Mobile Number");
    return;
  }
  const data = {
    mobileNumber: action.payload.mobileNumber,
    countryCode: action.payload.countryCode,
  };
  try {
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(GETOTP, data);
    yield put(actions.setloader(false));
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    if (response.data.status == true) {
      yield put(actions.setHash(response.data.data.hash));
      yield call(action.payload.callback(response.data.mobileExist));
      yield put(actions.setloader(false));
    } else {
      return;
    }
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* OTPVerificationRequest(action: {
  payload: { OTP: string; callback: any };
}) {
  yield delay(500);
  yield put(actions.setloader(true));
  const hash: string = yield select(selectHash);
  const mobileNumber: profiledFormInterface = yield select(selectParentForm);
  if (!action.payload.OTP || action.payload.OTP?.length == 0) {
    showToast("please enter OTP");
    return;
  }
  const data = {
    mobileNumber: mobileNumber.mobileNumber,
    otp: action.payload.OTP,
    hash: hash,
  };

  try {
    const response: AxiosResponse = yield post(
      FAMILY_MOBILE_VERIFICATION,
      data
    );
    yield put(actions.setloader(false));
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    showToast(response.data.message);
    yield call(action?.payload?.callback(response.data.status));
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* meRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);
    const response: AxiosResponse = yield get(ME);
    console.log("status");

    yield put(actions.setisLogin(false));
    yield put(actions.setprofileForm(response.data.data[0]));
    yield put(actions.setPlanData(response.data.data[0]?.plan));
    yield call(
      action.payload.callback(
        true,
        response.data.data[0].profileCompleted,
        response.data.data[0].childAdded
      )
    );
  } catch (error: any) {
    yield put(actions.setisLogin(false));
    if (error.response?.status == 404) {
      yield call(action.payload.callback(false, false, false));
    }

    CatchBlockFunction(error);
  }
}
export function* userLikeRequestFetch() {
  try {
    yield 500;
    const response: AxiosResponse = yield get(ME);
    yield put(actions.setprofileForm(response.data.data[0]));
    yield put(actions.setPlanData(response.data.data[0]?.plan));
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* UserCheckRequest(action: { payload: { callback: any } }) {
  yield delay(500);
  const form: LoginFrom = yield select(selectLoginForm);
  if (!form.mobileNumber || form.mobileNumber?.length == 0) {
    showToast("please enter Mobile Number");
    return;
  }

  const data = {
    mobileNumber: form.mobileNumber,
    countryCode: form.countryCode,
  };
  try {
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(CHECK, data);
    yield call(action.payload.callback(response.data.data.existUser));
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* LoginWIthPasswordRequest(action: {
  payload: { callback: any };
}) {
  yield delay(500);
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/;
  const form: LoginFrom = yield select(selectLoginForm);
  if (!form.mobileNumber || form.mobileNumber?.length == 0) {
    showToast("please enter Mobile Number");
    return;
  }
  if (form.password.length > 0) {
    if (!regex.test(form.password)) {
      showToast("Enter Valid Password");
      return;
    }
  }
  const data = {
    mobileNumber: form.mobileNumber,
    countryCode: form.countryCode,
    password: form.password,
  };
  try {
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(LOGINWITHPASSWORD, data);
    yield put(actions.setloader(false));
    yield put(actions.setUpdateTocken(response.data.data.accessToken));
    yield call(
      action?.payload?.callback(false, response.data.data.profileCompleted)
    );
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}

export function* doLoginWithGoogleRequest(action: {
  payload: {
    name?: string | null;
    googleId: string;
    email: string;
    googlePhoto?: string | null;
    identityToken: string | null;
    socialType: UserSocialTypeEnum;
    callback: any;
  };
}) {
  try {
    const data = {
      name: action.payload.name,
      googleId: action.payload.googleId,
      email: action.payload.email,
      googlePhoto: action.payload.googlePhoto,
      socialType: action.payload.socialType,
      identityToken: action.payload.identityToken,
    };
    console.log("data", data);
    yield put(actions.setGoogleLoading(true));
    const response: AxiosResponse = yield post(LOGIN_WITH_GOOGLE, data);
    yield put(actions.setGoogleLoading(false));
    if (response && !response.status) {
      showToast(response.data.message);
      return;
    }
    if (
      response.data.data.status == false &&
      response.data.data.data?.googleHash
    ) {
      yield put(actions.setGoogleHash(response.data.data.data));
      yield call(action.payload.callback(response.data.data.status, false));
    } else if (
      response.data.data?.accessToken &&
      response.data.data.status == true
    ) {
      yield put(actions.setUpdateTocken(response.data.data.accessToken));
      yield call(
        action.payload.callback(
          response.data.data.status,
          response.data.data.profileCompleted
        )
      );
    }
  } catch (error: any) {
    yield put(actions.setGoogleLoading(false));
    CatchBlockFunction(error);
  }
}
export function* doGoogleLoginMobileNumberUpdateRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const form: LoginFrom = yield select(selectLoginForm);

    const hash: GoogleLoginHashInterface = yield select(
      selectGoogleLoginSetHash
    );
    const data = {
      mobileNumber: form.mobileNumber,
      countryCode: form.countryCode,
      hash: hash.googleHash,
    };
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield PUT(UPDATE_GOOGL_LOGIN_MOBILE, data);
    yield put(actions.setloader(false));
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setUpdateTocken(response.data.accessToken));

    yield call(
      action?.payload?.callback(
        response.data.status,
        response.data.profileCompleted
      )
    );
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
//do Update Password
export function* doUpdatePasswordRequest(action: {
  payload: { callback: any };
}) {
  try {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/;
    yield delay(500);
    const form: updatePasswordInterface = yield select(
      selectupdatePasswordForm
    );
    if (!form.password || form.password?.length == 0) {
      showToast("Please Enter Password");
      return;
    }
    if (form.password.length > 0) {
      if (!regex.test(form.password)) {
        showToast("Password Must be a Strong");
        return;
      }
    }
    if (!form.confirmPassword || form.confirmPassword?.length == 0) {
      showToast("Please Enter Confirm Password");
      return;
    }
    if (form.confirmPassword.length > 0) {
      if (!regex.test(form.confirmPassword)) {
        showToast("Enter Valid Confirm Password");
        return;
      }
    }
    const data = {
      password: form.password,
      confirmPassword: form.confirmPassword,
    };
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield patch(UPDATE_PASSWORD, data);
    yield put(actions.setloader(false));
    if (response && !response.status) {
      showToast(response.data.message);
      return;
    }

    showToast(response.data.message);
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}

export function* doSendForgotPasswordEmailRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const form: UserSendEmailInterface = yield select(
      selectForgotPasswordEmail
    );
    if (!form.mobileNumber || form.mobileNumber?.length == 0) {
      showToast("Please Enter mobile Number");
      return;
    }
    const data = {
      mobileNumber: form.mobileNumber,
      countryCode: form.countryCode,
    };

    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(SEND_EMAIL, data);
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setEmailHashCode(response.data.data.hash));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* doSendForgotPasswordEmailCodeRequest(action: {
  payload: { callback: any };
}) {
  try {
    yield delay(500);
    const form: UserSendEmailInterface = yield select(
      selectForgotPasswordEmail
    );
    const data = {
      hash: form.hash,
      code: form.code,
    };
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield post(SEND_EMAIL_CODE, data);
    yield put(actions.setloader(false));
    if (response && !response.data.status) {
      showToast(response.data.message);
      return;
    }
    yield put(actions.setUpdateTocken(response.data.data));
    yield call(action.payload.callback());
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}
export function* getTutorialRequest() {
  try {
    yield delay(500);
    yield put(actions.setloader(true));
    const response: AxiosResponse = yield get("/admin/setting/get");
    yield put(actions.setloader(false));
    if (response && !response.data) {
      showToast(response.data.message);
      return;
    }

    yield put(actions.setTutorial(response.data.data[0]?.tutorial));
  } catch (error: any) {
    yield put(actions.setloader(false));
    CatchBlockFunction(error);
  }
}

export function* deleteAccountRequest(action: { payload: { callback: any } }) {
  try {
    yield delay(500);    
    const response: AxiosResponse = yield putAPI(DELETE_ACCOUNT,{});
    yield put(actions.setisLogin(false));
    removeValue("@token");
    yield call(action?.payload?.callback());
  } catch (error: any) {
    CatchBlockFunction(error);
  }
}
export function* AuthLoginRepoSaga() {
  yield takeLatest(actions.UploadeImage, UploadRequest);
  yield takeLatest(actions.childAddImages, fileSignUpUploadRequest);
  yield takeLatest(actions.userAddImages, fileUserUploadRequest);
  yield takeLatest(actions.OTPVerification, CheckOTPVerificationRequest);
  yield takeLatest(actions.doLogin, loginRequest);
  yield takeLatest(actions.doCheckUser, UserCheckRequest);
  yield takeLatest(actions.doSignup, SignupRequest);
  yield takeLatest(actions.doCreatePassword, CreatePasswordRequest);
  yield takeLatest(actions.doCreateChild, CreateChildRequest);
  yield takeLatest(actions.getChildById, gethildByIdRequest);
  yield takeLatest(actions.doupdateChild, UpdateChildRequest);
  yield takeLatest(actions.doUpdateProfile, UpdateProfileRequest);
  yield takeLatest(actions.doupdateParent, UpdateParentRequest);
  yield takeLatest(actions.doGetChildList, getChildListRequest);
  yield takeLatest(actions.doCreateProfile, CreateProfileRequest);
  yield takeLatest(actions.doAddParent, AddParentequest);
  yield takeLatest(actions.deleteChild, deleteChildRequest);
  yield takeLatest(actions.deleteParent, deleteParentRequest);
  yield takeLatest(actions.AddImagesParent, fileSignUpUploadParentRequest);
  yield takeLatest(actions.doGetParentList, getParentListRequest);
  yield takeLatest(actions.getParentById, getParentByIdRequest);
  yield takeLatest(actions.getOtp, getOtpRequest);
  yield takeLatest(actions.verifiedOtp, OTPVerificationRequest);
  yield takeLatest(actions.getMeRequest, meRequest);
  yield takeLatest(actions.getMeRequestSecond, userLikeRequestFetch);
  yield takeLatest(actions.doLoginWithPassword, LoginWIthPasswordRequest);

  //google login
  yield takeLatest(actions.doLoginWithGoogle, doLoginWithGoogleRequest);
  yield takeLatest(
    actions.doGoogleLoginMobileNumberUpdate,
    doGoogleLoginMobileNumberUpdateRequest
  );

  //do update password
  yield takeLatest(actions.doUpdatePassword, doUpdatePasswordRequest);
  yield takeLatest(
    actions.doSendForgotPasswordEmail,
    doSendForgotPasswordEmailRequest
  );
  yield takeLatest(
    actions.doSendForgotPasswordCode,
    doSendForgotPasswordEmailCodeRequest
  );

  // tutorial
  yield takeLatest(actions.getTutorial, getTutorialRequest);
  yield takeLatest(actions.doDeleteAccount, deleteAccountRequest);
}
