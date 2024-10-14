export interface CalculateBMIInterface {
  age: string;
  gender: GenderEnum;
  heightFeet: string;
  heightInch: string;
  weight: string;
  BMI: string;
}
export interface MealsListInterface {
  id: string;
  categoryid: string;
  title: string;
  description: string;
  age: number;
  image: string;
  bookmark: 0;
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
export enum GenderEnum {
  FEMALE = 0,
  MALE = 1,
}

export enum TypeEnum {
  VEG = 0,
  NONVEG = 1,
  EGG = 2,
}

export enum MealTypeEnum {
  BREAKFAST = 0,
  LUNCH = 1,
  SNACKS = 2,
  DINNER = 3,
}

export enum MealRecipeEnum {
  NORMAL = 1,
  CHEF = 2,
}
export interface filterformInterface {
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

export interface MealsState {
  randomFunFoodData: { id: string; item: [] }[];
  bmiCalculateForm: CalculateBMIInterface;
  MealsList: [];
  FunFoodMealsList: any;
  MealsDetails: {};
  MealsFunFoodDetails: {};
  mealDetail: any;
  pageNo: number;
  pageSize: number;
  totalRow: number;
  searchText: string;
  filterCatgory: string;
  type: number;
  category: [];
  categoryList: [];
  ingrident: [];
  ingridentList: [];
  filterFood: filterFoodInterface;
  filterFoodType: TypeEnum;
  chat: string;
  filterCategoryform: filterformInterface;
  chatList: [];
  currentPage: number;
  moreLoading: boolean;
  meta: Meta;
  allMealsPageNo: number;
  allMealsPageSize: number;
  allMealsTotalRow: number;
  allMealsMeta: Meta;
  allMealsCurrentPage: number;
  allMealsMoreLoading: boolean;
  allMealList: any;
  chatLoader:boolean;
  loading: boolean;
  bmiLoader:boolean;
  mealLoader:boolean;
  fuFoodMealLoader:boolean;
  mealDetailLoader :boolean;
  chatListLoader:boolean;
  premiumMealLoader:boolean;
}
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface filterFoodInterface {
  MealRecipe: MealRecipeEnum;
  MealType: MealTypeEnum;
  Type: TypeEnum;
  Date: Date;
}
export type InitialMealsState = MealsState;
