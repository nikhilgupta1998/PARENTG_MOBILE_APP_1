import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { height } from "../../constants/Dimenstions";
import { images } from "../../constants/img";
import { LightTheme } from "../../utils/theme";
import global from "../../styles/global";
import SecondaryButton from "components/SecondaryButton";
import BackHeaderDoctor from "components/BackHeaderDoctor";
import { useTranslation } from "react-i18next";

const AppointmentDetailts = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <BackHeader  iconStyle={undefined} Doctor
        title="8 December 2023 | 18:00 PM"
        titleStyle={{
          fontSize: 14,
        }}
      />
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={global.greenShder}
      />
      <View
        style={{
          //   paddingHorizontal: 30,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image source={images.AVATAR} style={styles.avatar} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.totalRatingTxt}>Aman Gupta , 6 months</Text>
        </View>

        <View style={{ width: "100%" }}>
          <Text style={styles.prblemTxt1}>{t("PROBLEM")} :</Text>
          <Text style={styles.prblemTxt2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit porro
            illo repudiandae laudantium earum debitis tenetur, amet deleniti
            quidem quaerat voluptatem repellendus accusantium ipsam facere sunt
            vitae dignissimos reiciendis sapiente.
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={[styles.prblemTxt1]}>{t("MORE_DETAILS")} :</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 6,
            }}
          >
            <Text style={styles.prblemTxt2}>{t("PAST_MEDICATIONS")} : </Text>
            <Text
              style={[styles.prblemTxt2, { color: LightTheme.colors.red_1 }]}
            >
             {t("YES")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 6,
            }}
          >
            <Text style={styles.prblemTxt2}>{t("ALLERGIES")}: </Text>
            <Text
              style={[styles.prblemTxt2, { color: LightTheme.colors.red_1 }]}
            >
               {t("YES")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 6,
            }}
          >
            <Text style={styles.prblemTxt2}>{t("SURGERIES")} : </Text>
            <Text
              style={[styles.prblemTxt2, { color: LightTheme.colors.red_1 }]}
            >
              {t("YES")}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text style={styles.txt3}> {t("BOOKING_ID")} </Text>
        <Text style={styles.txt4}>#PARNTG932145987</Text>
      </View>

      <SecondaryButton title={t("TREATMENT_DONE")} />
    </View>
  );
};

export default AppointmentDetailts;

const styles = StyleSheet.create({
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 15,
  },

  ratingTxt: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.white,
    marginRight: 5,
    marginTop: 3,
  },
  totalRatingTxt: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
  },
  prblemTxt1: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    marginTop: 25,
  },
  prblemTxt2: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.headerTextColor_2,
    marginTop: 5,
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
