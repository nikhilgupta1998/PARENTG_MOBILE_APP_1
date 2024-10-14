
export interface MilestoneCategoryGarphInterface {
  title: string;
  answare: number;
  question: number;
}
export interface MilestoneActivityGarphInterface {
  title: string;
  count: number;
  question: number;

}
export interface MilestoneGraphState {
  milestoneCategoryGraph: MilestoneCategoryGarphInterface[];
  milestoneActivityGraph: []
  pageNo: number;
  pageSize: number;
  searchText: string;
  loading: boolean;
}

export type InitialMilestoneGraphState = MilestoneGraphState;
