import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Lock from "assets/svg/lockSecond.svg";
import React, { useEffect, useRef, useState } from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import Cook from "assets/icons/chef.svg";
import Calender from "assets/icons/calender.svg";
import { hp, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import Breakfast from "assets/icons/breakfast.svg";
import BreakfastNotSelected from "assets/icons/breakfastNotSelected.svg";
import Lunch from "assets/icons/lunch.svg";
import LunchNotSelect from "assets/icons/lunchNotSelect.svg";
import Snacks from "assets/icons/snacks.svg";
import SnacksNotSelected from "assets/icons/snacksNotSelected.svg";
import Dinner from "assets/icons/dinner.svg";
import DinnerNotSelected from "assets/icons/dinnerNotSelected.svg";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Meals/slice";
import analytics from "@react-native-firebase/analytics";
import {
  selectCurrentPage,
  selectList,
  selectMealLoader,
  selectMeta,
  selectMoreLoading,
  selectfilterFood,
} from "../../Redux/Meals/selectors.";
import { AWS_PATH, PlAN_PATH } from "utils/constrats";
import { SCREENS } from "../../constants/var";
import { MealTypeEnum, TypeEnum } from "../../Redux/Meals/types";
import FilterIcon from "assets/icons/filter.svg";
import { useFocusEffect } from "@react-navigation/native";
import { DateTime } from "luxon";
import { selectPlan } from "../../Redux/Auth/selector";
import { renderEmpty } from "components/renderEmpty";
import { getMyStringValue } from "utils/local-storage";
const MealPlanner = (props: any) => {
  const myScroll = useRef<ScrollView | null>(null);
  const [_nodes, set_nodes] = useState(
    () => new Map<number, TouchableOpacity | null>()
  );
  const mealType = [
    {
      title: "Breakfast",
      icon: <BreakfastNotSelected />,
      selectedType: <Breakfast />,
      value: MealTypeEnum.BREAKFAST,
    },
    {
      title: "Lunch",
      icon: <LunchNotSelect />,
      selectedType: <Lunch />,
      value: MealTypeEnum.LUNCH,
    },
    {
      title: "Snacks",
      icon: <SnacksNotSelected />,
      selectedType: <Snacks />,
      value: MealTypeEnum.SNACKS,
    },
    {
      title: "Dinner",
      icon: <DinnerNotSelected />,
      selectedType: <Dinner />,
      value: MealTypeEnum.DINNER,
    },
  ];
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(actions.setMealLoader(true));
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    dispatch(
      actions.dogetIngredient({
        callback() {},
      })
    );
    dispatch(
      actions.doGetCategoryList({
        callback() {},
      })
    );
  };
  const filter = useSelector(selectfilterFood);
  useEffect(() => {
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    return () => {};
  }, [filter]);
  const data = useSelector(selectList);

  const loading = useSelector(selectMealLoader);
  const gotoDetailPage = (id: any) => {
    props.navigation.navigate(SCREENS.MEAL_DETAILS, {
      id: id,
    });
  };
  const changemealType = (type: any) => {
    dispatch(actions.setList([]));
    dispatch(actions.setMealLoader(true));
    dispatch(
      actions.filterFoodValue({
        name: "MealType",
        value: type,
      })
    );
  };
  const chooseMealType = async (type: any) => {
    await analytics().logEvent("mealLikeAction", {
      mealIdType: type,
    });
    dispatch(actions.setList([]));
    dispatch(actions.setMealLoader(true));
    dispatch(
      actions.filterFoodValue({
        name: "Type",
        value: type,
      })
    );
  };

  const goOnFIlter = () => {
    dispatch(actions.setSearch(""));
    props.navigation.navigate(SCREENS.FILTER);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const CanAccess: any = useSelector(selectPlan);
  const handleDateChange = async (date: any, index: number) => {
    if (CanAccess.isDefault == 0) {
      dispatch(actions.setList([]));
      dispatch(actions.setMealLoader(true));
      dispatch(
        actions.filterFoodValue({
          name: "Date",
          value: date,
        })
      );
      setTimeout(() => {
        scrollToElement(index);
      }, 500);
    } else {
      if (Platform.OS == "android") {
        props.navigation.navigate(SCREENS.PLAN);
      } else {
        let token = await getMyStringValue("@token");
        const url = `${PlAN_PATH}?token=${token}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        }
      }
    }
  };
  const generateDates = () => {
    const dates = [];
    const currentDate = new Date(selectedDate);
    for (let i = -7; i <= 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const formatDate = (dateString: any) => {
    const dateObject = new Date(dateString);
    const dayOfMonth = dateObject.getDate();
    return `${dayOfMonth}`;
  };
  const GOBack = () => {
    props.navigation.goBack();
  };
  const FilterForChef = () => {
    dispatch(actions.setSearch(""));
    props.navigation.navigate(SCREENS.FUNFOOD);
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };
  const meta = useSelector(selectMeta);
  const moreLoading = useSelector(selectMoreLoading);
  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;
  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };

  const scrollToElement = (indexOf: number) => {
    const node = _nodes.get(indexOf);
    node?.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ) => {
        let position = width * (indexOf - 2.5);
        // // console.log("position offset to page: " + position);
        myScroll.current?.scrollTo({ x: position, y: 0, animated: true });
      }
    );
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToElement(7);
    }, 500);
    return () => {};
  }, []);
  const setNode = (index: number, ref: TouchableOpacity | null) => {
    // console.log("_nodes.set(index, ref)", index, ref);
    set_nodes(_nodes.set(index, ref));
  };

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { flex: 1 }]}>
        <View style={{ flex: 0.85 }}>
          <View style={{ padding: 30 }}>
            <BackHeader
              iconStyle={undefined}
              title={t("MEALSOBJ.MEAL_PLANNER")}
              // titleStyle={{ fontSize: 27 }}
              RightIcon={<Cook />}
              goback={GOBack}
              rightIconOnPress={() => FilterForChef()}
            />
            <Image
              source={images.HEADER}
              resizeMode="stretch"
              style={[global.greenShder]}
            />
            <View style={styles.calenderWrap}>
              <View style={styles.monthWrap}>
                <View style={styles.monthWrap}>
                  <Calender />
                  <Text style={styles.monthText}>
                    {/* {filter.Date?.getDate()}{" "} */}
                    {filter.Date?.toLocaleDateString("en-US", {
                      month: "short",
                    })}{" "}
                    {filter.Date?.getFullYear()}
                  </Text>
                </View>
              </View>
              <View style={styles.calender}>
                <ScrollView
                  horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ref={myScroll}
                >
                  {generateDates().map((date, index) => (
                    <TouchableOpacity
                      ref={(ref) => setNode(index, ref)}
                      key={index}
                      onPress={() => handleDateChange(date, index)}
                    >
                      <View
                        style={
                          filter.Date.getDate() == date.getDate()
                            ? styles.dayWrapSelected
                            : styles.dayWrap
                        }
                      >
                        {CanAccess.isDefault == 0 && (
                          <Text
                            style={
                              filter.Date.getDate() == date.getDate()
                                ? styles.dayTextSelected
                                : styles.dayText
                            }
                          >
                            {DateTime.fromJSDate(date).toFormat("ccc")}
                          </Text>
                        )}

                        {CanAccess.isDefault == 0 && (
                          <Text
                            style={
                              filter.Date.getDate() == date.getDate()
                                ? styles.daystrTextSelected
                                : styles.daystrText
                            }
                          >
                            {formatDate(date)}
                          </Text>
                        )}

                        {filter.Date.getDate() == date.getDate() &&
                        CanAccess.isDefault == 1 ? (
                          <>
                            <Text
                              style={
                                filter.Date?.getDate() == date.getDate()
                                  ? styles.dayTextSelected
                                  : styles.dayText
                              }
                            >
                              {DateTime.fromJSDate(date).toFormat("ccc")}
                            </Text>
                            <Text
                              style={
                                filter.Date.getDate() == date.getDate()
                                  ? styles.daystrTextSelected
                                  : styles.daystrText
                              }
                            >
                              {formatDate(date)}
                            </Text>
                          </>
                        ) : (
                          CanAccess.isDefault == 1 && <Lock />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
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
                  onPress={() => chooseMealType(TypeEnum.VEG)}
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
                    filter.Type == TypeEnum.VEG && {
                      backgroundColor: LightTheme.colors.green_3,
                      borderColor: LightTheme.colors.green_3,
                      borderRadius: 50,
                    },
                  ]}
                ></View>
              </View>
              <View style={{ alignItems: "center", marginHorizontal: 7 }}>
                <TouchableOpacity
                  style={[
                    styles.eventBtnWrap,
                    {
                      backgroundColor: LightTheme.colors.light_red,
                      borderColor: LightTheme.colors.red_2,
                    },
                  ]}
                  onPress={() => chooseMealType(TypeEnum.NONVEG)}
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
                    filter.Type == TypeEnum.NONVEG && {
                      backgroundColor: LightTheme.colors.red_2,
                      borderColor: LightTheme.colors.red_2,
                      borderRadius: 50,
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
                  onPress={() => chooseMealType(TypeEnum.EGG)}
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
                    filter.Type == TypeEnum.EGG && {
                      backgroundColor: LightTheme.colors.yellow_primary,
                      borderColor: LightTheme.colors.yellow_primary,
                      borderRadius: 50,
                    },
                  ]}
                ></View>
              </View>
            </View>
            <View style={styles.mealTypesWrap}>
              {mealType.map((meal, index) => (
                <TouchableOpacity onPress={() => changemealType(meal.value)}>
                  <View style={styles.mealType}>
                    {meal.value == filter.MealType
                      ? meal.selectedType
                      : meal.icon}
                    <Text
                      style={[
                        styles.mealTypeTxt,
                        {
                          color:
                            meal.value == filter.MealType
                              ? "#00AAA8"
                              : undefined,
                        },
                      ]}
                    >
                      {meal.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity onPress={goOnFIlter}>
                <FilterIcon />
              </TouchableOpacity>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              style={{ height: "40%" }}
              renderItem={({ item, index }: any) => (
                <View style={{ marginBottom: 20 }}>
                  <TouchableOpacity onPress={() => gotoDetailPage(item?._id)}>
                    <Image
                      source={{ uri: AWS_PATH + item?.image }}
                      style={styles.mealPic}
                      // resizeMode="contain"
                    />
                    <View style={styles.mealNameWrap}>
                      <Text style={styles.mealName}>
                        {capitalizeFirstLetter(item?.englishName)}
                      </Text>
                      <Text
                        style={[
                          styles.mealName,
                          { color: LightTheme.colors.textColor6 },
                        ]}
                      >
                        {item?.calories}cal
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmpty(
                loading,
                "Upcoming recipes on the way"
              )}
              onEndReachedThreshold={0.2}
              onEndReached={fetchMoreData}
            />
          </View>
        </View>
        <View
          style={{ flex: 0.07, backgroundColor: LightTheme.colors.background }}
        >
          <View style={global.flexCenter}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                props.navigation.navigate(SCREENS.ALL_MEAL, {
                  mealType: filter.MealType,
                  type: filter.Type,
                });
                dispatch(actions.setSearch(""));
              }}
            >
              <Text style={styles.btnTxt}>Show More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MealPlanner;

const styles = StyleSheet.create({
  calender: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    // backgroundColor:"red"
  },
  btnTxt: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.white,
  },

  btn: {
    height: 32,
    width: "auto",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: LightTheme.colors.primary_btn,
  },
  dayTextSelected: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 14,
    color: LightTheme.colors.white,
    // marginBottom: 5,
  },
  daystrTextSelected: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 21,
    color: LightTheme.colors.white,
  },
  dayWrapSelected: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: LightTheme.colors.white,
    backgroundColor: LightTheme.colors.primary_btn,
    ...global.flexCenter,
    marginRight: 10,
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
    // paddingHorizontal: 30,
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
    width: 100,
    height: 40,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
  },
  eventDotActive: {
    marginTop: 8,
    height: 10,
    width: 10,
    borderRadius: 50,
  },
  eventBtnTxt: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.semiBold,
  },

  mealTypesWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
});
