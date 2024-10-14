import { AnalyticsState, BreastFeedingTypeEnum, FeedingTypeEnum } from ".";

export const initialState: AnalyticsState = {
  breastFeeding: {
    childId: "",
    leftStartTime: "",
    leftEndTime: "",
    rightStartTime: "",
    rightEndTime: ""
  },
  growth: {
    childId: "",
    heightInch: "",
    heightFeet: "",
    weight: "",
    date: new Date(),
  },
  sleep: {
    childId: "",
    from: "",
    to: "",
    date: new Date(),
  },
  pageNo: 0,
  pageSize: 0,
  loading: false,
  bottleFeeding: {
    childId: "",
    volume: ""
  },
  GraphTableData: {},
  growthHeightChart:{}
};
