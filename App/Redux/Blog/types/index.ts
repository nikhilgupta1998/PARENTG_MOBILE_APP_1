export interface PostComments {
  comments: string;
  id: string;
  createdAt: string;
  userid: string;
  userName: string;
  profilepic: string;
}
export interface PostItem {
  id: string;
  categoryid: string;
  title: string;
  description: string;
  age: number;
  image: string;
  bookmark: BlogBookmarkEnum;
  credits: number;
  createdAt: string;
  userid: string;
  userName: string;
  profilepic: string;
  arabicShortDescription: string;
  arabicTitle: string;
  categoryId: string;
  englishShortDescription: string;
  englishTitle: string;
  hindiShortDescription: string;
  hindiTitle: string;
  _id: string;
  category: string;
  maxAge: number;
  minAge: number;
  arabicDescription: "";
  englishDescription: string;
  hindiDescription: "";
  isActive: 1;
  categoryArabicTitle: string;
  categoryEnglishTitle: string;
  categoryHindiTitle: string;
  type: number;
  updatedAt: string;
  totalLikes: number;
  like: number;
}
export enum BlogBookmarkEnum {
  NO = 0,
  YES = 1,
}
export interface MileStoneQuesiont {
  id: string;
  description: string;
  footer: string;
}
export interface BlogState {
  blogs: PostItem[];
  blogsDetails: PostItem;
  favPosts: PostItem[];
  trendinggPosts: PostItem[];
  meta: Meta;
  currentPage: number;
  postCreated: boolean;
  postCommnets: PostComments[];
  searchText: string;
  filterCatgory: string;
  type: number;
  bookmark: BlogBookmarkEnum;
  category: string;
  categoryList: [];
  loading: boolean;
  moreLoading: boolean;
  randomData: { id: string; item: PostItem[] }[];
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type InitialBlogState = BlogState;
