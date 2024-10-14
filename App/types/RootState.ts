import { AnalyticsState } from "../Redux/Analytics/types";
import { authState } from "../Redux/Auth/types";
import { BlogState } from "../Redux/Blog/types";
import { PostState } from "../Redux/Community/types/types";
import { FaqState } from "../Redux/Faq/types";
import { HomeActivityState } from "../Redux/Home/Activitys/types";
import { MealsState } from "../Redux/Meals/types";
import { milestoneState } from "../Redux/Milestone/types";
import { MilestoneGraphState } from "../Redux/MilestoneGraph/types";
import { NotificationState } from "../Redux/Notification/types";
import { planState } from "../Redux/Plan/types";
import { ToysState } from "../Redux/Toys/types";
import { VaccinationState } from "../Redux/Vaccination/types";

export interface RootState {
  authState: authState;
  milestoneState: milestoneState;
  postState: PostState;
  blogState: BlogState;
  faqState: FaqState;
  analyticsState: AnalyticsState;
  toysState: ToysState;
  mealsState: MealsState;
  homeActivityState: HomeActivityState;
  planState: planState;
  milestoneGraphState: MilestoneGraphState;
  vaccinationState: VaccinationState;
  notificationState: NotificationState;

}
