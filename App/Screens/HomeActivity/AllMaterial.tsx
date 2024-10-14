import {
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
import analytics from "@react-native-firebase/analytics";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import Calender from "assets/icons/calender.svg";
import { hp, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Home/Activitys/slice";
// import { selectLoading } from "../../Redux/Meals/selectors.";
import { SCREENS } from "../../constants/var";
import { useFocusEffect } from "@react-navigation/native";
import { DateTime } from "luxon";
import {
  selectActivityList,
  selectMaterialDate,
  selectLoading,
  selectActivityDate,
} from "../../Redux/Home/Activitys/selectors.";
import { renderEmpty } from "components/renderEmpty";
import { selectPlan } from "../../Redux/Auth/selector";
import { getMyStringValue } from "utils/local-storage";
import { PlAN_PATH } from "utils/constrats";
const MealPlanner = (props: any) => {
  const { t } = useTranslation();
  const myScroll = useRef<ScrollView | null>(null);
  const [_nodes, set_nodes] = useState(
    () => new Map<number, TouchableOpacity | null>()
  );
  const dispatch = useDispatch();
  const todayNew = new Date();
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => {
        unsubscribe;
        dispatch(actions.setLoading(true));
        dispatch(actions.setActivityList([]));
        dispatch(actions.setActivityDate(todayNew));
        setTimeout(() => {
          scrollToElement(7);
        }, 500);
      };
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetAllActivityList({
        callback() {},
      })
    );
  };

  const data = useSelector(selectActivityList);
  const loading = useSelector(selectLoading);
  const renderItemMaterial = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.btn,
          marginRight: 7,
          // backgroundColor: "#29E33BC4",
          paddingHorizontal: 12,
          paddingVertical: 8,
          width: "auto",
          height: "auto",
        }}
      >
        <Text style={styles.physicalFontStyle}>{item}</Text>
      </TouchableOpacity>
    );
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
    dispatch(actions.setLoading(true));
    dispatch(actions.setActivityList([]));
    dispatch(actions.setActivityDate(todayNew));
    props.navigation.goBack();
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
        // // console.log("position Component width is: " + width);
        // // console.log("position Component height is: " + height);
        // // console.log("position X offset to frame: " + fx);
        // // console.log("position Y offset to frame: " + fy);
        // // console.log("position X offset to page: " + px);
        // // console.log("position Y offset to page: " + py);
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
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("OTHER.MATERIAL")}
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
                {dateMain?.toLocaleDateString("en-US", {
                  month: "short",
                })}
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

        <View>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
              data={data}
              renderItem={({ item, index }: any) => (
                <>
                  <View style={styles.mainContainer}>
                    <View style={styles.activityContainer}>
                      <View style={{}}>
                        <Text style={styles.parentFontStyle}>
                          {item.englishTitle}
                        </Text>
                        <Text
                          style={{
                            ...styles.parentFontStyle,
                            color: "#FF0000",
                            fontSize: 14,
                            fontFamily: LightTheme.fontFamily.semiBold,
                          }}
                        >
                          {t("OTHER.MATERIAL")}
                        </Text>
                      </View>
                      <View style={styles.alignContainer}>
                        <View style={styles.btnContainer}>
                          <ScrollView
                            horizontal
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                          >
                            {item.englishMaterial.map(renderItemMaterial)}
                          </ScrollView>
                        </View>
                      </View>
                      <View style={styles.lineContainer}>
                        <View style={styles.line}></View>
                      </View>
                    </View>
                  </View>
                </>
              )}
              ListEmptyComponent={renderEmpty(loading, "Data not available")}
            />
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
  mainContainer: {
    marginBottom: 27,
  },
  activityContainer: {
    // marginBottom: Constants.CHANGE_BY_MOBILE_DPI(20),
  },

  activityFontStyle: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },
  btn: {
    flex: 1,
    borderRadius: 5,
    height: 25,
    // width: Constants.CHANGE_BY_MOBILE_DPI(103),
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",

    width: 100,

    backgroundColor: LightTheme.colors.green_6,
  },
  physicalFontStyle: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
  },
  parentFontStyle: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
    marginTop: 0,
  },
  line: {
    height: 1,
    backgroundColor: "#EFEFEF",
  },
  lineContainer: {
    marginTop: 27,
  },
  alignContainer: {},
});
