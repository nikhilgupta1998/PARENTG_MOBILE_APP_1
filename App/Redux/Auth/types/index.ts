export interface authState {
  token: string;
  deviceToken: string;
  netWorkState: boolean;
  trackingStatus: boolean;
  locationStatus: boolean;
  trackerInitlized: boolean;
  user: User;
  isLogin: boolean;
  loading: boolean;
  loginFrom: LoginFrom;
  signUpForm: signUpFormInterface;
  userNotificion: Array<UserNotification>;
  OTPForm: OTPInterface;
  hash: string;
  updatePassword: updatePasswordInterface;
  childForm: childFormInterface;
  childList: childFormInterface[];
  profileForm: profiledFormInterface;
  profileList: profiledFormInterface[];
  ParentForm: profiledFormInterface;
  ParentList: profiledFormInterface[];
  plan:{}
  loader: boolean;
  googleLoading: boolean;
  googleLoginForm: GoogleUserInterface;
  forgotPasswordEmail: UserSendEmailInterface;
  googleLogin:GoogleLoginHashInterface;
  tutorial : string
}

export enum UserSocialTypeEnum {
  GOOGLE = 1,
  APPLE = 2, 
}
export interface childFormInterface {
  name: string;
  weekOfGestation: string;
  gender: GenderEnum;
  dob: string;
  profilePic: string;
  _id: string;
}
export interface profiledFormInterface {
  email: string;
  name: string;
  dob: string;
  country: string;
  _id: string;
  gender: GenderEnum;
  relation: string;
  mobileNumber: string;
  otp: string;
  profilePic: string;
  isMobileNumberValid: boolean;
  mobileVerify: boolean;
  countryCode: string;
  mobileNumberCheck: string;
  childAdded: boolean;
  emailVerified: boolean;
  profileCompleted: boolean;
}
export enum GenderEnum {
  FEMALE = 0,
  MALE = 1,
}
export interface UserNotification {
  title: string;
  pic: string;
}
export interface updatePasswordInterface {
  password: string;
  confirmPassword: string;
}

export interface LoginFrom {
  mobileNumber: string;
  isMobileNumberValid: boolean;
  password: string;
  mobileVerify: boolean;
  countryCode: string;
}

export interface OTPInterface {
  otp: any;
}
export interface signUpFormInterface {
  name: { value: string; errro: string };
  phone: { value: string; errro: string };
  email: { value: string; errro: string };
  device_tocken: { value: string; errro: string };
  profile_pic: { value: string; errro: string };
}
export interface User {
  fullName: string;
  driverName: string;
  profilepic: string;
  email: string;
  about: string;
  link: string;
  likes: number;
  followers: number;
  post: number;
}
export interface GoogleUserInterface {
  name: string;
  googleId: string;
  email: string;
  mobileNumber: string;
}
export interface UserSendEmailInterface {
  email: string;
  code:string;
  hash:string;
  mobileNumber: string;
  isMobileNumberValid: boolean;
  password: string;
  mobileVerify: boolean;
  countryCode: string;
}
export interface GoogleLoginHashInterface {
  googleHash: string;
}
export enum ErrorType {
  driverName_EMPTY = 10,
  PASSWORD_EMPTY = 20,
  USER_NOT_FOUND = 404,
  SUCCESS = 200,
  UNAUTHORIZED = 400,
  ERROR = 500,
  NO_PERMISSIONS = 401,
}
export type authStates = authState;
