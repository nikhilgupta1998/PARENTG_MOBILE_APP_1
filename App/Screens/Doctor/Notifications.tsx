import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Arrow from "assets/icons/arrow_doc.svg";
import { LightTheme } from "../../utils/theme";
import global from "../../styles/global";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <View style={[styles.headwrap]}>
        <TouchableOpacity style={styles.btn}>
          <Arrow />
        </TouchableOpacity>
         <View style={styles.right}>
          <Text style={styles.readAll}>{t("READ_ALL")}</Text>
        </View>
      </View>
      <Text style={styles.title}>{t("NOTIFICATIONS")}</Text>
      <View style={styles.wrap}>
        <View style={styles.notiwrap}>
          <Text style={styles.notiTxt}>
            Lorem Ipsum is simply dummy text of the printing and typesetting.
          </Text>
        </View>
        <Text style={styles.notiTime}>15 August, 2024</Text>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 25,
  },
  notiwrap: {
    width: "100%",
    height: 64,
    borderWidth: 1,
    borderColor: "rgba(53, 53, 53, 1)",
    borderRadius: 12,
    paddingHorizontal: 15,
    justifyContent: "center",
    marginBottom: 10,
  },

  notiTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    lineHeight: 21,
    color: LightTheme.colors.textColor3,
  },

  notiTime: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.regular,
    lineHeight: 21,
    color: LightTheme.colors.textColor3,
  },
  headwrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative",
  },
  btn: {
    height: 55,
    width: 55,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.yellow_primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
  },
  right: {
    justifyContent: "center",
    alignItems: "center",
  },
  readAll: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.green_3,
  },
  title: {
    fontSize: 36,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
  },
});
