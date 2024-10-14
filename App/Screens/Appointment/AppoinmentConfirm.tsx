import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import PrimaryButton from "components/PrimaryButton";
import { useTranslation } from "react-i18next";

const AppoinmentConfirm = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <BackHeader  iconStyle={undefined}  title="" goback={undefined} rightIconOnPress={undefined} />
      <Text style={styles.title}>{t("HOORAY")}!</Text>
      <View style={styles.main}>
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <View style={styles.txtWrap}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.txt2}>{t("YOUR_BOOKING_WITH")} </Text>
              <Text style={styles.txt1}>Dr. Anjali William </Text>
            </View>
            <Text style={styles.txt2}> {t("HAS_BEEN_CONFIRMED")}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.txt3}>{t("BOOKING_ID")}</Text>
            <Text style={styles.txt4}>#PARNTG932145987</Text>
          </View>
        </View>
        <PrimaryButton title={t("GO_BACK")} disabled={false} />
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
    color: LightTheme.colors.primary_btn,
  },

  txt3: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor,
  },
  txt4: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    marginLeft: 5,
  },
});
