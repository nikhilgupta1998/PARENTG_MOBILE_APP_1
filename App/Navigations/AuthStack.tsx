import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/var";
import PhoneNumber from "../Screens/Auth/PhoneNumber";
import Otp from "../Screens/Auth/Otp";
import Password from "../Screens/Auth/Password";
import CreateParent from "../Screens/Auth/CreateParent";
import CreateChild from "../Screens/Auth/CreateChild";
import Family from "../Screens/Profile/Family";
import AddChild from "../Screens/Profile/AddChild";
import MainTab from "./MainTab";
import Kids from "../Screens/Profile/Kids";
import EditChild from "../Screens/Profile/EditChild";
import SplashScreen from "../Screens/Splash";
import AddParent from "../Screens/Profile/AddParent";
import EditParent from "../Screens/Profile/EditParent";
import Progress from "../Screens/Explore/Progress";
import CreatePost from "../Screens/community/CreatePost";
import Verifiedotp from "../Screens/Profile/VerifiedOTP";
import DevelopmentOFSenses from "../Screens/Explore/DevelopmentOFSenses";
import Physical from "../Screens/Explore/Physical";
import Blogs from "../Screens/Blogs/Blogs";
import BlogDetailScreen from "../Screens/Blogs/BlogScreens";
import CommunityPostScreen from "../Screens/community/Post";
import CommunityPostCreate from "../Screens/community/CreatePost";
import CommunityPostComments from "../Screens/community/Comments";
import CommunityPostDetails from "../Screens/community/Details";
import Toys from "../Screens/Explore/Toys";
import Profile from "../Screens/Profile/Profile";
import Explore from "../Screens/Explore/Explore";
import Analytics from "../Screens/Analytics/Analytics";
import Sleep from "../Screens/Analytics/Sleep";

import MealPlanner from "../Screens/Meals/MealPlanner";

import ActivityDetails from "../Screens/HomeActivity/ActivityDetails";
import Recepies from "../Screens/Meals/Recepies";
import AccountScreen from "../Screens/Account/AccountScreen";
import Growth from "../Screens/Analytics/Growth";
import Feeding from "../Screens/Analytics/Feeding";
import BottleFeeding from "../Screens/Analytics/BottelFeeding";
import Multiselector from "components/Multiselector";
import Mealfilter from "../Screens/Meals/Mealfilter";
import ActivitiesInMonth from "../Screens/Explore/ActivitiesInMonth";
import GrowthAnalytics from "../Screens/Analytics/GrowthAnalytics";
import ComparisonOfMilestone from "../Screens/Explore/ComparisonOfMilestone";
import SleepGraph from "../Screens/Explore/SleepGraph";

import Vaccination from "../Screens/Vaccination/Vaccination";
import Chat from "../Screens/Chat/Chat";

import ToyFilter from "../Screens/Explore/ToyFilter";

import ConfirmVaccination from "../Screens/Vaccination/ConfirmVaccination";
import Notifications from "../Screens/Profile/Notifications";
import Language from "../Screens/Language";
import BMI from "../Screens/Meals/BMI";
import Assessment from "../Screens/Explore/Assessment";
import FunFoods from "../Screens/Meals/FunFoods";
import FunFoodRecepies from "../Screens/Meals/FunFoodRecepies";
import UpdatePassword from "../Screens/Auth/UpdatePassword";
import SendEmail from "../Screens/Auth/SendEmail";
import GooglePhoneNumber from "../Screens/Auth/GooglePhone";
import ForgotPasswordCode from "../Screens/Auth/ForgotPasswordCode";
import MyProfile from "../Screens/Auth/MyProfile";
import AllActivity from "../Screens/HomeActivity/AllActivity";
import AllMaterial from "../Screens/HomeActivity/AllMaterial";
import Ratings from "../Screens/Ratings";
import Category from "../Screens/Explore/Category";
import Tracking from "../Screens/Explore/Tracking";
import AllMeal from "../Screens/Meals/AllMeal";
import FeedingChart from "../Screens/Explore/FeedingChart";
import ToyDetails from "../Screens/Explore/ToyDetails";
import Faq from "../Screens/Explore/Faq";
import Transaction from "../Screens/Account/Transaction";
import SuccessScreen from "../Screens/Account/SuccessScreen";
import Tutorial from "../Screens/Tutorial";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREENS.SPLASH}
    >
            <Stack.Screen name={SCREENS.CATEGORY} component={Category} />
      <Stack.Screen name={SCREENS.TRACKING} component={Tracking} />

      <Stack.Screen name={SCREENS.RATINGS} component={Ratings} />
      <Stack.Screen name={SCREENS.TOYS} component={Toys} />
      <Stack.Screen name={SCREENS.VERIFIED_OTP} component={Verifiedotp} />
      <Stack.Screen name={SCREENS.CREATE_POST} component={CreatePost} />
      <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
      <Stack.Screen name={SCREENS.PHONENUMBER} component={PhoneNumber} />
      <Stack.Screen name={SCREENS.OTP} component={Otp} />
      <Stack.Screen name={SCREENS.PASSWORD} component={Password} />
      <Stack.Screen name={SCREENS.PHYSICAL} component={Physical} />

      <Stack.Screen name={SCREENS.CREATE_PARENT} component={CreateParent} />
      <Stack.Screen name={SCREENS.CREATE_CHILD} component={CreateChild} />
      <Stack.Screen name={SCREENS.FAMILY} component={Family} />
      <Stack.Screen name={SCREENS.ADD_CHILD} component={AddChild} />
      <Stack.Screen
        name={SCREENS.DEVELOPMENT_OF_SENSES}
        component={DevelopmentOFSenses}
      />
      <Stack.Screen name={SCREENS.MENU} component={Explore} />

      <Stack.Screen name={SCREENS.PROGRESS} component={Progress} />
      <Stack.Screen name={SCREENS.CREATE_FAMILY} component={AddParent} />

      <Stack.Screen name={SCREENS.EDIT_FAMILY} component={EditParent} />
      <Stack.Screen name={SCREENS.HOME} component={MainTab} />
      <Stack.Screen name={SCREENS.KIDS} component={Kids} />
      <Stack.Screen name={SCREENS.EDIT_CHILD} component={EditChild} />
      <Stack.Screen name={SCREENS.BLOG_SCREEN} component={Blogs} />
      <Stack.Screen
        name={SCREENS.BLOG_DETAIL_SCREEN}
        component={BlogDetailScreen}
      />
      <Stack.Screen
        name={SCREENS.COMMUNITY_POST_SCREEN}
        component={CommunityPostScreen}
      />
      <Stack.Screen
        name={SCREENS.COMMUNITY_POST_CREATE}
        component={CommunityPostCreate}
      />
      <Stack.Screen name={SCREENS.MEAL_LIST} component={MealPlanner} />

      <Stack.Screen name={SCREENS.ANALYTICS} component={Analytics} />
      <Stack.Screen name={SCREENS.SLEEP} component={Sleep} />
      <Stack.Screen
        name={SCREENS.COMMUNITY_POST_COMMENTS}
        component={CommunityPostComments}
      />
      <Stack.Screen
        name={SCREENS.COMMUNITY_POST_DETAILS}
        component={CommunityPostDetails}
      />
      <Stack.Screen
        name={SCREENS.ACITIVITY_DETAILS}
        component={ActivityDetails}
      />
      <Stack.Screen name={SCREENS.MEAL_DETAILS} component={Recepies} />
      <Stack.Screen name={SCREENS.PLAN} component={AccountScreen} />
      <Stack.Screen name={SCREENS.GROWTH} component={Growth} />
      <Stack.Screen name={SCREENS.FEEDING} component={Feeding} />
      <Stack.Screen name={SCREENS.BOTTELFEEDING} component={BottleFeeding} />
      <Stack.Screen name={SCREENS.FILTER} component={Mealfilter} />
      <Stack.Screen name={SCREENS.ACTIVITYINMONTH} component={ActivitiesInMonth} />
      <Stack.Screen name={SCREENS.GROWTHANALYTICS} component={GrowthAnalytics} />
      <Stack.Screen name={SCREENS.COMPARISONOFMILESTONE} component={ComparisonOfMilestone} />
      <Stack.Screen name={SCREENS.SLEEPGRAPH} component={SleepGraph} />
      <Stack.Screen name={SCREENS.CHAT} component={Chat} />
      <Stack.Screen name={SCREENS.VACCINATION} component={Vaccination} />

      <Stack.Screen name={SCREENS.TOY_FILTER} component={ToyFilter} />
      
      <Stack.Screen name={SCREENS.ASSESSMENT} component={Assessment} />
      
      <Stack.Screen name={SCREENS.FUNFOOD} component={FunFoods} />
      <Stack.Screen name={SCREENS.BMI_CALCULATE} component={BMI} />

      <Stack.Screen name={SCREENS.CONFIRM_VACCINATION} component={ConfirmVaccination} />
      <Stack.Screen name={SCREENS.NOTIFICATIONS} component={Notifications} />
      <Stack.Screen name={SCREENS.LANGUAGE} component={Language} />
      <Stack.Screen name={SCREENS.MEAL_FUN_FOOD_DETAILS} component={FunFoodRecepies} />
      <Stack.Screen name={SCREENS.UPDATE_PASSWORD} component={UpdatePassword} />
      <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={SendEmail} />
      <Stack.Screen name={SCREENS.GOOGLE_PHONE_NUMBER} component={GooglePhoneNumber} />
      <Stack.Screen name={SCREENS.FORGOT_PASSWORD_CODE} component={ForgotPasswordCode} />
      <Stack.Screen name={SCREENS.MY_PROFILE} component={MyProfile} />
      <Stack.Screen name={SCREENS.FAQ} component={Faq} />
      <Stack.Screen name={SCREENS.PROFILE_MENU} component={Profile} />
      <Stack.Screen name={SCREENS.ALL_ACTIVITY} component={AllActivity} />
      <Stack.Screen name={SCREENS.ALL_MATERIAL} component={AllMaterial} />
      <Stack.Screen name={SCREENS.ALL_MEAL} component={AllMeal} />
      <Stack.Screen name={SCREENS.FEEDINGCHART} component={FeedingChart} />
      <Stack.Screen name={SCREENS.TOYDETAIL} component={ToyDetails} />
      <Stack.Screen name={SCREENS.TRANSACTION} component={Transaction} />
      <Stack.Screen name={SCREENS.SUCCESS_SCREEN} component={SuccessScreen} />
      <Stack.Screen name={SCREENS.TUTORIAL} component={Tutorial} />
    </Stack.Navigator>
  );
};

export default AuthStack;
