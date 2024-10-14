import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LightTheme } from "../../utils/theme";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { hp } from "../../constants/Dimenstions";
import BackHeader from "components/BackHeader";
import { Rating, AirbnbRating } from "react-native-ratings";
import AuthInput from "components/AuthInput";
import PrimaryButton from "components/PrimaryButton";
import { useTranslation } from "react-i18next";

const ReviewBooking = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { paddingVertical: 30, paddingHorizontal: 25 }]}>
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={global.greenShder}
      />
      <BackHeader  iconStyle={undefined}    title={t("REVIEW")} goback={undefined} rightIconOnPress={undefined} />
      <View style={styles.wrap}>
        <View style={styles.orderWrap}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.txt1}>{t("ORDER_ID")}</Text>
            <Text
              style={[
                styles.txt1,
                { color: LightTheme.colors.headerTextColor },
              ]}
            >
              #321654799
            </Text>
          </View>
          <Text style={styles.txt2}>{t("DOWNLOAD_INVOICE")}</Text>
        </View>

        <View style={styles.about}>
          <Image source={images.AVATAR} style={styles.avatar} />
          <Text style={styles.txt1}>Dr. Anjali William</Text>
        </View>
        <View style={styles.item}>
        <Text style={styles.txt1}>{t("SCHDULED_FOR")}:</Text>
          <Text style={styles.txt1}>8 December 2023 | 18:00 PM</Text>
        </View>
        <View style={styles.item}>
        <Text style={styles.txt1}>{t("AMOUNT")}:</Text>
          <Text style={styles.txt1}>INR 854</Text>
        </View>
        <View style={styles.item}>
        <Text style={styles.txt1}> {t("TRANSACTION_ID")}</Text>
          <Text style={styles.txt1}>8457895ASM452S</Text>
        </View>
      </View>
      <View style={styles.wrap}>
        <Rating imageSize={30} />
      </View>

      <AuthInput
        inputProps={{
          placeholder: t("TYPE_YOUR_REVIEW"),
          multiline: true,
          textAlignVertical: "top",
          numberOfLines: 5,
        }}
        wrapstyle={{
          marginTop: 20,
          height: 100,
        }}
      />

      <PrimaryButton title={t("SUBMIT")} disabled={false} />
    </View>
  );
};

export default ReviewBooking;

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1.5,
    borderColor: LightTheme.colors.booking_border,
    borderRadius: 12,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: hp(3),
  },

  orderWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  about: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  item: {
    marginVertical: 10,
  },
  txt1: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
  },
  txt2: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.green_5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 12,
  },
});
