import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import { LightTheme } from "../../utils/theme";
import { hp } from "../../constants/Dimenstions";
import Upcoming from "./Upcoming";
import PastBooking from "./Past";
import { useTranslation } from "react-i18next";

const Booking = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { paddingVertical: 30, paddingHorizontal: 25 }]}>
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={global.greenShder}
      />
      <BackHeader  iconStyle={undefined}  title={t("BOOKINGS")} goback={undefined} rightIconOnPress={undefined} />
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
              {t("UPCOMING")}
              upcoming
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.green_3,
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
            >       {t("PAST")}
              
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.yellow_primary,
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
                 {t("ACTIVITIES")}
              
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.red_2,
              },
            ]}
          ></View>
        </View>
      </View>
      {/* <Upcoming /> */}
      <PastBooking />
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  eventBtns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(3),
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
});
