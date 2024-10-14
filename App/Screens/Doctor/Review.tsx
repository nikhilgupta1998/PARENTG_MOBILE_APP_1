import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LightTheme } from "../../utils/theme";
import BackHeaderDoctor from "components/BackHeaderDoctor";
import { images } from "../../constants/img";
import global from "../../styles/global";
import Star from "assets/icons/white_star.svg";
import { useTranslation } from "react-i18next";
import BackHeader from "components/BackHeader";

const Review = () => {
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <BackHeader iconStyle={undefined} Doctor title="" />
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text style={styles.title}>{t("REVIEWS")}</Text>
        <View style={styles.ratingWrap}>
          <Text style={styles.ratingTxt}>4.5</Text>
          <Star />
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[]}
        renderItem={({ item, index }) => (
          <View style={styles.reviewCard}>
            <Text style={styles.reviewTxt}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima,
              ipsam? Odit reiciendis eos adipisci repudiandae. Repellat
              obcaecati doloribus distinctio odit non fugiat quo architecto?
              Repellat earum asperiores aliquid neque ratione?
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  reviewCard: {
    width: "90%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: LightTheme.colors.booking_border,
    borderRadius: 12,
    marginBottom: 15,
  },
  reviewTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor5,
    textAlign: "center",
  },
  ratingWrap: {
    height: 28,
    width: 50,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.green_3,
    marginTop: 15,
  },
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
  title: {
    fontSize: 36,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
    marginVertical: 20,
  },
  txt2: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.yellow_primary,
    textAlign: "center",
  },
});
