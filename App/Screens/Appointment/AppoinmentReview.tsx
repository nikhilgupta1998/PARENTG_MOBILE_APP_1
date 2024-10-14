import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import PrimaryButton from "components/PrimaryButton";
import { useTranslation } from "react-i18next";

const AppoinmentReview = () => {
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
      <BackHeader  iconStyle={undefined} 
        title="15th Cross, Kormangla Bangalore"
        titleStyle={{
          fontSize: 11,
        }} goback={undefined} rightIconOnPress={undefined} />
      <Text style={styles.title}>{t("REVIEW_BOOKING")}</Text>
      <View
        style={{ justifyContent: "space-between", flex: 1, paddingBottom: 40 }}
      >
        <View>
          <View style={styles.profileWrap}>
            <Image source={images.AVATAR} style={styles.avatar} />
            <Text style={styles.name}>Dr. Angelia Jhonson</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt1}> {t("CONFIRMING_FOR")}:</Text>
            <Text style={styles.txt2}>8 December 2023 | 18:00 PM</Text>
          </View>
          <Text style={styles.txt3}> {t("PATIENT_NAME")}</Text>
          <Text style={styles.txt3}>{t("SURGERIES")}</Text>
          <Text style={styles.txt3}>{t("PAST_MEDICATIONS")}</Text>
          <Text style={styles.txt3}>{t("TYPE_YOUR_PROBLEM_HERE")} </Text>
        </View>
        <PrimaryButton title={t("CONFIRM_BOOKING")} disabled={false} />
      </View>
    </View>
  );
};

export default AppoinmentReview;

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
    marginVertical: 20,
  },

  profileWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
  },
  item: {
    marginVertical: 15,
  },
  txt2: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
  },
  txt1: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    marginBottom: 3,
  },
  txt3: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor6,
    marginBottom: 20,
  },
});
