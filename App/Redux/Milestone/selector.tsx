import {createSelector} from '@reduxjs/toolkit';

import {initialState} from './types/initialState';
import { RootState } from '../../types';
import { milestoneState } from './types';

const selectDomain = (state: RootState) => state?.milestoneState || initialState;

export const selectMilestone = createSelector(
  [selectDomain],
  state => state.milestone,
);
export const selectProgressBar = createSelector(
  [selectDomain],
  state => state.progressBar,
);
export const selectQuestion = createSelector(
  [selectDomain],
  state => state.question,
);
export const selectLoader = createSelector(
  [selectDomain],
  state => state.loader,
);
export const selectQuestionLoader= createSelector(
  [selectDomain],
  state => state.QuestionLoader,
);
export const selectAssessmentData = createSelector(
  [selectDomain],
  state => state.assessmentData,
);
export const selectCurrentPage = createSelector(
  [selectDomain],
  (state) => state.currentPage
);
export const selectMoreLoading = createSelector(
  [selectDomain],
  (state) => state.moreLoading
);
export const selectMeta = createSelector([selectDomain], (state) => state.meta);
export const selectMilestoneCurrentPage = createSelector(
  [selectDomain],
  (state) => state.currentPageMilestone
);
export const selectMilestoneMoreLoading = createSelector(
  [selectDomain],
  (state) => state.moreLoadingMilestone
);
export const selectMetaMilestone = createSelector([selectDomain], (state) => state.metaMilestone);

export const selectQuestionCurrentPage = createSelector(
  [selectDomain],
  (state) => state.currentPageQuestion
);
export const selectQuestionMoreLoading = createSelector(
  [selectDomain],
  (state) => state.moreLoadingQuestion
);
export const selectMetaQuestion = createSelector([selectDomain], (state) => state.metaQuestion);
export const selectFaqList = createSelector([selectDomain], (state) => state.faqList);

export const selectLoaderQuestion = createSelector([selectDomain], (state) => state.loaderQuestion);
export const selectLoadermilestone = createSelector([selectDomain], (state) => state.loadermilestone);