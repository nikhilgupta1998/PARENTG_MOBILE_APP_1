import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Lock from "assets/svg/lockSecond.svg";
import React, { useEffect, useRef, useState } from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import Calender from "assets/icons/calender.svg";
import { hp, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Home/Activitys/slice";
import { AWS_PATH, PlAN_PATH } from "utils/constrats";
import { SCREENS } from "../../constants/var";
import { useFocusEffect } from "@react-navigation/native";
import { DateTime } from "luxon";
import Done from "assets/svg/done.svg";
import analytics from "@react-native-firebase/analytics";
import Complete from "assets/svg/Completesec.svg";
import {
  selectActivityList,
  selectActivityDate,
  selectLoading,
} from "../../Redux/Home/Activitys/selectors.";
import { renderEmpty } from "components/renderEmpty";
import { selectPlan } from "../../Redux/Auth/selector";
import showToast from "utils/toast";
import { getMyStringValue } from "utils/local-storage";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const MealPlanner = (props: any) => {
  const myScroll = useRef<ScrollView | null>(null);
  const flatListRef = useRef<FlatList | null>(null);
  const [_nodes, set_nodes] = useState(
    () => new Map<number, TouchableOpacity | null>()
  );
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => {
        unsubscribe;
        dispatch(actions.setLoading(true));
        dispatch(actions.setActivityList([]));
        dispatch(actions.setActivityDate(todayNew));
      };
    }, [])
  );
  const onLoad = async () => {
    dispatch(actions.setLoading(true));
    dispatch(
      actions.doGetAllActivityList({
        callback() {},
      })
    );
  };
  const data = useSelector(selectActivityList);

  const loading = useSelector(selectLoading);
  const gotoDetailPage = (id: any) => {
    props.navigation.navigate(SCREENS.ACITIVITY_DETAILS, {
      id: id,
    });
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const CanAccess: any = useSelector(selectPlan);
  const handleDateChange = async (date: any, index: number) => {
    if (CanAccess.isDefault == 0) {
      dispatch(actions.setLoading(true));
      dispatch(actions.setActivityList([]));
      dispatch(actions.setActivityDate(date));
      setTimeout(() => {
        scrollToElement(index);
      }, 500);
      await analytics().logEvent("modifyDateFilter", {});
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
  const todayNew = new Date();
  useEffect(() => {
    dispatch(actions.setLoading(true));
    dispatch(actions.setActivityList([]));
    dispatch(actions.setActivityDate(todayNew));
    setTimeout(() => {
      scrollToElement(7);
    }, 500);
    return () => {};
  }, []);

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
    dispatch(actions.setLoading(true));
    dispatch(actions.setActivityList([]));
    dispatch(actions.setActivityDate(todayNew));
  };
  const dateMain = useSelector(selectActivityDate);
  useEffect(() => {
    dispatch(actions.doGetAllActivityList({ callback() {} }));

    return () => {};
  }, [dateMain]);

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
  const doComplete = async (id: string, isCompleted: any, index: number) => {
    const toggleBookmark = (isCompleted: boolean) =>
      isCompleted === true ? false : true;
    if (!isCompleted) {
      dispatch(
        actions.setCompleteActivityList({
          isCompleted: toggleBookmark(isCompleted),
          index,
        })
      );
      dispatch(
        actions.CompleteActivity({
          id: id,
          callback() {},
        })
      );
      await analytics().logEvent("activityCompletion", {
        activityId: id,
      });
    } else {
      showToast("Your activity is already completed");
    }
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={"Activity"}
          titleStyle={{ fontSize: 27 }}
          RightIcon={undefined}
          goback={GOBack}
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

        <View style={styles.calenderWrap}>
          <View style={styles.monthWrap}>
            <View style={styles.monthWrap}>
              <Calender />
              <Text style={styles.monthText}>
                {/* {dateMain?.getDate()}{" "} */}
                {dateMain?.toLocaleDateString("en-US", {
                  month: "short",
                })}{" "}
                {dateMain?.getFullYear()}
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
                  onPress={() => handleDateChange(date, index)}
                >
                  <View
                    style={
                      dateMain.getDate() == date.getDate()
                        ? styles.dayWrapSelected
                        : styles.dayWrap
                    }
                  >
                    {CanAccess.isDefault == 0 && (
                      <Text
                        style={
                          dateMain.getDate() == date.getDate()
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
                          dateMain.getDate() == date.getDate()
                            ? styles.daystrTextSelected
                            : styles.daystrText
                        }
                      >
                        {formatDate(date)}
                      </Text>
                    )}

                    {dateMain.getDate() == date.getDate() &&
                    CanAccess.isDefault == 1 ? (
                      <>
                        <Text
                          style={
                            dateMain?.getDate() == date.getDate()
                              ? styles.dayTextSelected
                              : styles.dayText
                          }
                        >
                          {DateTime.fromJSDate(date).toFormat("ccc")}
                        </Text>
                        <Text
                          style={
                            dateMain.getDate() == date.getDate()
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

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          ref={flatListRef}
          style={{ marginBottom: Platform.OS == "android" ? 0 : 70 }}
          renderItem={({ item, index }: any) => (
            <>
              <TouchableOpacity onPress={() => gotoDetailPage(item?._id)}>
                <View style={styles.container}>
                  <Image
                    source={{ uri: AWS_PATH + item?.image }}
                    style={styles.mealPic}
                  />
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() =>
                      doComplete(item._id, item.isCompleted, index)
                    }
                  >
                    {item.isCompleted ? <Complete /> : <Done />}
                  </TouchableOpacity>
                </View>
                <View style={styles.mealNameWrap}>
                  <Text style={styles.mealName}>{item?.englishTitle}</Text>
                </View>
              </TouchableOpacity>
              <Text
                style={[
                  styles.mealName,
                  { color: LightTheme.colors.textColor6, fontSize: 13 },
                ]}
              >
                {item?.englishPurpose}
              </Text>
            </>
          )}
          ListEmptyComponent={renderEmpty(loading, "Data not available")}
        />
      </View>
    </SafeAreaView>
  );
};

export default MealPlanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  circle: {
    position: "absolute",
    top: 25,
    right: 10,
    // paddingLeft:3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "white",
  },
  calender: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    // backgroundColor:"red"
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
    borderRadius: 50,
  },
  eventBtnTxt: {
    fontSize: 11,
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
    marginTop: 20,
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
