import {  VaccinationState } from ".";

export const initialState: VaccinationState = {
  list: [],
  statusCount: { completed: 0, overdue: 0, upcoming: 0 },
  addVaccination: {
    vaccineId: "", weight: "", date: "", image: [],
    heightInch: "",
    heightFeet: "",
    _id: ""
  },
  pageNo: 1,
  pageSize: 5,
  postCreated: false,
  filterCatgory: "",
  searchText: "",
  type: 1,
  months: 0,
  loading: true,
  currentPage: 1,
  moreLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 0,
    totalPages: 0
  },
};
