import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import analytics from "@react-native-firebase/analytics";
import { width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { useTranslation } from "react-i18next";
import { SCREENS } from "../../constants/var";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { actions } from "../../Redux/MilestoneGraph/slice";
import { selectMilestoneCategoryGraph } from "../../Redux/MilestoneGraph/selectors.";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome";
import { getMyStringValue } from "utils/local-storage";
import moment from "moment";
import { CHART_PATH } from "utils/constrats";
import DateFormat from "components/DateFormat";

const ActivitiesInMonth = (props: any) => {
  const chartConfig = {
    backgroundColor: LightTheme.colors.background,
    backgroundGradientFrom: LightTheme.colors.white,
    backgroundGradientTo: LightTheme.colors.white,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: LightTheme.colors.black,
    },
  };
  const { t } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  };
  const graphData = useSelector(selectMilestoneCategoryGraph);
  const data = {
    labels: graphData.map((item) => item.title),
    datasets: [
      {
        data: graphData.map((item: any) => item.answer),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Milestone"], // optional
  };

  const [month, setMonth] = useState(0);
  const [token, setToken] = useState<any>("");
  async function fetchData() {
    try {
      const result = await getMyStringValue("@token");
      setToken(result); // This will log {_x: 0, _y: 0, _z: null, _A: null}
    } catch (error) {}
  }
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
  const oneDaysPreviousDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  const monthName = moment(previousMonthDate).format("MMMM");
  // console.log(`http:192.168.0.2:3000/activities?token=${token}&month=${month}`);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const [activeTab, setActiveTab] = useState(0);
  const [tacker, setTacker] = useState(1);
  fetchData();
  // const [month, setMonth] = useState(0);
  const [startDate, setStartDate] = useState<any>(sevenDaysPreviousDate); // 1st February 2024
  const [endDate, setEndDate] = useState<any>(new Date()); // 7th February 2024
  const dateChangeDecrease = async () => {
    const adjustedStartDate = new Date(startDate);
    const adjustedEndDate = new Date(endDate);
    adjustedStartDate.setDate(startDate.getDate() - 6);
    adjustedEndDate.setDate(endDate.getDate() - 6);
    setStartDate(adjustedStartDate);
    setEndDate(adjustedEndDate);
    await analytics().logEvent("activityMonthDateFilterDecreased", {});
  };
  const dateChangeIncrease = async () => {
    const adjustedStartDate = new Date(startDate);
    const adjustedEndDate = new Date(endDate);
    adjustedStartDate.setDate(startDate.getDate() + 6);
    adjustedEndDate.setDate(endDate.getDate() + 6);
    setStartDate(adjustedStartDate);
    setEndDate(adjustedEndDate);
    await analytics().logEvent("activityMonthDateFilterIncreased", {});
  };
  const formatDateString = (date: any) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
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
  const year = startDate.getFullYear();
  const monthS = ("0" + (startDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-indexed month
  const day = ("0" + startDate.getDate()).slice(-2);
  const endYear = endDate.getFullYear();
  const endMonthS = ("0" + (endDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-indexed month
  const endDay = ("0" + endDate.getDate()).slice(-2);

  // Format the date in "yyyy-mm-dd" format
  const formattedStartDate = `${year}-${monthS}-${day}`;
  const formattedEndDate = `${endYear}-${endMonthS}-${endDay}`;

  useEffect(() => {}, [loading]);

  return (
    <SafeAreaView style={[global.wrap]}>
    <View
      style={[
        global.wrap,
        {
          flex: 1,
          backgroundColor: loading ? "#ffffff" : LightTheme.colors.background,
          zIndex: loading ? 999 : 0,
        },
      ]}
    >
      <BackHeader
        iconStyle={undefined}
        title={t("ACTIVITIES_IN_A_MONTH")}
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
            marginBottom: 10,
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

      <>
        <View
          style={{
            margin: 30,
            paddingBottom: 15,
            height: 260,
            // justifyContent:"center",
            width: "85%",
            borderWidth: 1,
            borderColor: "#f2f2f2",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <WebView
            source={{
              uri:
                CHART_PATH +
                `/activities?token=${token}&trackerType=${tacker}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&month=${month}&width=${width}`,
            }}
            onMessage={(event) => message(event)}
            style={{ flex: 1 }}
          />
        </View>
        {activeTab == 1 && (
          <View
            style={[
              styles.container,
              {
                flexDirection: "row",
              },
            ]}
          >
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
                disabled={today.getMonth() == moment(previousMonthDate).month()}
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
          <View
            style={[
              styles.container,
              {
                flexDirection: "row",
              },
            ]}
          >
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
                    endDate.getDate() == today.getDate() ? "#e5e5e5" : "#02b2af"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
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
    </View>
    </SafeAreaView>
  );
};

export default ActivitiesInMonth;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: LightTheme.colors.background, // Semi-transparent white overlay
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginHorizontal: 6,
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
});
