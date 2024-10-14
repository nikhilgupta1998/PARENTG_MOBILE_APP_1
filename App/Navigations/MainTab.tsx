import { Image, Platform, StatusBar, StyleSheet } from "react-native";
import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SCREENS } from "../constants/var";
import Home from "../Screens/Home/Home";
import { images } from "../constants/img";
import { LightTheme } from "../utils/theme";
import global from "../styles/global";
import MealPlanner from "../Screens/Meals/MealPlanner";
import CommunityPost from "../Screens/community/Post";
import Explore from "../Screens/Explore/Explore";
import Category from "../Screens/Explore/Category";
import normalize from "react-native-normalize";
const MainTab = () => {
  const Tab = createBottomTabNavigator();
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarLabelStyle: {
      fontFamily: LightTheme.fontFamily.semiBold,
      fontSize: 9,
    },
    tabBarActiveTintColor: LightTheme.colors.focused_icon,
    tabBarStyle: {
      height:normalize(Platform.OS == "android" ? 60 : 80),
      elevation: 0,
      backgroundColor: LightTheme.colors.background,
    },

    tabBarItemStyle: {
      alignItems: "center",
    },
    tabBarLabelPosition: "below-icon",
  };



  return (
    <>
      <StatusBar
        backgroundColor={LightTheme.colors.background}
        barStyle={"dark-content"}
      />
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={images.HOME}
                  resizeMode="contain"
                  style={[
                    global.tabbarIcon,
                    {
                      tintColor: focused
                        ? LightTheme.colors.focused_icon
                        : LightTheme.colors.unfocused_icon,
                    },
                  ]}
                />
              );
            },
          }}
          name={SCREENS.HOME}
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={images.MILESTONE}
                  resizeMode="contain"
                  style={[
                    global.tabbarIcon,
                    {
                      tintColor: focused
                        ? LightTheme.colors.focused_icon
                        : LightTheme.colors.unfocused_icon,
                    },
                  ]}
                />
              );
            },
          }}
          name={SCREENS.MILESTONE}
          component={Category}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={images.MEALS}
                  resizeMode="contain"
                  style={[
                    global.tabbarIcon,
                    {
                      tintColor: focused
                        ? LightTheme.colors.focused_icon
                        : LightTheme.colors.unfocused_icon,
                    },
                  ]}
                />
              );
            },
          }}
          name={SCREENS.MEAL_LIST}
          component={MealPlanner}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={images.WEB}
                  resizeMode="contain"
                  style={[
                    global.tabbarIcon,
                    {
                      tintColor: focused
                        ? LightTheme.colors.focused_icon
                        : LightTheme.colors.unfocused_icon,
                    },
                  ]}
                />
              );
            },
          }}
          name={SCREENS.COMMUNITY}
          component={CommunityPost}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={images.SEARCH}
                  resizeMode="contain"
                  style={[
                    global.tabbarIcon,
                    {
                      tintColor: focused
                        ? LightTheme.colors.focused_icon
                        : LightTheme.colors.unfocused_icon,
                    },
                  ]}
                />
              );
            },
          }}
          name={SCREENS.MENU}
          component={Explore}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainTab;

const styles = StyleSheet.create({});
