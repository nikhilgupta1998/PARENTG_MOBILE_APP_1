import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import analytics from "@react-native-firebase/analytics";
import { LightTheme } from "../../utils/theme";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { useTranslation } from "react-i18next";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome";
import { getMyStringValue } from "utils/local-storage";
import moment from "moment";
import { CHART_PATH } from "utils/constrats";
import { width } from "../../constants/Dimenstions";

const FeedingChart = (props: any) => {
  const { t } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  };
  const [month, setMonth] = useState(0);
  const today = new Date();
  const previousMonthDate = new Date(
    today.getFullYear(),
    today.getMonth() - month,
    1
  );
  const sevenDaysPreviousDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );
  const monthName = moment(previousMonthDate).format("MMMM");

  const formatDateString = (date: any) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const [startDate, setStartDate] = useState<any>(sevenDaysPreviousDate); // 1st February 2024
  const [endDate, setEndDate] = useState<any>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  ); // 7th February 2024
  const dateChangeDecrease = async () => {
    const adjustedStartDate = new Date(startDate);
    const adjustedEndDate = new Date(endDate);
    adjustedStartDate.setDate(startDate.getDate() - 6);
    adjustedEndDate.setDate(endDate.getDate() - 6);
    setStartDate(adjustedStartDate);
    setEndDate(adjustedEndDate);
    await analytics().logEvent("feedingDateFilterDecreased", {});
  };
  const dateChangeIncrease = async () => {
    const adjustedStartDate = new Date(startDate);
    const adjustedEndDate = new Date(endDate);
    adjustedStartDate.setDate(startDate.getDate() + 6);
    adjustedEndDate.setDate(endDate.getDate() + 6);
    setStartDate(adjustedStartDate);
    setEndDate(adjustedEndDate);
    await analytics().logEvent("feedingDateFilterIncreased", {});
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
  // console.log(endDate, today, "today");
  const message = (event: any) => {
    // console.log(event.nativeEvent.data, "event");
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

  useEffect(() => {
    // console.log(loading, "event - loading");
  }, [loading]);
  const year = startDate.getFullYear();
  const monthS = ("0" + (startDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-indexed month
  const day = ("0" + startDate.getDate()).slice(-2);
  const endYear = endDate.getFullYear();
  const endMonthS = ("0" + (endDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-indexed month
  const endDay = ("0" + endDate.getDate()).slice(-2);

  // Format the date in "yyyy-mm-dd" format
  const formattedStartDate = `${year}-${monthS}-${day}`;
  const formattedEndDate = `${endYear}-${endMonthS}-${endDay}`;
  return (
    <SafeAreaView style={[global.wrap]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={[
            {
              backgroundColor: LightTheme.colors.background,
              flex: 1,
              paddingBottom: 100,
            },
          ]}
        >
          <BackHeader
            iconStyle={undefined}
            title={"Feeding"}
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
                  <Text style={styles.imgTopText}>Daily </Text>
                </ImageBackground>
              ) : (
                <Text style={styles.imgTopText}>Daily</Text>
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
                  <Text style={styles.imgTopText}>Weekly </Text>
                </ImageBackground>
              ) : (
                <Text style={styles.imgTopText}>Weekly</Text>
              )}
            </TouchableOpacity>
          </ImageBackground>
          {activeTab == 1 && (
            <View style={styles.container}>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => {
                    setMonth(month + 1);
                  }}
                >
                  <Icon name="chevron-left" size={16} color="#02b2af" />
                </TouchableOpacity>
              </View>
              <View style={[styles.item]}>
                <Text
                  style={{
                    fontSize: 17,
                    color: "#02b2af",
                    fontFamily: LightTheme.fontFamily.regular,
                  }}
                >
                  {monthName} {today.getFullYear()}
                </Text>
              </View>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => {
                    setMonth(month - 1);
                  }}
                  disabled={
                    today.getMonth() == moment(previousMonthDate).month()
                  }
                >
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={
                      today.getMonth() == moment(previousMonthDate).month()
                        ? "#e5e5e5"
                        : "#02b2af"
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {activeTab == 0 && (
            <View style={styles.container}>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => {
                    dateChangeDecrease();
                  }}
                >
                  <Icon name="chevron-left" size={16} color="#02b2af" />
                </TouchableOpacity>
              </View>
              <View style={[styles.item]}>
                <Text
                  style={{
                    fontSize: 17,
                    color: "#02b2af",
                    fontFamily: LightTheme.fontFamily.regular,
                  }}
                >
                  {formatDateString(startDate)} - {formatDateString(endDate)}
                </Text>
              </View>
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() => {
                    dateChangeIncrease();
                  }}
                  disabled={endDate.getDate() == today.getDate()}
                >
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={
                      endDate.getDate() == today.getDate()
                        ? "#e5e5e5"
                        : "#02b2af"
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View
            style={{
              borderBottomWidth: 0.8,
              borderBottomColor: LightTheme.colors.border,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            {/* Your content goes here */}
          </View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: LightTheme.fontFamily.bold,
              textAlign: "center",
              color: LightTheme.colors.headerTextColor_2,
              marginVertical: 20,
            }}
          >
            Feeding Charts
          </Text>
          <View
            style={{
              margin: 30,
              marginTop: 5,
              // paddingLeft: 10,
              paddingTop: 20,
              paddingBottom: 0,
              height: 300,
              width: "85%",
              borderWidth: 1,
              borderColor: "#f2f2f2",
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                // paddingLeft: 10,
                fontSize: 12,
                fontFamily: LightTheme.fontFamily.semiBold,
                color: LightTheme.colors.headerTextColor_2,
                paddingLeft: 10,
              }}
            >
              Bottle Feeding
            </Text>
            <WebView
              source={{
                uri:
                  CHART_PATH +
                  `/bottle-feeding?token=${token}&month=${month}&trackerType=${tacker}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&width=${width}`,
              }}
              onMessage={(event) => message(event)}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              margin: 30,
              marginTop: 5,
              paddingBottom: 0,
              height: 300,
              // paddingLeft: 10,
              paddingTop: 20,
              width: "85%",
              borderWidth: 1,
              borderColor: "#f2f2f2",
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                // paddingLeft: 10,
                fontSize: 12,
                fontFamily: LightTheme.fontFamily.semiBold,
                color: LightTheme.colors.headerTextColor_2,
                paddingLeft: 10,
              }}
            >
              Breast Feeding
            </Text>
            <WebView
              source={{
                uri:
                  CHART_PATH +
                  `/breast-feeding?token=${token}&month=${month}&trackerType=${tacker}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&width=${width}`,
              }}
              onMessage={(event) => message(event)}
              style={{ flex: 1, marginTop: 10 }}
            />
          </View>
        </View>
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
    </SafeAreaView>
  );
};

export default FeedingChart;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    paddingBottom: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  circle: {
    width: 10, // Diameter of the circle
    height: 10, // Diameter of the circle
    borderRadius: 10, // Half of the width/height for a perfect circle
    marginRight: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: LightTheme.colors.background, // Semi-transparent white overlay
    justifyContent: "center",
    alignItems: "center",
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
