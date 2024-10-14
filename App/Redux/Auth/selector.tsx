import {createSelector} from '@reduxjs/toolkit';

import {initialState} from './types/initialState';
import { RootState } from '../../types';
import { authState } from './types';

const selectDomain = (state: RootState) => state?.authState || initialState;

export const selectLoginForm = createSelector(
  [selectDomain],
  state => state.loginFrom,
);
export const selectSignUp = createSelector(
  [selectDomain],
  state => state.signUpForm,
);

export const selectDeviceToken = createSelector(
  [selectDomain],
  state => state.deviceToken,
);
export const selectPlan = createSelector(
  [selectDomain],
  state => state.plan,
);
export const selectNetWorkState = createSelector(
  [selectDomain],
  state => state.netWorkState,
);
export const selectTutorial = createSelector(
  [selectDomain],
  state => state.tutorial,
);
export const selectToken = createSelector(
  [selectDomain],
  state => state.token,
);
export const selectIslogin = createSelector(
  [selectDomain],
  state => state.isLogin,
);
export const selectTrackerInitlized = createSelector(
  [selectDomain],
  state => state.trackerInitlized,
);
export const selectTrackingStatus = createSelector(
  [selectDomain],
  state => state.trackingStatus,
);
export const selectLocationStatus = createSelector(
  [selectDomain],
  state => state.locationStatus,
);
export const selectupdatePasswordForm = createSelector(
  [selectDomain],
  state => state.updatePassword,
);
export const selectOTPForm = createSelector(
  [selectDomain],
  state => state.OTPForm,
);
export const selectHash = createSelector(
  [selectDomain],
  state => state.hash,
);
export const selectPassword = createSelector(
  [selectDomain],
  state => state.updatePassword,
);
export const selectChildForm = createSelector(
  [selectDomain],
  state => state.childForm,
);
export const selectChildList = createSelector(
  [selectDomain],
  state => state.childList,
);
export const selectProfileForm = createSelector(
  [selectDomain],
  state => state.profileForm,
);
export const selectProfileList = createSelector(
  [selectDomain],
  state => state.profileList,
);
export const selectParentForm = createSelector(
  [selectDomain],
  state => state.ParentForm,
);
export const selectParentList = createSelector(
  [selectDomain],
  state => state.ParentList,
);
export const selectloader = createSelector(
  [selectDomain],
  state => state.loader,
);
export const selectForgotPasswordEmail = createSelector(
  [selectDomain],
  state => state.forgotPasswordEmail,
);
export const selectGoogleLoginSetHash = createSelector(
  [selectDomain],
  state => state.googleLogin,
);
export const selectGoogleLoading = createSelector(
  [selectDomain],
  state => state.googleLoading,
);


