import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import Copy from "assets/icons/copy.svg";
import { LightTheme } from "../../utils/theme";
import { useTranslation } from "react-i18next";

const ReferEarn = () => {
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
      <BackHeader  iconStyle={undefined}  titleStyle={{ fontSize: 29 }} title={t("REWARDS.REFER_AND_EARN")} goback={undefined} rightIconOnPress={undefined} />
      <TouchableOpacity style={styles.filterWrap}>
        <Text style={styles.filterValue}>5623AMAN</Text>
        <TouchableOpacity style={{ position: "absolute", right: 15 }}>
          <Copy />
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.code}>
      {t("REWARDS.USE_CODE")}
      </Text>
    </View>
  );
};

export default ReferEarn;

const styles = StyleSheet.create({
  filterWrap: {
    width: "100%",
    height: 59,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginVertical: 30,
    borderWidth: 2,
    borderColor: LightTheme.colors.yellow_3,
    backgroundColor: LightTheme.colors.background,
    borderRadius: 10,
    elevation: 10,
  },

  filterValue: {
    flex: 1,
    fontFamily: LightTheme.fontFamily.medium,
    fontSize: 17,
    color: LightTheme.colors.black,
    textAlign: "center",
  },
  code: {
    fontFamily: LightTheme.fontFamily.medium,
    fontSize: 12,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
});
