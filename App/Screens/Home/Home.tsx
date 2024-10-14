import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Bell from "assets/icons/bell.svg";
import Plus from "assets/icons/plus.svg";
import Calender from "assets/icons/calender.svg";
import { width } from "../../constants/Dimenstions";
import { images } from "../../constants/img";
import LinearGradient from "react-native-linear-gradient";
import CustomModal from "components/Modal";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import analytics from "@react-native-firebase/analytics";
import { actions as action } from "../../Redux/Auth/slice";
import { actions as actionsNotification } from "../../Redux/Notification/slice";
import {
  selectChildList,
  selectPlan,
  selectProfileForm,
} from "../../Redux/Auth/selector";
import { actions } from "../../Redux/Home/Activitys/slice";
import Lock from "assets/svg/lockSecond.svg";
import {
  selectDate,
  selectList,
  selectMealList,
  selectToyList,
} from "../../Redux/Home/Activitys/selectors.";
import { AWS_PATH, PlAN_PATH } from "utils/constrats";
import { useFocusEffect } from "@react-navigation/native";
import { DateTime } from "luxon";
import { selectNewNotification } from "../../Redux/Notification/selectors.";
import FloatingButton from "components/FloatingButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMyStringValue } from "utils/local-storage";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const Home = (props: any) => {
  const DOUBLE_PRESS_DELAY = 400;
  const dispatch = useDispatch();
  const myScroll = useRef<ScrollView | null>(null);
  const [_nodes, set_nodes] = useState(
    () => new Map<number, TouchableOpacity | null>()
  );
  const todayNew = new Date();
  const [open, setOpen] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => {
        unsubscribe;
        dispatch(actions.setdate(todayNew));
        setTimeout(() => {
          scrollToElement(7);
        }, 500);
      };
    }, [])
  );
  useEffect(() => {
    dispatch(actions.setdate(todayNew));
    setTimeout(() => {
      scrollToElement(7);
    }, 500);
  }, []);
  const onLoad = async () => {
    dispatch(
      action.doGetChildList({
        callback() {},
      })
    );
    dispatch(actions.doGetList({ callback() {} }));
    dispatch(actions.doGetMealList({ callback() {} }));
    dispatch(actions.doGetToyList({ callback() {} }));
    dispatch(action.getMeRequestSecond({ callback() {} }));
    dispatch(actionsNotification.doGetList({ callback() {} }));
  };
  const data3 = [
    {
      img: images.DOC,
      title: "Dr. Raj Bedi",
      caption: "Cardiologist, 15 years",
    },
    {
      img: images.DOC,
      title: "Dr. Raj Bedi",
      caption: "Cardiologist, 15 years",
    },
  ];
  const AddChild = () => {
    props.navigation.navigate(SCREENS.KIDS);
    setOpen(false);
  };
  const goNotification = () => {
    props.navigation.navigate(SCREENS.NOTIFICATIONS);
  };
  const SelectChild = async (id: any) => {
    await analytics().logEvent("selectedChildChanged", {
      selectChild: id,
    });
    setOpen(false);
    dispatch(
      actions.selectChild({
        id: id,
        callback() {
          dispatch(action.getMeRequestSecond({ callback() {} }));
          dispatch(actions.doGetList({ callback() {} }));
          dispatch(actions.doGetMealList({ callback() {} }));
          dispatch(actions.doGetToyList({ callback() {} }));
          props.navigation.navigate(SCREENS.HOME);
        },
      })
    );
  };

  const list = useSelector(selectChildList);
  const data: any = useSelector(selectProfileForm);
  var selectedChildDetail: any = list.filter(
    (item) => item?._id == data.selectedChild
  );

  const { t } = useTranslation();

  const activityList: any = useSelector(selectList);
  const newNotification = useSelector(selectNewNotification);

  const doGoDetails = (id: string) => {
    dispatch(actions.clearBlogDetails());
    props.navigation.navigate(SCREENS.ACITIVITY_DETAILS, {
      id: id,
    });
  };
  const toysList = useSelector(selectToyList);
  const meal = useSelector(selectMealList);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = async (date: any, index: number) => {
    if (CanAccess.isDefault == 0) {
      dispatch(actions.setdate(date));
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
  const dateMain = useSelector(selectDate);
  useEffect(() => {
    dispatch(actions.doGetList({ callback() {} }));
    dispatch(actions.doGetMealList({ callback() {} }));
    dispatch(actions.doGetToyList({ callback() {} }));
    return () => {};
  }, [dateMain]);

  useEffect(() => {
    setTimeout(() => {
      scrollToElement(7);
    }, 500);
    return () => {};
  }, []);

  const formatDate = (dateString: any) => {
    const dateObject = new Date(dateString);
    const dayOfMonth = dateObject.getDate();
    return ` ${dayOfMonth}`;
  };
  const goToActivityPage = () => {
    props.navigation.navigate(SCREENS.ALL_ACTIVITY);
  };
  const goToMealPage = () => {
    props.navigation.navigate(SCREENS.MEAL_LIST);
  };
  const goToToyPage = () => {
    props.navigation.navigate(SCREENS.TOYS);
  };
  const goToMaterialPage = () => {
    dispatch(actions.setLoading(true));
    dispatch(actions.setActivityList([]));
    props.navigation.navigate(SCREENS.ALL_MATERIAL);
  };
  const gotoDetailPage = (id: any) => {
    props.navigation.navigate(SCREENS.MEAL_DETAILS, {
      id: id,
    });
  };
  const capitalizeFirstLetter = (str: string): string => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
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
  const setNode = (index: number, ref: TouchableOpacity | null) => {
    set_nodes(_nodes.set(index, ref));
  };
  const calculateProgress = () => {
    const val =
      (2 * ((activityList.totalCompleted / activityList.total) * 100)) / 100;

    if (isNaN(val)) {
      return 0;
    } else {
      return val;
    }
  };
  const [lastPress, setLastPress] = useState(0);
  const [lastPressed, setLastPressed] = useState(0);
  const [tap, setTap] = useState("...");
  let timer: any = null;
  const TIMEOUT = 300;
  const debounce = (onSingle: any, onDouble: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      onDouble();
      if (list.length > 1) {
        var selectedChildDetail: any = list.filter(
          (item) => item?._id != data.selectedChild
        );

        SelectChild(selectedChildDetail[0]._id);
      } else {
        setOpen(!open);
      }
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        onSingle();
        props.navigation.navigate(SCREENS.PROFILE_MENU);
      }, TIMEOUT);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setTap("...");
    }, 100);
  }, [tap]);
  const onSingleTap = () => setTap("single tap");
  const onDoubleTap = () => setTap("double tap");

  const handleDoublePress = () => {
    debounce(onSingleTap, onDoubleTap);
  };
  const handleFloatClick = () => {
    props.navigation.navigate(SCREENS.ANALYTICS);
  };
  const CanAccess: any = useSelector(selectPlan);

  return (
    <SafeAreaView style={global.wrap}>
      <ScrollView
        style={global.wrap}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={global.greenShder}
        />

        <View style={styles.headerWrap}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>
              {t("HELLO")} {selectedChildDetail[0]?.name}!
            </Text>
            <Text style={styles.profileInfo}>{t("HOME.SWITCH_PROFILE")}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.bellIconWrap}>
              <TouchableOpacity onPress={() => goNotification()}>
                <View style={styles.bellIcon}>
                  <Bell />
                </View>
              </TouchableOpacity>
              <Text style={styles.notificationCount}>
                {newNotification > 0 ? newNotification : ""}
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={handleDoublePress}>
              <Image
                resizeMode="contain"
                source={{ uri: AWS_PATH + selectedChildDetail[0]?.profilePic }}
                style={styles.avatar}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.calenderWrap}>
          <View style={styles.monthWrap}>
            <Calender />
            <Text style={styles.monthText}>
              {dateMain?.toLocaleDateString("en-US", {
                month: "short",
              })}{" "}
              {dateMain?.getFullYear()}
            </Text>
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
                  key={index}
                  ref={(ref) => setNode(index, ref)}
                  onPress={() =>
                    handleDateChange(date, index)
                  }
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
        <View style={styles.eventBtns}>
          <View>
            <TouchableOpacity
              onPress={() => goToActivityPage()}
              style={[
                styles.eventBtnWrap,
                {
                  backgroundColor: LightTheme.colors.violet_2,
                  borderColor: LightTheme.colors.violet_primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.eventBtnTxt,
                  {
                    color: LightTheme.colors.violet_primary,
                  },
                ]}
              >
                {t("ACTIVITIES")}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => goToMaterialPage()}
              style={[
                styles.eventBtnWrap,
                {
                  backgroundColor: LightTheme.colors.green_1,
                  borderColor: LightTheme.colors.primary_btn,
                },
              ]}
            >
              <Text
                style={[
                  styles.eventBtnTxt,
                  {
                    color: LightTheme.colors.primary_btn,
                  },
                ]}
              >
                {t("HOME.MATERIALS")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          style={{
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            height: 56,
            ...global.flexCenter,
            borderWidth: 0.5,
            borderColor: LightTheme.colors.input_border_color,
            marginVertical: 20,
          }}
          start={{ x: 0, y: 0 }}
          end={{
            x: calculateProgress(),
            y: 0,
          }}
          locations={[0, 0.4, 0.7]}
          colors={[
            "rgba(38, 192, 45, 1)",
            "rgba(38, 192, 45, 1)",
            LightTheme.colors.white,
          ]}
        >
          <Text style={styles.btnText}>
            {t("ACTIVITIES")} ({activityList.totalCompleted}/
            {activityList.total || 0})
          </Text>
        </LinearGradient>

        {activityList.data?.length > 0 && (
          <>
            <View style={styles.tmcWrap}>
              <Text style={styles.tmcText1}>
                {t("HOME.RECOMMENDED_ACTIVITIES_FOR")}
              </Text>
              <Text style={styles.tmcText2}>
                {" "}
                {selectedChildDetail[0]?.name}
              </Text>
            </View>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <>
                <FlatList
                  data={activityList.data}
                  contentContainerStyle={{
                    paddingLeft: 20,
                  }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexGrow: 0, marginTop: 15 }}
                  horizontal
                  renderItem={({ item }) => (
                    <View key={item._id}>
                      <TouchableOpacity onPress={() => doGoDetails(item?._id)}>
                        <ImageBackground
                          style={styles.activityImg}
                          source={{ uri: AWS_PATH + item?.image }}
                          key={item?._id}
                        >
                          <LinearGradient
                            colors={["transparent", LightTheme.colors.img_bg_1]}
                            locations={[0.7, 1]}
                            style={[
                              styles.imgLayer,
                              { alignItems: "flex-start" },
                            ]}
                          >
                            <Text style={styles.imgTopText}>
                              {item?.englishTitle}
                            </Text>
                          </LinearGradient>
                        </ImageBackground>
                      </TouchableOpacity>
                      {/* <Text style={[styles.imgText]} numberOfLines={2}>
                      {item?.englishPurpose}
                    </Text> */}
                    </View>
                  )}
                />
                <TouchableOpacity
                  style={{ flexGrow: 0, marginTop: 15 }}
                  onPress={() => goToActivityPage()}
                >
                  <ImageBackground
                    style={styles.activityImgShow}
                    source={images.TOY2}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={["transparent", LightTheme.colors.img_bg_1]}
                      locations={[0.7, 1]}
                      style={[styles.imgLayer, { alignItems: "flex-start" }]}
                    >
                      <Text style={styles.imgTopText}>
                        {t("OTHER.VIEW_MORE")}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </>
            </ScrollView>
          </>
        )}

        {meal.length > 0 && (
          <>
            <Text style={styles.heading}>{t("HOME.TODAY_EXCITING_MEALS")}</Text>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <>
                <FlatList
                  data={meal}
                  contentContainerStyle={{
                    paddingLeft: 20,
                  }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexGrow: 0, marginTop: 15 }}
                  horizontal
                  renderItem={({ item, index }: any) => (
                    <TouchableOpacity onPress={() => gotoDetailPage(item?._id)}>
                      <ImageBackground
                        style={styles.activityImg}
                        source={{ uri: AWS_PATH + item?.image }}
                        key={index}
                      >
                        <LinearGradient
                          colors={["transparent", LightTheme.colors.img_bg_1]}
                          locations={[0.7, 1]}
                          style={[
                            styles.imgLayer,
                            { alignItems: "flex-start" },
                          ]}
                        >
                          <Text style={styles.imgTopText}>
                            {capitalizeFirstLetter(item?.englishName)}
                          </Text>
                        </LinearGradient>
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={{ flexGrow: 0, marginTop: 15 }}
                  onPress={() => goToMealPage()}
                >
                  <ImageBackground
                    style={styles.activityImgShow}
                    source={images.MEAL}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={["transparent", LightTheme.colors.img_bg_1]}
                      locations={[0.7, 1]}
                      style={[styles.imgLayer, { alignItems: "flex-start" }]}
                    >
                      <Text style={styles.imgTopText}>
                        {t("OTHER.VIEW_MORE")}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </>
            </ScrollView>
          </>
        )}

        {/* <View>
          <Text style={styles.heading}>
            {t("HOME.EXPERTS_DOCTORS_IN_A_CLICK")}
          </Text>
          <FlatList
            data={data3}
            style={{ flexGrow: 0, marginTop: 22 }}
            contentContainerStyle={{
              paddingHorizontal: 30,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) => (
              <View>
                <ImageBackground
                  style={styles.activityImg}
                  source={item?.img}
                  key={index}
                >
                  <LinearGradient
                    colors={[
                      LightTheme.colors.img_bg_2,
                      LightTheme.colors.img_bg_1,
                    ]}
                    style={[styles.imgLayer, { alignItems: "flex-start" }]}
                  >
                    <Text style={styles.imgTopText}>{item?.title}</Text>
                    <Text style={styles.imgCaption}>{item?.caption}</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
            )}
          />
        </View> */}
        {CanAccess.toy && toysList?.length > 0 ? (
          <>
            <View>
              <Text style={styles.heading}>{t("HOME.TOY_RECOMMENDATION")}</Text>
            </View>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <>
                <FlatList
                  data={toysList}
                  contentContainerStyle={{
                    paddingLeft: 20,
                  }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexGrow: 0, marginTop: 15 }}
                  horizontal
                  renderItem={({ item, index }: any) => (
                    <TouchableOpacity
                      key={item?._id}
                      onPress={() => {
                        props.navigation.navigate(SCREENS.TOYDETAIL, {
                          id: item?._id,
                        });
                      }}
                    >
                      <View>
                        <ImageBackground
                          style={styles.activityImg}
                          source={{ uri: AWS_PATH + item?.image }}
                          key={index}
                        >
                          <LinearGradient
                            colors={["transparent", LightTheme.colors.img_bg_1]}
                            locations={[0.7, 1]}
                            style={[
                              styles.imgLayer,
                              { alignItems: "flex-start" },
                            ]}
                          >
                            <Text style={styles.imgTopText}>
                              {item?.englishTitle}
                            </Text>
                          </LinearGradient>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={{ flexGrow: 0, marginTop: 15 }}
                  onPress={() => goToToyPage()}
                >
                  <ImageBackground
                    style={styles.activityImgShow}
                    source={images.TOY}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={["transparent", LightTheme.colors.img_bg_1]}
                      locations={[0.7, 1]}
                      style={[styles.imgLayer, { alignItems: "flex-start" }]}
                    >
                      <Text style={styles.imgTopText}>
                        {t("OTHER.VIEW_MORE")}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </>
            </ScrollView>
          </>
        ) : null}
      </ScrollView>

      <CustomModal
        modalizeRef={null}
        open={open}
        onBackdropPress={() => {
          setOpen(false);
        }}
      >
        <View style={global.modalWrap}>
          <FlatList
            data={list}
            style={{ flexGrow: 0 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => SelectChild(item?._id)}>
                <View style={styles.switchProfileWrap} key={index}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: AWS_PATH + item?.profilePic }}
                      style={styles.switchAvatar}
                      resizeMode="contain"
                    />
                    <Text style={styles.switchProfileTxt}>{item?.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          {list.length < 2 && (
            <TouchableOpacity onPress={AddChild}>
              <View style={styles.switchProfileWrapSecond}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <View style={styles.switchProfileAddIcon}>
                    <Plus />
                  </View>
                  <Text
                    style={[
                      styles.switchProfileTxt,
                      { color: LightTheme.colors.primary_btn },
                    ]}
                  >
                    {t("HOME.ADD_CHILD")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </CustomModal>
      <FloatingButton handleClick={handleFloatClick} />
      {/* <SelectLanguage open={open} setOpen={setOpen} /> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  containerCheck: {
    flex: 1,
    justifyContent: "flex-end", // Align the content at the bottom of the container
  },
  fill: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerLeft: {
    flex: 0.8,
  },

  name: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 28,
    color: LightTheme.colors.textColor1,
  },

  profileInfo: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 17,
    color: LightTheme.colors.primary_btn,
  },

  headerRight: {
    flexDirection: "row",
    // alignItems: "center",
  },
  bellIconWrap: {
    alignItems: "center",
    marginRight: 15,
  },

  notificationCount: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 18,
    color: LightTheme.colors.primary_btn,
  },
  bellIcon: {
    width: 44,
    height: 44,
    borderRadius: 25,
    ...global.flexCenter,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 25,
  },
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
    paddingHorizontal: 20,
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
  dayWrap: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
    ...global.flexCenter,
    marginRight: 10,
  },
  dayWrapInput: {
    display: "none",
  },
  eventBtns: {
    paddingHorizontal: 20,
    width: "99%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  eventBtnWrap: {
    width: 150,
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

  btn: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    height: 56,
    ...global.flexCenter,
    backgroundColor: LightTheme.colors.primary_btn,
    borderWidth: 0.5,
    borderColor: LightTheme.colors.input_border_color,
    marginVertical: 20,
  },
  btnText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
  },

  tmcWrap: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tmcText1: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor1,
    lineHeight: 21,
  },
  tmcText2: {
    flexWrap: "wrap",
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.primary_btn,
    lineHeight: 21,
  },
  activityImg: {
    width: 237,
    height: 230,
    borderRadius: 16,
    marginRight: 20,
    overflow: "hidden",
  },
  activityImgShow: {
    width: 210,
    height: 230,
    borderRadius: 16,
    marginRight: 20,
    overflow: "hidden",
  },
  imgLayer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
  },
  container: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  datePicker: {
    marginRight: 10,
  },
  dateInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    alignItems: "flex-start",
    paddingLeft: 10,
    borderColor: "#ccc",
  },
  dateText: {
    fontSize: 18,
  },
  imgTopText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.white,
    lineHeight: 21,
  },
  imgText: {
    flexWrap: "wrap",
    width: 150,
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor3,
    marginTop: 8,
    marginLeft: 2,
  },
  imgCaption: {
    fontSize: 9,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.white,
    lineHeight: 21,
  },

  heading: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    lineHeight: 21,
    marginTop: 20,
    paddingHorizontal: 20,
  },

  switchProfileWrap: {
    height: 90,
    borderBottomColor: LightTheme.colors.booking_border,
    borderBottomWidth: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  switchProfileWrapSecond: {
    height: 70,
    borderBottomColor: LightTheme.colors.booking_border,
    borderBottomWidth: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  switchAvatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 15,
  },

  switchProfileTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
  },
  txt1: {
    fontSize: 28,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
  switchProfileAddIcon: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: LightTheme.colors.green_6,
    ...global.flexCenter,
  },
});
