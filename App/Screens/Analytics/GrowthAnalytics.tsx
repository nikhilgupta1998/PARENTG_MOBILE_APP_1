import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import analytics from "@react-native-firebase/analytics";
import React, { useEffect, useState } from "react";
import { LightTheme } from "../../utils/theme";
import BackHeader from "components/BackHeader";
import { actions } from "../../Redux/Analytics/slice";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { useTranslation } from "react-i18next";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome";
import { getMyStringValue } from "utils/local-storage";
import moment from "moment";
import { CHART_PATH } from "utils/constrats";
import { useDispatch, useSelector } from "react-redux";
import { selectProfileForm } from "../../Redux/Auth/selector";
import { GenderEnum } from "../../Redux/Auth/types";
import { width } from "../../constants/Dimenstions";
import {
  selectGraphTableData,
  selectGrowthHeightChart,
} from "../../Redux/Analytics/selectors.";

const GrowthAnalytics = (props: any) => {
  const { t } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  };
  const userData: any = useSelector(selectProfileForm);
  const today = new Date();
  const specificDate = moment(userData?.selectedChildDob);
  const currentDate = moment();
  const monthsDiff = currentDate.diff(specificDate, "months");
  console.log(monthsDiff, "monthsDiff");
  const [startMonth, setStartMonth] = useState<number>(0);
  const [endMonth, setEndMonth] = useState<number>(6);

  const num = monthsDiff / 6;
  const integerPart = Math.floor(num);
  console.log(integerPart, "integerPart");

  useEffect(() => {
    setStartMonth(integerPart * 6);
    setEndMonth(integerPart * 6 + 6);
  }, [monthsDiff, integerPart]);

  const dateChangeDecrease = async () => {
    if (startMonth == 0) {
      return;
    }
    setStartMonth(startMonth - 6);
    setEndMonth(endMonth - 6);
    await analytics().logEvent('growthWeightMonthFilterIncreased', {

    });
  };

  const dateChangeIncrease = async () => {
    setStartMonth(startMonth + 6);
    setEndMonth(endMonth + 6);
    await analytics().logEvent('growthWeightMonthFilterIncreased', {

    });
  };

  // Height

  const [startMonthHeight, setStartMonthHeight] = useState<number>(0);
  const [endMonthHeight, setEndMonthHeight] = useState<number>(6);

  useEffect(() => {
    setStartMonthHeight(integerPart * 6);
    setEndMonthHeight(integerPart * 6 + 6);
  }, [monthsDiff, integerPart]);

  const dateHeightChangeDecrease = async () => {

    if (startMonthHeight == 0) {
      return;
    }
    setStartMonthHeight(startMonthHeight - 6);
    setEndMonthHeight(endMonthHeight - 6);
    await analytics().logEvent('growthHeightMonthFilterReduced', {

    });
  };

  const dateHeightChangeIncrease =async () => {
    setStartMonthHeight(startMonthHeight + 6);
    setEndMonthHeight(endMonthHeight + 6);
    await analytics().logEvent('growthHeightMonthFilterIncreased', {

    });
  };
  const [token, setToken] = useState<any>("");
  async function fetchData() {
    try {
      const result = await getMyStringValue("@token");
      setToken(result); // This will log {_x: 0, _y: 0, _z: null, _A: null}
    } catch (error) {}
  }
  const [activeTab, setActiveTab] = useState(0);
  const [tacker, setTacker] = useState(1);
  fetchData();
  const data: any = useSelector(selectProfileForm);
  const GrowthData = useSelector(selectGraphTableData);

  const dispatch = useDispatch();
  const GrowthHeightData = useSelector(selectGrowthHeightChart);
  useEffect(() => {
    dispatch(
      actions.doGetGrowthHeightChart({
        token: token,
        startMonth: startMonthHeight,
        endMonth: endMonthHeight,
        callback() {},
      })
    );
    dispatch(
      actions.doGetGrowthWeightChart({
        token: token,
        startMonth: startMonth,
        endMonth: endMonth,
        callback() {},
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      actions.doGetGrowthHeightChart({
        token: token,
        startMonth: startMonthHeight,
        endMonth: endMonthHeight,
        callback() {},
      })
    );
    dispatch(
      actions.doGetGrowthWeightChart({
        token: token,
        startMonth: startMonth,
        endMonth: endMonth,
        callback() {},
      })
    );
  }, [startMonth, endMonth, startMonthHeight, endMonthHeight]);
  const formatDateDifference = (birthDate: string): string => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let monthDiff = today.getUTCMonth() - birthDateObj.getUTCMonth();
    let dayDiff = today.getUTCDate() - birthDateObj.getUTCDate();

    if (dayDiff < 0) {
      const lastMonthDays = new Date(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        0
      ).getUTCDate();
      dayDiff += lastMonthDays;
      monthDiff--;
    }

    if (monthDiff < 0) {
      monthDiff += 12;
    }
    const monthsString =
      monthDiff > 0 ? `${monthDiff} month${monthDiff !== 1 ? "s" : ""}` : "";
    const daysString =
      dayDiff > 0 ? `${dayDiff} day${dayDiff !== 1 ? "s" : ""}` : "";

    return `${monthsString}${
      monthsString && daysString ? " " : ""
    }${daysString}`;
  };
  const message = (event: any) => {
    setLoading(
      Boolean(
        event.nativeEvent.data == "false"
          ? false
          : event.nativeEvent.data == "true"
          ? true
          : null
      )
    );
  };
  const [loading, setLoading] = useState(true);
  console.log(token, "token");

  useEffect(() => {}, [loading]);
  return (
    <SafeAreaView style={[global.wrap]}>
    <View
      style={[
        { backgroundColor: LightTheme.colors.background, flex: 1 },
        global.wrap,
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeader
          iconStyle={undefined}
          title={"Growths"}
          style={{
            padding: 30,
          }}
          titleStyle={{ fontSize: 18 }}
          goback={goBack}
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
        <ImageBackground
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 20,
            },
          ]}
          resizeMode="contain"
          source={images.SELECTOROUTSIDE}
        >
          <TouchableOpacity
            style={styles.activityImg}
            onPress={() => {
              setActiveTab(0);
              setTacker(1);
            }}
          >
            {activeTab == 0 ? (
              <ImageBackground
                style={styles.activityImg}
                source={images.SELECTOR}
                resizeMode="contain"
              >
                <Text style={styles.imgTopText}>Weight </Text>
              </ImageBackground>
            ) : (
              <Text style={styles.imgTopText}>Weight</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.activityImg}
            onPress={() => {
              setActiveTab(1);
              setTacker(2);
            }}
          >
            {activeTab == 1 ? (
              <ImageBackground
                style={styles.activityImg}
                source={images.SELECTOR}
                resizeMode="contain"
              >
                <Text style={styles.imgTopText}>Height </Text>
              </ImageBackground>
            ) : (
              <Text style={styles.imgTopText}>Height</Text>
            )}
          </TouchableOpacity>
        </ImageBackground>
        {activeTab == 1 && (
          <>
            <View
              style={{
                margin: 30,
                paddingBottom: 15,
                paddingTop: 20,
                height: 340,
                width: "85%",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                overflow: "hidden",
                elevation: 2, // For Android shadow
                shadowColor: "#000", // For iOS shadow
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: LightTheme.fontFamily.semiBold,
                  color: LightTheme.colors.headerTextColor_2,
                  paddingLeft: 10,
                }}
              >
                Height Chart
              </Text>
              {data.selectedChildGender == GenderEnum.MALE ? (
                <WebView
                  source={{
                    uri:
                      CHART_PATH +
                      `/growth-boy-height?startMonth=${startMonthHeight}&endMonth=${endMonthHeight}&width=${width}&token=${token}`,
                  }}
                  onMessage={(event) => message(event)}
                  style={{ flex: 1 }}
                />
              ) : (
                <WebView
                  source={{
                    uri:
                      CHART_PATH +
                      `/growth-girl-height?startMonth=${startMonthHeight}&endMonth=${endMonthHeight}&width=${width}&token=${token}`,
                  }}
                  onMessage={(event) => message(event)}
                  style={{ flex: 1 }}
                />
              )}
              <View style={styles.container}>
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => {
                      dateHeightChangeDecrease();
                    }}
                    disabled={Number(startMonthHeight) <= 1}
                  >
                    <Icon
                      name="chevron-left"
                      color={
                        Number(startMonthHeight) <= 1 ? "#e5e5e5" : "#02b2af"
                      }
                      size={15}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.item, {}]}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#02b2af",
                      fontFamily: LightTheme.fontFamily.regular,
                    }}
                  >
                    {startMonthHeight} Months - {endMonthHeight} Months
                  </Text>
                </View>
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => {
                      dateHeightChangeIncrease();
                    }}
                    disabled={Number(endMonthHeight) >= 60}
                  >
                    <Icon
                      name="chevron-right"
                      size={15}
                      color={
                        Number(endMonthHeight) >= 60 ? "#e5e5e5" : "#02b2af"
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={[
                {
                  flexDirection: "column",
                  margin: 30,
                  paddingBottom: 15,
                  paddingTop: 15,
                  width: "85%",
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  overflow: "hidden",
                  elevation: 2, // For Android shadow
                  shadowColor: "#000", // For iOS shadow
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  backgroundColor: "white",
                },
              ]}
            >
              <View
                style={[
                  {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 15,
                    alignContent: "center",
                    alignItems: "center",
                    padding: 0,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.Text,
                    {
                      color: LightTheme.colors.green_6,
                    },
                  ]}
                >
                  Age
                </Text>
                <Text
                  style={[
                    styles.Text,
                    {
                      color: LightTheme.colors.green_6,
                    },
                  ]}
                >
                  Weight
                </Text>
                <Text
                  style={[
                    styles.Text,
                    {
                      color: LightTheme.colors.green_6,
                    },
                  ]}
                >
                  Height
                </Text>
              </View>

              {GrowthHeightData.tableData?.map((data: any) => {
                return (
                  <>
                    <View
                      style={{
                        borderWidth: 0.5,
                        borderColor: "gray",
                        marginHorizontal: 30,
                      }}
                    ></View>
                    <View
                      style={[
                        {
                          // Try setting `flexDirection` to `"row"`.
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginVertical: 15,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.Text,
                          {
                            fontSize: 8,
                          },
                        ]}
                      >
                        {data.month}
                      </Text>

                      <Text
                        style={[
                          styles.Text,
                          {
                            fontSize: 8,
                          },
                        ]}
                      >
                        {Number(data?.weight.toFixed())}
                      </Text>

                      <Text
                        style={[
                          styles.Text,
                          {
                            fontSize: 8,
                          },
                        ]}
                      >
                        {Number(data?.height.toFixed())}
                      </Text>
                    </View>
                  </>
                );
              })}
            </View>
          </>
        )}
        {activeTab == 0 && (
          <>
            <View
              style={{
                margin: 30,
                paddingBottom: 15,
                paddingTop: 15,
                height: 340,
                width: "85%",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                overflow: "hidden",
                elevation: 2, // For Android shadow
                shadowColor: "#000", // For iOS shadow
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: LightTheme.fontFamily.semiBold,
                  color: LightTheme.colors.headerTextColor_2,
                  paddingLeft: 10,
                }}
              >
                Weight Chart
              </Text>
              {data.selectedChildGender == GenderEnum.MALE ? (
                <WebView
                  source={{
                    uri:
                      CHART_PATH +
                      `/growth-boy-weight?token=${token}&startMonth=${startMonth}&endMonth=${endMonth}&width=${width}`,
                  }}
                  onMessage={(event) => message(event)}
                  style={{ flex: 1 }}
                />
              ) : (
                <WebView
                  source={{
                    uri:
                      CHART_PATH +
                      `/growth-girl-weight?token=${token}&startMonth=${startMonth}&endMonth=${endMonth}&width=${width}`,
                  }}
                  onMessage={(event) => message(event)}
                  style={{ flex: 1 }}
                />
              )}
              <View style={styles.container}>
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => {
                      dateChangeDecrease();
                    }}
                    disabled={Number(startMonth) <= 1}
                  >
                    <Icon
                      name="chevron-left"
                      color={Number(startMonth) <= 1 ? "#e5e5e5" : "#02b2af"}
                      size={15}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.item, {}]}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#02b2af",
                      fontFamily: LightTheme.fontFamily.regular,
                    }}
                  >
                    {startMonth} Month - {endMonth} Month
                  </Text>
                </View>
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => {
                      dateChangeIncrease();
                    }}
                    disabled={Number(endMonth) >= 60}
                  >
                    <Icon
                      name="chevron-right"
                      size={15}
                      color={Number(endMonth) >= 60 ? "#e5e5e5" : "#02b2af"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={[
                {
                  flexDirection: "column",
                  margin: 30,
                  paddingBottom: 15,
                  paddingTop: 15,
                  width: "85%",
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  overflow: "hidden",
                  elevation: 2, // For Android shadow
                  shadowColor: "#000", // For iOS shadow
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  backgroundColor: "white",
                },
              ]}
            >
              <View
                style={[
                  {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 15,
                    alignContent: "center",
                    alignItems: "center",
                    padding: 0,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.Text,
                    {
                      color: LightTheme.colors.green_6,
                    },
                  ]}
                >
                  Age
                </Text>
                <Text
                  style={[
                    styles.Text,
                    {
                      color: LightTheme.colors.green_6,
                    },
                  ]}
                >
                  Weight
                </Text>
                <Text
                  style={[
                    styles.Text,
                    {
                      color: LightTheme.colors.green_6,
                    },
                  ]}
                >
                  Height
                </Text>
              </View>

              {GrowthData.tableData?.map((data: any) => {
                return (
                  <>
                    <View
                      style={{
                        borderWidth: 0.5,
                        borderColor: "gray",
                        marginHorizontal: 30,
                      }}
                    ></View>
                    <View
                      style={[
                        {
                          // Try setting `flexDirection` to `"row"`.
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginVertical: 15,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.Text,
                          {
                            fontSize: 8,
                          },
                        ]}
                      >
                        {data.month}
                      </Text>

                      <Text
                        style={[
                          styles.Text,
                          {
                            fontSize: 8,
                          },
                        ]}
                      >
                        {Number(data?.weight.toFixed())}
                      </Text>

                      <Text
                        style={[
                          styles.Text,
                          {
                            fontSize: 8,
                          },
                        ]}
                      >
                        {Number(data?.height.toFixed())}
                      </Text>
                    </View>
                  </>
                );
              })}
            </View>
          </>
        )}
        {loading && (
          <View style={styles.overlay}>
            <Image
              source={require("../../assets/img/loader.gif")}
              resizeMode="contain"
              style={{
                width: 130,
                height:130
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default GrowthAnalytics;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    paddingBottom: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: LightTheme.colors.background, // Semi-transparent white overlay
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    flex: 1,
    margin: 0,
    padding: 0,
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "gray",
  },
  circle: {
    width: 10, // Diameter of the circle
    height: 10, // Diameter of the circle
    borderRadius: 10, // Half of the width/height for a perfect circle
    marginRight: 5,
  },
  activityImg: {
    width: 120,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  imgTopText: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
    lineHeight: 21,
    textAlign: "center",
  },
  item: {
    marginHorizontal: 6,
  },
  selfCareFontStyle: {
    fontSize: 11,
    marginLeft: 30,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: "#3C3C3C",
  },
});
