import { planState } from '.';

export const initialState: planState = {
  planlist: [],
  loading: true,
  orders: [],
  plans: [],
  order_id: '',
  payment_id: '',
  payment_amount: 0,
  payment_key: '',
  Plan: '',
  currentPage: 1,
  moreLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 0,
    totalPages: 0
  },
  couponResponse: {
    price: 0,
    discount: 0,
    totalAmount: 0
  }
};
