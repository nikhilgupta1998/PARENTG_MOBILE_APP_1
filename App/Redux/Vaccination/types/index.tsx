export interface VaccinationItemInterface {
  arabicInstructions: string;
  arabicName: string;
  arabicProtectionAgainst: string;
  createdAt: string;
  dose: number;
  englishInstructions: string;
  englishName: string;
  englishProtectionAgainst: string;
  hindiInstructions: string;
  hindiName: string;
  hindiProtectionAgainst: string;
  isActive: number;
  months: number;
  toBeGiven: string;
  updatedAt: string;
  _id: string;
  complateDose: number;
  dueDate: string;
  status: number;
  totalDose: number;
}
export interface VaccinationStatusCountInterface {
  completed: number;
  overdue: number;
  upcoming: number;
}
export interface VaccinationAddInterface {
  _id:string;
  vaccineId: string;
  date: string;
  image: any[];
  heightInch: string;
  heightFeet: string;
  weight: string;
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
export interface VaccinationState {
  list: VaccinationItemInterface[];
  statusCount: VaccinationStatusCountInterface;
  addVaccination: VaccinationAddInterface;
  pageNo: number;
  pageSize: number;
  postCreated: boolean;
  searchText: string;
  filterCatgory: string;
  type: number;
  months: number;
  loading: boolean;
  currentPage: number;
  moreLoading: boolean;
  meta: Meta;
}
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type InitialVaccinationState = VaccinationState;
