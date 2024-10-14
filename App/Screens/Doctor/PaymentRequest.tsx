import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackHeaderDoctor from "components/BackHeaderDoctor";
import { images } from "../../constants/img";
import global from "../../styles/global";
import SecondaryButton from "components/SecondaryButton";
import { LightTheme } from "../../utils/theme";
import Verified from "assets/icons/verified.svg";
import AuthInput from "components/AuthInput";
import { useTranslation } from "react-i18next";

const PaymentRequest = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30, paddingBottom: 70 }]}>
      <BackHeader  iconStyle={undefined} Doctor title={t("EARNINGS")} />
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
          <View
            style={[
              styles.upcomingAppoi,
              { justifyContent: "flex-start", alignItems: "center" },
            ]}
          >
            <Text style={[styles.appoinmentText, { marginRight: 5 }]}>
            {t("DOCUMENT_VERIFIED")}
            </Text>
            <Verified />
          </View>
          <View style={styles.upcomingAppoi}>
         
            <Text style={styles.appoinmentText}> {t("TOTAL_BALANCE")}</Text>
            <Text style={styles.appoinmentAmnt}>Rs 82000</Text>
          </View>
          <View style={styles.upcomingAppoi}>
            <Text style={styles.appoinmentText}> {t("TOTAL_WITHDRAWAL")}</Text>
            <Text
              style={[
                styles.appoinmentAmnt,
                { color: LightTheme.colors.red_1 },
              ]}
            >
              Rs 7000
            </Text>
          </View>

          <AuthInput
            inputProps={{
              placeholder: `{${t("TYPE_THE_WITHDRAW_AMOUNT")}}`,
              keyboardType: "number-pad",
            }}
            style={{
              borderWidht: 0,
              fontSize: 19,
            }}
            wrapstyle={{
              marginTop: 20,
              borderWidht: 0,
              borderColor: LightTheme.colors.white,
            }}
          />
        </View>
      </View>
      <SecondaryButton title={t("RAISE_PAYMENT_REQUEST")} />
    </View>
  );
};

export default PaymentRequest;

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
