export interface OrderData {
  orderStatus: number;
  id: string;
  palnData: string;
  amount: number;
  updatedAt: string;
}
export interface PaymentData {
  status: number;
  order_id: string;
  payment_id: string;
  code: string;
  source: string;
  description: string;
  step: string;
  reason: string;
}
export interface UserNotification {
  title: string;
  pic: string;
}
export interface planInterface {
  _id: string;
  englishTitle: string;
  hindiTitle: string;
  arabicTitle: string;
  amount: string;
  rucringQty: string;
  ructingType: number;
  isDefault: number;
  activity: string;
  milestone: string;
  progress: string;
  blogs: string;
  community: string;
  calendar: string;
  isHealthyActivity: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  androidAmount: string;
  iosAmount: string;
}
export interface Plan {
  id: string;
  title: string;
  amount: number;
  ructingType: number;
  activity: number;
  milestone: number;
  progress: number;
  blogs: number;
  healthActivity: number;
  isDefault: number;
  community: number;
  calendar: number;
}
export interface planState {
  loading: boolean;
  planlist: planInterface[];
  orders: OrderData[];
  plans: Plan[];
  order_id: string;
  payment_id: string;
  payment_amount: number;
  payment_key: string;
  Plan: string;
  currentPage: number;
  moreLoading: boolean;
  meta: Meta;
  couponResponse: couponResponse;
}

export interface couponResponse {
  price: number;
  discount: number;
  totalAmount: number;
}
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface OrderData {
  orderStatus: number;
  id: string;
  palnData: string;
  amount: number;
  updatedAt: string;
}

export type authStates = planState;
