import { milestoneState } from '.';

export const initialState: milestoneState = {
  progressBar: [],
  milestone: {
    _id: '',
    category: {
      _id: '',
      categoryEnglishTitle: '',
      categoryHindiTitle: '',
      categoryArabicTitle: ''
    },
    data: {
      meta: {
        total: 0,
        page: 0,
        limit: 0,
        totalPages: 0
      },
      results: []
    },
  },
  question: {
    _id: '',
    milestone: {
      _id: '',
      milestoneEnglishTitle: '',
      milestoneHindiTitle: '',
      milestoneArabicTitle: ''
    },
    data: {
      results: [],
      meta: {
        total: 0,
        page: 0,
        limit: 0,
        totalPages: 0
      }
    }
  },
  loadermilestone: true,
  loaderQuestion: true,
  currentPage: 1,
  moreLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 0,
    totalPages: 0
  },
  currentPageMilestone: 1,
  moreLoadingMilestone: false,
  metaMilestone: {
    total: 0,
    page: 1,
    limit: 0,
    totalPages: 0
  },
  currentPageQuestion: 1,
  moreLoadingQuestion: false,
  metaQuestion: {
    total: 0,
    page: 1,
    limit: 0,
    totalPages: 0
  },
  assessmentData: [],
  QuestionLoader: true,
  faqList: [],
  loader: false
};
