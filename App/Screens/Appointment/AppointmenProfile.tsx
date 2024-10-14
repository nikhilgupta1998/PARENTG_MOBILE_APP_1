import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Bookmark from "assets/icons/bookmark.svg";
import Calender from "assets/icons/calender.svg";
import Star from "assets/icons/white_star.svg";
import { useTranslation } from "react-i18next";

const AppointmenProfile = () => {
  const data = [
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
  ];
  const { t } = useTranslation();
  return (
    <ScrollView
      style={[global.wrap]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <BackHeader
        iconStyle={undefined}
        title="15th Cross, Kormangla Bangalore"
        style={{
          paddingHorizontal: 30,
          paddingTop: 30,
        }}
        titleStyle={{
          fontSize: 11,
        }}
        goback={undefined}
        rightIconOnPress={undefined}
      />
      <View style={{ paddingHorizontal: 30, alignItems: "center" }}>
        <Image source={images.AVATAR} style={styles.avatar} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.ratingWrap}>
            <Text style={styles.ratingTxt}>4.5</Text>
            <Star />
          </View>
          <Text style={styles.totalRatingTxt}>850 {t("RATINGS")}</Text>
        </View>

        <View style={styles.nameWrap}>
          <Text style={styles.name}>Dr. Anjali William</Text>
          <Bookmark />
        </View>
        <Text style={styles.bio}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry, Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </Text>

        <View style={styles.dateWrap}>
          <Calender />
          <Text style={styles.date}>01 Sep, 2023</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "50%",
                alignItems: (index + 1) % 2 === 0 ? "flex-start" : "flex-end",
              }}
            >
              <View style={styles.eventBtnWrap} key={index}>
                <Text style={styles.eventBtnTxt}>{item}</Text>
              </View>
            </View>
          )}
        />
        <Text style={styles.more}>more</Text>
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteTxt}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry, Lorem Ipsum
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AppointmenProfile;

const styles = StyleSheet.create({
  nameWrap: {
    ...global.flexCenter,
    flexDirection: "row",
  },
  name: {
    fontSize: 28,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    marginVertical: 10,
    marginRight: 10,
  },
  bio: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor3,
    textAlign: "center",
  },
  dateWrap: {
    ...global.flexCenter,
    marginVertical: 6,
    flexDirection: "row",
  },
  date: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor6,
    textAlign: "center",
    marginTop: 5,
    marginLeft: 5,
  },

  eventBtnWrap: {
    width: "65%",
    height: 45,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
    backgroundColor: LightTheme.colors.time_back,
    borderColor: LightTheme.colors.unfocused_icon,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  eventBtnTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.unfocused_icon,
    marginTop: 5,
  },
  ratingWrap: {
    height: 28,
    width: 50,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.green_3,
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
  totalRatingTxt: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor5,
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  more: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.primary_btn,
    textAlign: "center",
    marginVertical: 15,
  },

  footerNote: {
    height: 115,
    width: "100%",
    borderRadius: 19,
    ...global.flexCenter,
    borderWidth: 2,
    borderColor: LightTheme.colors.bookmark_border,
    marginBottom: 15,
  },
  footerNoteTxt: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor3,
    textAlign: "center",
    padding: 20,
  },
});
