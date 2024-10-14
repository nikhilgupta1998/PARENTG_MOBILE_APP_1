export interface milestoneState {
  progressBar: progressBarInterface[];
  milestone: milestoneMainInterface;
  question: QuestionsInterface;
  loaderQuestion: boolean;
  loadermilestone: boolean;
  QuestionLoader: boolean;
  loader : boolean;
  currentPage: number;
  moreLoading: boolean;
  meta: Meta;
  currentPageMilestone: number;
  moreLoadingMilestone: boolean;
  metaMilestone: Meta;
  currentPageQuestion: number;
  moreLoadingQuestion: boolean;
  metaQuestion: Meta;
  assessmentData : any
  faqList:any
}
export interface progressBarInterface {
  _id: string;
  title: string;
  count: number;
  answer: 0;
  arabicTitle: string;
  completedMilestone:number;
  color: string;
  englishTitle: string;
  hindiTitle: string;
  id: string;
  question: 0;
}
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface milestoneMainInterface {
  _id: string;
  category: categoryInterface;
  data: {
    meta: Meta;
    results: milestoneListInterface[];
  };
}
export interface categoryInterface {
  _id: string;
  categoryEnglishTitle: string;
  categoryHindiTitle: string;
  categoryArabicTitle: string;
}
export interface milestoneListInterface {
  _id: string;
  categoryId: string;
  image: string;
  englishTitle: string;
  hindiTitle: string;
  arabicTitle: string;
  englishDescription: string;
  hindiDescription: string;
  arabicDescription: string;
  answer: string;
  question: string;
  createdAt: string;
}

export interface QuestionsInterface {
  _id: string;
  milestone: milestoneInterface;
  data: {
    meta: Meta;
    results: QuestionsListInterface[];
  };
}
export interface milestoneInterface {
  _id: string;
  milestoneEnglishTitle: string;
  milestoneHindiTitle: string;
  milestoneArabicTitle: string;
}
export interface QuestionsListInterface {
  _id: string;
  id: string;
  milestoneId: string;
  milestoneEnglishTitle: string;
  milestoneHindiTitle: string;
  milestoneArabicTitle: string;
  minAge: number;
  maxAge: number;
  englishDescription: string;
  englishFooter: string;
  hindiDescription: string;
  hindiFooter: string;
  arabicDescription: string;
  arabicFooter: string;
  isActive: number;
  answer: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
}

export type authStates = milestoneState;
