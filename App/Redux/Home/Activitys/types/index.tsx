export interface ActivityInterface {
  _id: string;
  englishTitle: string;
  hindiTitle: string;
  arabicTitle: string;
  image: string;
  englishPurpose: string;
  hindiPurpose: string;
  arabicPurpose: string;
  categoryId: string;
  milestoneId: string;
  englishVideo: string;
  hindiVideo: string;
  arabicVideo: string;
  englishDescription: string;
  hindiDescription: string;
  arabicDescription: string;
  englishMaterialList: [];
  hindiMaterialList: string;
  arabicMaterialList: string;
  visibleAge: number;
  minAge: number;
  isCompleted: boolean;
  maxAge: number;
}
export interface ActivityListInterface {
  _id: string;
  englishTitle: string;
  hindiTitle: string;
  arabicTitle: string;
  image: string;
  englishPurpose: string;
  hindiPurpose: string;
  arabicPurpose: string;
  categoryId: string;
  milestoneId: string;
}
export enum BlogBookmarkEnum {
  NO = 0,
  YES = 1,
}
export interface MileStoneQuesiont {
  id: string;
  description: string;
  footer: string;
}
export interface doCompleteQuestionListInterface {
  _id: string;
  questionId: string;
  englishDescription: string;
  englishFooter: string;
  hindiDescription: string;
  hindiFooter: string;
  arabicDescription: string;
  arabicFooter: string;
  answer: number
}
export interface HomeActivityState {
  list: any;
  ActivityList: any;
  toyList: [];
  MealList: [];
  details: ActivityInterface;
  pageNo: number;
  pageSize: number;
  postCreated: boolean;
  searchText: string;
  filterCatgory: string;
  type: number;
  bookmark: BlogBookmarkEnum;
  category: string;
  categoryList: [];
  loading: boolean;
  date: Date;
  MaterialDate: Date;
  ActivityDate: Date;
  questionList: doCompleteQuestionListInterface[];
  doCompleteQuestionList: doCompleteQuestionListInterface[];
}

export type InitialHomeActivityState = HomeActivityState;
