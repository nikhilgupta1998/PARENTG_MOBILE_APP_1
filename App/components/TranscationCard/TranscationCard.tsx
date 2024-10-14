import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import global from "styles/global";
import { LightTheme } from "utils/theme";
const TranscationCard = ({ item }: { item: any }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.alignContainer}>
        <View>
          <Text style={styles.transcationFontStyle}>{t("TRANSACTION_ID")}</Text>
          <Text style={styles.transcationCodeFontStyle}>{item?.transactionId? item?.transactionId : "PNR0000"}</Text>
        </View>
        <Text style={styles.transcationPriceFontStyle}>{item?.amount} INR</Text>
      </View>
      <Text style={styles.plainFontStyle}>Silver Plan</Text>
      <View style={{ ...styles.alignContainer, justifyContent: "flex-start" }}>
        <TouchableOpacity
          style={[
            styles.eventBtnWrap,
            {
              backgroundColor:
                item?.orderStatus != 1
                  ? LightTheme.colors.light_red
                  : LightTheme.colors.green_4,
              borderColor:
                item?.orderStatus != 1
                  ? LightTheme.colors.red_2
                  : LightTheme.colors.green_3,
            },
          ]}
        >
          <Text
            style={[
              styles.eventBtnTxt,
              {
                color:
                  item?.orderStatus != 1
                    ? LightTheme.colors.red_2
                    : LightTheme.colors.green_3,
              },
            ]}
          >
            {" "}
            {item?.orderStatus == 1 ? "Paid" : "Unpaid"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.eventBtnWrap,
            {
              backgroundColor: LightTheme.colors.yellow_2,
              borderColor: LightTheme.colors.yellow_primary,
              marginLeft: 5,
              paddingLeft:5
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

            {moment(item?.updatedAt).format("DD-MM-yyyy")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line} />
    </View>
  );
};

export default TranscationCard;

const styles = StyleSheet.create({
  transcationFontStyle: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: "#0000008C",
    fontWeight:"900"
  },
  transcationCodeFontStyle: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: "#0000008C",
  },
  btn: {
    borderRadius: 5,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#29E33B",
    paddingHorizontal: 14,
  },
  completeFontStyle: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.white,
  },
  transcationPriceFontStyle: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.green_6,
  },
  alignContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  plainFontStyle: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.green_6,
    marginTop: 8,
    marginBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: "#D8D8D8",
    marginTop: 22,
  },
  mainContainer: {
    marginBottom: 24,
  },
  eventBtnWrap: {
    width: "auto",
    height: 25,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
  },
  eventBtnTxt: {
    paddingRight:7,
    paddingLeft:5,
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
  },
});
