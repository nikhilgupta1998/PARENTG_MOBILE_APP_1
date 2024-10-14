export interface FaqState {
  posts: FaqItem[];
  pageNo: number;
  pageSize: number;
  postCreated: boolean;

  tutorialList: any[],
  tutorialPageNo: number;
  tutorialPageSize: number;
  loading: boolean;
  currentPage: number;
  moreLoading: boolean;
  meta: Meta;
}
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  
}

export type InitialFaqState = FaqState;
