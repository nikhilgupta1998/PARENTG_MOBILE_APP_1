export interface ToysItem {
  arabicDescription: string;
  bookmark: BookmarkEnum;
  categoryId: string;
  trending:number,
  createdAt: string;
  currency: ToyCurrencyEnum;
  englishDescription: string;
  hindiDescription: string;
  image: string;
  maxPrice: number;
  minPrice: number;
  productLink: string;
  updatedAt: string;
  _id: string;
  englishTitle: string;
  hindiTitle: string;
  arabicTitle: string;
}
export enum BookmarkEnum {
  NO = 0,
  YES = 1,
}
export enum ToyCurrencyEnum {
  INR = 1,
  USD = 2,
  CUSD = 3,
}
export interface ToyDetails {
  id: string;
  toysCategoryEnglishTitle: string;
  categoryEnglishTitle: string;
  categoryHindiTitle: string;
  categoryArabicTitle: string;
  shortEnglishDescription: string;
  shortHindiDescription: string;
  shortArabicDescription: string;
  minAge: string;
  maxAge: string;
  trending: any;
  toysCategory: string;
  arabicDescription: string;
  bookmark: BookmarkEnum;
  categoryId: string;
  createdAt: string;
  currency: ToyCurrencyEnum;
  englishDescription: string;
  hindiDescription: string;
  image: string;
  maxPrice: number;
  minPrice: number;
  productLink: string;
  updatedAt: string;
  _id: string;
  englishTitle: string;
  hindiTitle: string;
  arabicTitle: string;
}
export interface ageFilterInterface {
  id:string,
  minAge: number;
  maxAge: number;
  isApplied : boolean
}
export interface ToysState {
  Toys: ToysItem[];
  pageNo: number;
  pageSize: number;
  totalRow: number;
  searchText: string;
  filterCatgory: string;
  type: number;
  bookmark: BookmarkEnum;
  loading: boolean;
  category: string;
  ToyCategory: any;
  selectToyCategory: any;
  currentPage: number;
  moreLoading: boolean;
  meta: Meta;
  toyDetails: ToyDetails;
  search: string;
  randomData: {id:string,item:ToysItem[]}[] ;
  ageFilter: ageFilterInterface;
}
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type InitialToysState = ToysState;
