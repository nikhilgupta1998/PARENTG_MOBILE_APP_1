import { PostState } from "./types";

export const initialState: PostState = {
  posts: [],
  postFrom: {
    id: "",
    title: "",
    description: "",
    images: [],
  },
  pageNo: 1,
  pageSize: 5,
  postCreated: false,
  postCommnets: [],
  postCommnetsForm: { comment: "", postId: "" },
  loading: true,
  loadingComment: false,
  loadingPost: false,
  loadingPostGet: false,
  loadingLike: false, postCommnetDetails: {
    createdAt: "",
    description: "",
    images: [],
    title: "",
    updatedAt: "",
    userId: "",
    _id: "",
  },
  currentPage: 1,
  moreLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  },
  commentMeta: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  },
  commentCurrentPage: 1,
  commentMoreLoading: false
};
