import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import Cook from "assets/icons/chef.svg";
import { hp, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import Breakfast from "assets/icons/breakfast.svg";
import Lunch from "assets/icons/lunch.svg";
import Snacks from "assets/icons/snacks.svg";
import Dinner from "assets/icons/dinner.svg";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
const MealInfo = () => {
  const mealType = [
    { title: "Breakfast", icon: <Breakfast /> },
    { title: "Lunch", icon: <Lunch /> },
    { title: "Snacks", icon: <Snacks /> },
    { title: "Dinner", icon: <Dinner /> },
  ];
  const { t } = useTranslation();
  return (
    <SafeAreaView style={[global.wrap, { padding: 30 }]}>
      <BackHeader  iconStyle={undefined} 
        title={t("MEALSOBJ.MEAL_PLANNER")}
        titleStyle={{ fontSize: 27 }}
        RightIcon={<Cook />}
        goback={undefined}
        rightIconOnPress={undefined}
      />
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <View style={styles.eventBtns}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.eventBtnWrap,
              {
                backgroundColor: LightTheme.colors.green_4,
                borderColor: LightTheme.colors.green_3,
              },
            ]}
          >
            <Text
              style={[
                styles.eventBtnTxt,
                {
                  color: LightTheme.colors.green_3,
                },
              ]}
            >
              {t("MEALSOBJ.VEG")}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.green_3,
                borderColor:  LightTheme.colors.green_3,
                borderRadius:50
              },
            ]}
          ></View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.eventBtnWrap,
              {
                backgroundColor: LightTheme.colors.light_red,
                borderColor: LightTheme.colors.red_2,
              },
            ]}
          >
            <Text
              style={[
                styles.eventBtnTxt,
                {
                  color: LightTheme.colors.red_2,
                },
              ]}
            >
              {t("MEALSOBJ.NON_VEG")}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.red_2,
                borderColor:  LightTheme.colors.red_2,
                borderRadius:50
              },
            ]}
          ></View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.eventBtnWrap,
              {
                backgroundColor: LightTheme.colors.yellow_2,
                borderColor: LightTheme.colors.yellow_primary,
              },
            ]}
          >
            <Text
              style={[
                styles.eventBtnTxt,
                {
                  color: LightTheme.colors.yellow_primary,
                },
              ]}
            >
              {t("MEALSOBJ.EGG_MEALS")}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.yellow_primary,
                borderColor:  LightTheme.colors.yellow_primary,
                borderRadius:50
              },
            ]}
          ></View>
        </View>
      </View>

      <View style={styles.mealTypesWrap}>
        {mealType.map((meal, index) => (
          <View style={styles.mealType}>
            {meal.icon}
            <Text style={styles.mealTypeTxt}>{meal.title}</Text>
          </View>
        ))}
      </View>

      <View>
        <Image
          source={images.MEAL_2}
          style={styles.mealPic}
          // resizeMode="contain"
        />
        <View style={styles.mealNameWrap}>
          <Text style={styles.mealName}>{t("MEALSOBJ.MEXICAN_SALAD")}</Text>
          <Text
            style={[styles.mealName, { color: LightTheme.colors.textColor6 }]}
          >
            18cal
          </Text>
        </View>
      </View>

      <View style={{ marginVertical: 15 }}>
        <Text style={[styles.mealName, { marginBottom: 12 }]}>
          Ingredients:
        </Text>
        <Text style={styles.mealStep}>
          Cucumber (1pc), Tomato (1pc), Salt (1 table spoon)
        </Text>
      </View>
      <View style={{ marginVertical: 15 }}>
        <Text style={[styles.mealName, { marginBottom: 12 }]}>Steps:</Text>
        <Text style={styles.mealStepItem}>1. Wash the vegetables</Text>
        <Text style={styles.mealStepItem}>1. Wash the vegetables</Text>
        <Text style={styles.mealStepItem}>1. Wash the vegetables</Text>
        <Text style={styles.mealStepItem}>1. Wash the vegetables</Text>
      </View>
    </SafeAreaView>
  );
};

export default MealInfo;

const styles = StyleSheet.create({
  calender: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    // backgroundColor:"red"
  },
  calenderWrap: {
    width: "100%",
    alignItems: "center",
    marginVertical: 25,
  },
  monthWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  monthText: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    lineHeight: 21,
    color: LightTheme.colors.primary_btn,
    marginHorizontal: 8,
  },
  dayText: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 14,
    color: LightTheme.colors.black,
    // marginBottom: 5,
  },
  daystrText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 21,
    color: LightTheme.colors.black,
  },
  dayWrap: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
    ...global.flexCenter,
    marginRight: 10,
  },
  eventBtns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: hp(3),
  },
  eventBtnWrap: {
    width: 107,
    height: 40,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
  },
  eventDotActive: {
    marginTop: 8,
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  eventBtnTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
  },

  mealTypesWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
  },

  mealType: {},
  mealTypeTxt: {
    fontSize: 9,
    fontFamily: LightTheme.fontFamily.semiBold,
    marginTop: 5,
    color: LightTheme.colors.headerTextColor_2,
  },

  mealPic: {
    width: "100%",
    height: hp(23),
    borderRadius: 12,
  },

  mealNameWrap: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  mealName: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
  },

  mealStep: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
  },
  mealStepItem: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    marginBottom: 8,
  },
});
