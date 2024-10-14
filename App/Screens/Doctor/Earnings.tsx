import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackHeaderDoctor from "components/BackHeaderDoctor";
import { images } from "../../constants/img";
import global from "../../styles/global";
import SecondaryButton from "components/SecondaryButton";
import { LightTheme } from "../../utils/theme";
import Arrow from "assets/icons/arrow_right_outline.svg";
import { useTranslation } from "react-i18next";

const Earnings = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30, paddingBottom: 70 }]}>
      <BackHeader  iconStyle={undefined} Doctor title={t("EARNINGS")} />
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={global.greenShder}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
          <View style={styles.upcomingAppoi}>
            <Text style={styles.appoinmentText}>
              Upload Documents to get Verified
            </Text>
            <Arrow />
          </View>
          <View style={styles.upcomingAppoi}>
            <Text style={styles.appoinmentText}>{t("TOTAL_BALANCE")}</Text>
            <Text style={styles.appoinmentAmnt}>Rs 82000</Text>
          </View>
        </View>
      </View>
      <SecondaryButton title={t("RAISE_PAYMENT_REQUEST")} />
    </View>
  );
};

export default Earnings;

const styles = StyleSheet.create({
  upcomingAppoi: {
    height: 80,
    paddingHorizontal: 12,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: LightTheme.colors.bookmark_border,
    borderRadius: 12,
    // marginRight: 15,
    marginBottom: 15,
  },
  avatar2: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  appoinmentText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    // marginLeft: 15,
  },
  appoinmentAmnt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: "rgba(0, 108, 4, 1)",
  },
});
