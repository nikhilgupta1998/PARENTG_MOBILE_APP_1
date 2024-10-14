export interface NotificationInterface {
  _id: string;
  englishTitle: string;
  hindiTitle: string;
  arabicTitle: string;
  userId: string;
  userName: string;
  mobileNumber:string;
  childId: string;
  childName: string;
  vaccinationId: string;
  englishVaccinationName: string;
  hindiVaccinationName: string;
  arabicVaccinationName: string;
  englishVaccinationProtectionAgainst: string;
  hindiVaccinationProtectionAgainst: string;
  arabicVaccinationProtectionAgainst: string;
  englishVaccinationInstructions: string;
  hindiVaccinationInstructions: string;
  arabicVaccinationInstructions: string;
  toBeGiven: string;
  vaccinationMonths:  number;
  vaccinationDose:  number;
  receiverId:string;
  read_status:  number;
  createdAt:string;
  updatedAt: string;
  type :NotificationTypeEnum
}
export enum NotificationTypeEnum {
  VACCINATION_DUE = 1,
  FEED_ANALYTICS_DUE = 2,
  GROWTH_ANALYTICS_DUE = 3,
  SLEEP_ANALYTICS_DUE = 4,
  PLAN_EXPIRE= 5,
  USER_SIGNUP = 6,
  NEW_MESSAGE = 7,
  ACTIVITY_DUE = 8
}
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface NotificationState {
  list: NotificationInterface[];
  pageNo: number;
  pageSize: number;
  searchText: string;
  type: number;
  loading: boolean;
  currentPage: number;
  moreLoading: boolean;
  meta: Meta;
  newNotification: number;
}

export type InitialNotificationState = NotificationState;
