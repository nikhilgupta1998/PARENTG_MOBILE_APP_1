import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LightTheme } from "../../utils/theme";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectMilestoneCategoryGraph } from "../../Redux/MilestoneGraph/selectors.";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome";
import { getMyStringValue } from "utils/local-storage";
import moment from "moment";
import { CHART_PATH } from "utils/constrats";
import { width } from "../../constants/Dimenstions";

const ComparisonOfMilestone = (props: any) => {
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
  // console.log(`http:192.168.0.2:3000/activities?token=${token}&month=${month}`);
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
  fetchData();
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { flex: 1, backgroundColor: "white" }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("EXPLORE.COMPARISON_OF_MILESTONE")}
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
        <View
          style={{
            margin: 30,
            height: 375,
            width: "85%",
            borderWidth: 1,
            borderColor: "#f2f2f2",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "white",
            paddingBottom: 15,
          }}
        >
          <WebView
            source={{
              uri: CHART_PATH + `?token=${token}&month=${month}&width=${width}`,
            }}
            style={{ flex: 1 }}
            onMessage={(event) => message(event)}
          />
          <Text
            style={{
              fontFamily: LightTheme.fontFamily.semiBold,
              fontSize: 9,
              paddingHorizontal: 15,
              color: LightTheme.colors.text,
            }}
          >
            Compare the completion percentages of milestone categories to ensure
            uniform development in all aspects, contributing to the child's
            overall growth. For more details, please contact our support team
          </Text>
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
      </View>
    </SafeAreaView>
  );
};

export default ComparisonOfMilestone;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    marginHorizontal: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: LightTheme.colors.background, // Semi-transparent white overlay
    justifyContent: "center",
    alignItems: "center",
  },
  selfCareFontStyle: {
    fontSize: 11,
    marginLeft: 30,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: "#3C3C3C",
  },
});
