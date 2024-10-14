export interface PostState {
  posts: PostItem[];
  postFrom: Post;
  pageNo: number;
  pageSize: number;
  postCreated: boolean;
  postCommnets: PostComments[];
  postCommnetDetails: PostCommentsDetails;
  postCommnetsForm: PostCommentsFormInterface;
  loading: boolean;
  loadingComment: boolean;
  loadingPost: boolean;
  loadingPostGet: boolean;
  loadingLike: boolean;
  currentPage: number;
  moreLoading: boolean;
  meta: Meta;
  commentCurrentPage: number;
  commentMeta: Meta;
  commentMoreLoading: boolean;
}

export enum ActionType{
  BLOCK_USER=1,
  REPORT_POST=2,
  REPORT_USER=3
}
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface Post {
  id: string;
  title: string;
  description: string;
  images: any[];
}
export interface image {
  name: string;
}
export interface PostComments {
  _id: string
  comment: string
  userId: string
  userName: string
  profilepic: string;
  postId: string;
  createdAt: string
}

export interface PostCommentsDetails {
  createdAt: string;
  description: string;
  images: [];
  title: string;
  updatedAt: string;
  userId: string;
  _id: string;
}
export interface PostCommentsFormInterface {
  // comments: string;
  // id: string;
  // _id: string;
  postId: string;
  comment: string;
}
export interface PostItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
  postlikes: number;
  userId: string;
  userName: string;
  profilepic: string;
  createdAt: string;
  updatedAt: string;
  like: number;
  totalComments: number;
}
export type InitialPostState = PostState;
