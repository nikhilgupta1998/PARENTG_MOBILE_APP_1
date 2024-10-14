import { GenderEnum, MealRecipeEnum, MealTypeEnum, MealsState, TypeEnum } from ".";

export const initialState: MealsState = {
  bmiCalculateForm: {
    age: "",
    gender: GenderEnum.MALE,
    heightFeet: "",
    heightInch: "",
    weight: "",
    BMI: ""
  },
  pageNo: 0,
  pageSize: 0,
  totalRow: 0,
  filterCatgory: "",
  searchText: "",
  type: 1,
  category: [],
  categoryList: [],
  loading: true,
  MealsDetails: {},
  MealsList: [],
  mealDetail: undefined,
  filterFood: {
    MealRecipe: MealRecipeEnum.NORMAL,
    MealType: MealTypeEnum.BREAKFAST,
    Type: TypeEnum.VEG,
    Date: new Date()
  },
  filterFoodType: TypeEnum.VEG,
  ingrident: [],
  ingridentList: [],
  chat: "",
  filterCategoryform: {
    breakfast: "",
    lunch: "",
    snack: "",
    dinner: ""
  },
  chatList: [],
  currentPage: 1,
  moreLoading: false,
  meta: {
    total: 0,
    page: 1,
    limit: 0,
    totalPages: 0
  },
  FunFoodMealsList: [],
  MealsFunFoodDetails: {},
  allMealsPageNo: 1,
  allMealsPageSize: 10,
  allMealsTotalRow: 0,
  allMealsMeta: {
    total: 0,
    page: 1,
    limit: 0,
    totalPages: 0
  },
  allMealsCurrentPage: 1,
  allMealsMoreLoading: false,
  allMealList: [],
  randomFunFoodData: [],
  chatLoader: false,
  bmiLoader: true,
  mealLoader: true,
  fuFoodMealLoader: true,
  mealDetailLoader: true,
  chatListLoader: true,
  premiumMealLoader: true
};
