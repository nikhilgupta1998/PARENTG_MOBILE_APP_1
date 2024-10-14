import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import BackHeaderDoctor from "components/BackHeaderDoctor";
import SecondaryButton from "components/SecondaryButton";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <BackHeader  iconStyle={undefined} Doctor title="" />
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <View style={styles.main}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}> {t("PROFILE")}</Text>
          <View style={styles.camera}>
            <View style={styles.cameraWrap}>
              <Image
                source={images.AVATAR}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View style={styles.tmcWrap}>
              <Text style={styles.tmcText1}> {t("TAP_TO_EDIT_PHOTO")}</Text>
            </View>
          </View>
          <Text style={styles.txt1}>Dr. Shyam Sundar</Text>
          <Text style={styles.txt2}>15th Cross, Kormangla, Bangalore</Text>
          <Text style={styles.txt2}>MBBS,BDS</Text>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={styles.txt5}>
         {t("CLICK_ADMIN_BUTTON")}
          </Text>
          <SecondaryButton title={t("CONTACT_ADMIN")} />
        </View>
      </View>
    </View>
  );
};

export default Profile;

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
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    marginVertical: 6,
  },
  txt2: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    textAlign: "center",
    marginVertical: 6,
  },

  txt3: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor,
  },
  txt4: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.yellow_primary,
    textAlign: "center",
  },
  txt5: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: "rgba(0, 0, 0, 0.5)",
    marginBottom: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  camera: {
    marginBottom: 20,
    alignItems: "center",
  },
  cameraWrap: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1.5,
    borderColor: LightTheme.colors.primary_btn,
    marginBottom: 10,
  },
  tmcWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  tmcText1: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.regular,
    textAlign: "center",
    color: LightTheme.colors.textColor1,
    lineHeight: 16,
  },
});
