import { set } from "lodash";
import { initialState } from "./types/initialState";
import { createSlice } from "../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  GoogleLoginHashInterface,
  UserSocialTypeEnum,
  childFormInterface,
  profiledFormInterface,
} from "./types";
import { removeValue, setStringValue } from "../../utils/local-storage";

export const useClinicSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setUpdateTocken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      setStringValue("@token", action.payload);
      // console.log(action.payload, "action.payloadtoken");
    },
    clearOtpForm: (state) => {
      state.OTPForm.otp = "";
    },
    clearProfileForm: (state) => {
      state.profileForm._id = "";
      state.profileForm.country = "";
      state.profileForm.dob = "";
      state.profileForm.email = "";
      state.profileForm.name = "";
      state.profileForm.gender = 1;
      state.profileForm.relation = "";
      state.profileForm.mobileNumber = "";
      state.profileForm.otp = "";
      state.profileForm.profilePic = "";
    },
    clearParentForm: (state) => {
      state.ParentForm._id = "";
      state.ParentForm.country = "";
      state.ParentForm.dob = "";
      state.ParentForm.email = "";
      state.ParentForm.name = "";
      state.ParentForm.gender = 1;
      state.ParentForm.relation = "";
      state.ParentForm.mobileNumber = "";
      state.ParentForm.otp = "";
      state.ParentForm.profilePic = "";
      state.ParentForm.isMobileNumberValid = false;
      state.ParentForm.mobileVerify = false;
      state.ParentForm.countryCode = "";
      state.ParentForm.mobileNumber = "";
      state.ParentForm.mobileNumberCheck = "";
      state.ParentForm.childAdded = false;
      state.ParentForm.emailVerified = false;
      state.ParentForm.profileCompleted = false;
    },
    clearChildForm: (state) => {
      state.childForm._id = "";
      state.childForm.weekOfGestation = "";
      state.childForm.dob = "";
      state.childForm.gender = 1;
      state.childForm.name = "";
      state.childForm.profilePic = "";
    },
    setDeviceTocken: (state, action: PayloadAction<string>) => {
      state.deviceToken = action.payload;
    },
    setTutorial: (state, action: PayloadAction<string>) => {
      state.tutorial = action.payload;
    },
    getTutorial: (state) => {},
    setNetWorkState: (state, action: PayloadAction<boolean>) => {
      state.netWorkState = action.payload;
    },
    setChildList: (state, action: PayloadAction<Array<childFormInterface>>) => {
      state.childList = action.payload;
    },
    setParentList: (
      state,
      action: PayloadAction<Array<profiledFormInterface>>
    ) => {
      state.ParentList = action.payload;
    },
    setProfileList: (
      state,
      action: PayloadAction<Array<profiledFormInterface>>
    ) => {
      state.profileList = action.payload;
    },
    setChildForm: (state, action: PayloadAction<childFormInterface>) => {
      state.childForm = action.payload;
    },
    setParentForm: (state, action: PayloadAction<profiledFormInterface>) => {
      state.ParentForm = action.payload;
    },
    setprofileForm: (state, action: PayloadAction<profiledFormInterface>) => {
      state.profileForm = action.payload;
    },
    setPlanData: (state, action: PayloadAction<{}>) => {
      state.plan = action.payload;
    },
    setTrackingStatus: (state, action: PayloadAction<boolean>) => {
      state.trackingStatus = action.payload;
    },
    setLocationStatus: (state, action: PayloadAction<boolean>) => {
      state.locationStatus = action.payload;
    },
    setTrackerStatus: (state, action: PayloadAction<boolean>) => {
      state.trackerInitlized = action.payload;
    },
    setisLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setHash: (state, action: PayloadAction<string>) => {
      state.hash = action.payload;
    },
    setloader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    setGoogleLoading: (state, action: PayloadAction<boolean>) => {
      state.googleLoading = action.payload;
    },
    addProfilePhoto: (
      state,
      action: PayloadAction<{ data: any; callback: () => void }>
    ) => {},
    OTPVerification: (
      state,
      action: PayloadAction<{
        callback: (check: any, profileCompleted: boolean) => void;
      }>
    ) => {},
    updateLoginFormValue: (
      state,
      action: PayloadAction<{ key: any; value: any }>
    ) => {
      set(state, `loginFrom.${action.payload.key}`, action.payload.value);
    },
    clearLoginFromForm: (state) => {
      state.loginFrom.password = "";
    },
    updateOTPFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `OTPForm.${action.payload.key}`, action.payload.value);
    },
    updateChildFormFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `childForm.${action.payload.key}`, action.payload.value);
    },
    updateProfileFormFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `profileForm.${action.payload.key}`, action.payload.value);
    },
    updateParentFormFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `ParentForm.${action.payload.key}`, action.payload.value);
    },
    updatePasswordFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(state, `updatePassword.${action.payload.key}`, action.payload.value);
    },
    updateSignFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(
        state,
        `signUpForm.${action.payload.key}.value`,
        action.payload.value
      );
    },
    doLogin: (
      state,
      action: PayloadAction<{ callback: (check: boolean) => void }>
    ) => {},
    doCheckUser: (
      state,
      action: PayloadAction<{ callback: (check: boolean) => void }>
    ) => {},
    doLoginWithPassword: (
      state,
      action: PayloadAction<{
        callback: (check: boolean, profileCompleted: boolean) => void;
      }>
    ) => {},
    doGetChildList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doGetParentList: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doCreateChild: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doCreateProfile: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doLogout: (state) => {
      removeValue("@token");
      state.isLogin = false;
    },
    doDeleteAccount: (state, action: PayloadAction<{ callback: () => void }>) => {},
    doAddParent: (state, action: PayloadAction<{ callback: () => void }>) => {},
    getChildById: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    getParentById: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    deleteChild: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    deleteParent: (
      state,
      action: PayloadAction<{ id: string; callback: () => void }>
    ) => {},
    doupdateChild: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doUpdateProfile: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doupdateParent: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doCreatePassword: (
      state,
      action: PayloadAction<{ callback: (check: boolean) => void }>
    ) => {},
    doSignup: (
      state,
      action: PayloadAction<{ callback: (check: boolean) => void }>
    ) => {},
    AddDocument: (
      state,
      action: PayloadAction<{ callback: (check: any) => void }>
    ) => {},
    UploadeImage: (
      state,
      action: PayloadAction<{
        data: any;
        signedUrl: string;
        result: any;
        callback: any;
      }>
    ) => {},

    childAddImages: (
      state,
      action: PayloadAction<{ data: any; callback: any }>
    ) => {},
    userAddImages: (
      state,
      action: PayloadAction<{ data: any; callback: any }>
    ) => {},
    AddImagesParent: (
      state,
      action: PayloadAction<{ data: any; callback: any }>
    ) => {},
    getOtp: (
      state,
      action: PayloadAction<{
        mobileNumber: string;
        countryCode: string;
        callback: (check: number) => void;
      }>
    ) => {},
    verifiedOtp: (
      state,
      action: PayloadAction<{ OTP: string; callback: (check: boolean) => void }>
    ) => {},

    getMeRequest: (
      state,
      action: PayloadAction<{
        callback: (
          check: boolean,
          profileCompleted: boolean,
          childAdded: boolean
        ) => void;
      }>
    ) => {},
    getMeRequestSecond: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    // forgot password
    doUpdatePassword: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    clearUpdatePasswordForm: (state) => {
      state.updatePassword.password = "";
      state.updatePassword.confirmPassword = "";
    },
    forgotPasswordSendEmailForm: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      set(
        state,
        `forgotPasswordEmail.${action.payload.key}`,
        action.payload.value
      );
    },
    clearforgotPasswordSendEmailForm: (state) => {
      state.forgotPasswordEmail.email = "";
    },
    clearForgotPasswordSendCodeForm: (state) => {
      state.forgotPasswordEmail.hash = "";
      state.forgotPasswordEmail.code = "";
    },
    doSendForgotPasswordEmail: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    doSendForgotPasswordCode: (
      state,
      action: PayloadAction<{ callback: () => void }>
    ) => {},
    setEmailHashCode: (state, action: PayloadAction<string>) => {
      state.forgotPasswordEmail.hash = action.payload;
    },
    doLoginWithGoogle: (
      state,
      action: PayloadAction<{
        name?: string | null;
        googleId: string;
        email: string;
        googlePhoto?: string | null;
        socialType: UserSocialTypeEnum;
        identityToken: string | null;
        callback: (check: boolean, profileCompleted: boolean) => void;
      }>
    ) => {},

    setGoogleHash: (state, action: PayloadAction<GoogleLoginHashInterface>) => {
      state.googleLogin = action.payload;
    },
    doGoogleLoginMobileNumberUpdate: (
      state,
      action: PayloadAction<{
        callback: (check: boolean, profileCompleted: boolean) => void;
      }>
    ) => {},
  },
});

export const { reducer, actions, name: sliceKey } = useClinicSlice;
