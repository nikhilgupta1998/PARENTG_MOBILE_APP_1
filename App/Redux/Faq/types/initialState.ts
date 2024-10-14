
import { FaqState } from '.';

export const initialState: FaqState = {
  posts: [],
  pageNo: 0,
  pageSize: 0,
  postCreated: false,
  tutorialList: [],
  tutorialPageNo: 1,
  tutorialPageSize: 10,
  loading: false,
  currentPage: 0,
  moreLoading: false,
  meta: {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0
  }
};
