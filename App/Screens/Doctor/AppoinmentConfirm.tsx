import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import BackHeaderDoctor from "components/BackHeaderDoctor";
import SecondaryButton from "components/SecondaryButton";
import { useTranslation } from "react-i18next";

const AppoinmentConfirm = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <BackHeader  iconStyle={undefined} Doctor title="" />
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={global.greenShder}
      />

      <View style={styles.main}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>hooray!</Text>
          <Text style={[styles.txt2, { marginVertical: 15 }]}>
          {t("A_PAYMENT_REQUEST_HAS_BEEN_SUBMITTED_SUCCESSFULLY")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.txt3}>{t("PAYMENT_ID")}</Text>
            <Text style={[styles.txt4]}>#PARNTG932145987</Text>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={styles.txt4}>
           {t("NOTE")}: You payment will credit into your source bank account within
            2-3 working days
          </Text>
          <SecondaryButton title={t("GO_BACK")} />
        </View>
      </View>
    </View>
  );
};

export default AppoinmentConfirm;

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
    marginVertical: 20,
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
  },
  txtWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  txt1: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
  },
  txt2: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.yellow_primary,
    textAlign: "center",
  },

  txt3: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor,
  },
  txt4: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.yellow_primary,
    textAlign: "center",
  },
  txt5: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    marginBottom: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
});
