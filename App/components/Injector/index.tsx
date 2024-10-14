import { useInjectReducer, useInjectSaga } from "redux-injectors";
import { sliceKey, reducer } from "../../Redux/Auth/slice";
import { AuthLoginRepoSaga } from "../../Redux/Auth/saga";
import { PostSaga } from "../../Redux/Community/redux/saga";
import {
  postSliceKey,
  reducer as postreducer,
} from "../../Redux/Community/redux/slice";
import {
  sliceKey as BlogSliceKey,
  reducer as BlogReducer,
} from "../../Redux/Blog/slice";
import { BlogRepoSaga } from "../../Redux/Blog/saga";
import {
  sliceKey as FaqSliceKey,
  reducer as FaqReducer,
} from "../../Redux/Faq/slice";
import { FaqRepoSaga } from "../../Redux/Faq/saga";
import {
  sliceKey as MilestoneSliceKey,
  reducer as MilestoneReducer,
} from "../../Redux/Milestone/slice";

import { MilestoneRepoSaga } from "../../Redux/Milestone/saga";
import {
  sliceKey as ToysSliceKey,
  reducer as ToysReducer,
} from "../../Redux/Toys/slice";

import { ToysRepoSaga } from "../../Redux/Toys/saga";
import {
  sliceKey as MealsSliceKey,
  reducer as MealsReducer,
} from "../../Redux/Meals/slice";
import { MealsRepoSaga } from "../../Redux/Meals/saga";
import { AnalyticsRepoSaga } from "../../Redux/Analytics/saga";
import {
  sliceKey as AnalyticsSliceKey,
  reducer as AnalyticsReducer,
} from "../../Redux/Analytics/slice";
import { HomeRepoSaga } from "../../Redux/Home/Activitys/saga";
import {
  sliceKey as HomeSliceKey,
  reducer as HomeReducer,
} from "../../Redux/Home/Activitys/slice";
import { PlanSaga } from "../../Redux/Plan/redux/saga";
import {
  postSliceKey as PostSliceKey,
  reducer as PostReducer,
} from "../../Redux/Plan/redux/slice";
import {
  sliceKey as MilestoneGraphSliceKey,
  reducer as MilestoneGraphReducer,
} from "../../Redux/MilestoneGraph/slice";

import { MilestoneGraphRepoSaga } from "../../Redux/MilestoneGraph/saga";
import {
  sliceKey as VaccinationSliceKey,
  reducer as VaccinationReducer,
} from "../../Redux/Vaccination/slice";

import { VaccinationRepoSaga } from "../../Redux/Vaccination/saga";
import {
  sliceKey as NotificationSliceKey,
  reducer as NotificationReducer,
} from "../../Redux/Notification/slice";
import { NotificationRepoSaga } from "../../Redux/Notification/saga";
interface Props {
  children: any;
}
export default function Injector(props: Props) {
  // Login ------------->
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: AuthLoginRepoSaga });
  //community
  useInjectReducer({ key: postSliceKey, reducer: postreducer });
  useInjectSaga({ key: postSliceKey, saga: PostSaga });
  // Blog ------------->
  useInjectReducer({ key: BlogSliceKey, reducer: BlogReducer });
  useInjectSaga({ key: BlogSliceKey, saga: BlogRepoSaga });
  // Milestone ------------->
  useInjectReducer({ key: MilestoneSliceKey, reducer: MilestoneReducer });
  useInjectSaga({ key: MilestoneSliceKey, saga: MilestoneRepoSaga });
  // Faq ------------->
  useInjectReducer({ key: FaqSliceKey, reducer: FaqReducer });
  useInjectSaga({ key: FaqSliceKey, saga: FaqRepoSaga });
  // TOYS ------------->
  useInjectReducer({ key: ToysSliceKey, reducer: ToysReducer });
  useInjectSaga({ key: ToysSliceKey, saga: ToysRepoSaga });
  // Meals ------------->
  useInjectReducer({ key: MealsSliceKey, reducer: MealsReducer });
  useInjectSaga({ key: MealsSliceKey, saga: MealsRepoSaga });

  useInjectReducer({ key: AnalyticsSliceKey, reducer: AnalyticsReducer });
  useInjectSaga({ key: AnalyticsSliceKey, saga: AnalyticsRepoSaga });

  useInjectReducer({ key: HomeSliceKey, reducer: HomeReducer });
  useInjectSaga({ key: HomeSliceKey, saga: HomeRepoSaga });
  useInjectReducer({ key: PostSliceKey, reducer: PostReducer });
  useInjectSaga({ key: PostSliceKey, saga: PlanSaga });
  // Milestone graph ------------->
  useInjectReducer({
    key: MilestoneGraphSliceKey,
    reducer: MilestoneGraphReducer,
  });
  useInjectSaga({ key: MilestoneGraphSliceKey, saga: MilestoneGraphRepoSaga });
  // Vaccination ------------->
  useInjectReducer({
    key: VaccinationSliceKey,
    reducer: VaccinationReducer,
  });
  useInjectSaga({ key: VaccinationSliceKey, saga: VaccinationRepoSaga });
  // Notification ------------->
  useInjectReducer({
    key: NotificationSliceKey,
    reducer: NotificationReducer,
  });
  useInjectSaga({ key: NotificationSliceKey, saga: NotificationRepoSaga });

  return props.children;
}
