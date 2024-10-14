export interface sleepInterface {
  childId: string;
  from: string;
  to: string;
  date: Date;
  offset:number;
}
export interface growthInterface {
  childId: string;
  heightInch: string;
  heightFeet: string;
  weight: string;
  date: Date;
}
export enum FeedingTypeEnum {
  BREAST = 1,
  BOTTLE = 2,
}
export interface breastFeedingInterface {
  childId: string;
  leftStartTime: string;
  leftEndTime: string;
  rightStartTime: string;
  rightEndTime: string;
}
export interface bottleFeedingInterface {
  childId: string;
  volume :string
}
export enum BreastFeedingTypeEnum {
  LEFT = 1,
  RIGHT = 2,
}

export interface AnalyticsState {
  breastFeeding: breastFeedingInterface;
  bottleFeeding:bottleFeedingInterface;
  growth: growthInterface;
  sleep: sleepInterface;
  pageNo: number;
  pageSize: number;
  loading: boolean;
  GraphTableData:any
  growthHeightChart : any
}

export type InitialAnalyticsState = AnalyticsState;
