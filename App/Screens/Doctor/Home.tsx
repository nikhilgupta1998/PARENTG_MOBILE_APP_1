import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Bell from "assets/icons/bell.svg";
import ArrowLeft from "assets/icons/arrow_left.svg";
import ArrowRight from "assets/icons/arrow_right.svg";
import Calender from "assets/icons/calender.svg";
import avatar from "assets/icons/avatar.png";
import { hp, width, wp } from "../../constants/Dimenstions";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";

const Home = () => {
  const calender = ["Mon", "TUE", "WED", "THU", "FRI", "SAT"];
  const [open, setOpen] = useState(false);

  const data1 = [
    {
      img: images.BABY,
      title: "Aman Gupta , 6 months",
      caption: "Newborn reflexes and posture",
    },
    {
      img: images.BABY,
      title: "Aman Gupta , 6 months",
      caption: "Newborn reflexes and posture",
    },
  ];
  const data2 = [
    {
      img: images.BABY,
      title: "Aman Gupta , 6 months",
      amnt: "INR 580",
    },
    {
      img: images.BABY,
      title: "Aman Gupta , 6 months",
      amnt: "INR 580",
    },
    {
      img: images.BABY,
      title: "Aman Gupta , 6 months",
      amnt: "INR 580",
    },
    {
      img: images.BABY,
      title: "Aman Gupta , 6 months",
      amnt: "INR 580",
    },
    {
      img: images.BABY,
      title: "Aman Gupta , 6 months",
      amnt: "INR 580",
    },
  ];
  const data3 = [
    {
      img: images.DOC,
      title: "Dr. Raj Bedi",
      caption: "Cardiologist, 15 years",
    },
    {
      img: images.DOC,
      title: "Dr. Raj Bedi",
      caption: "Cardiologist, 15 years",
    },
    {
      img: images.DOC,
      title: "Dr. Raj Bedi",
      caption: "Cardiologist, 15 years",
    },
    {
      img: images.DOC,
      title: "Dr. Raj Bedi",
      caption: "Cardiologist, 15 years",
    },
    {
      img: images.DOC,
      title: "Dr. Raj Bedi",
      caption: "Cardiologist, 15 years",
    },
  ];
  const { t } = useTranslation();
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={global.wrap}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Image
          source={images.HEADER_2}
          resizeMode="stretch"
          style={global.greenShder}
        />
        <View style={styles.headerWrap}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}> {t("HELLO")} aman !</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.bellIconWrap}>
              <View style={styles.bellIcon}>
                <Bell />
              </View>
              <Text style={styles.notificationCount}>+98</Text>
            </View>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <Image
                resizeMode="contain"
                source={avatar}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calenderWrap}>
          <View style={styles.monthWrap}>
            <Calender />
            <Text style={styles.monthText}>April 2018</Text>
          </View>
          <View style={styles.calender}>
            <ArrowLeft />
            <FlatList
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={calender}
              renderItem={({ item, index }) => (
                <View style={styles.dayWrap}>
                  <Text style={styles.dayText}>{item}</Text>
                  <Text style={styles.daystrText}>{index + 1}</Text>
                </View>
              )}
            />
            <ArrowRight />
          </View>
        </View>
        <Text style={styles.heading}>{t("TODAY_UPCOMING_APPOINTMENTS")}</Text>
        <FlatList
          data={data1}
          contentContainerStyle={{
            paddingHorizontal: 30,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          horizontal
          renderItem={({ item, index }) => (
            <View style={styles.upcomingAppoi}>
              <Image style={styles.avatar2} source={item?.img} key={index} />
              <Text style={styles.appoinmentText}>{item?.title}</Text>
            </View>
          )}
        />
        <Text style={styles.appoinmentNote}>{t("VIEW_PATIENT_DETAILS")}</Text>
        <View>
          <Text style={styles.heading}>{t("CLOSED_APPOINTMENTS")}</Text>
          <FlatList
            data={data2}
            nestedScrollEnabled
            style={{ flexGrow: 0, height: hp(35) }}
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.upcomingAppoi,
                  { width: "100%", maxWidth: "100%", marginBottom: 18 },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={styles.avatar2}
                    source={item?.img}
                    key={index}
                  />
                  <Text style={styles.appoinmentText}>{item?.title}</Text>
                </View>
                <Text style={styles.appoinmentAmnt}>{item?.amnt}</Text>
              </View>
            )}
          />
        </View>
        <TouchableOpacity style={styles.footerBtn}>
          <Text style={styles.footerBtnText}> {t("VIEW_ALL")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    paddingHorizontal: 30,
  },

  headerLeft: {
    flex: 0.8,
  },

  name: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 28,
    color: LightTheme.colors.textColor1,
  },

  profileInfo: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 17,
    color: LightTheme.colors.primary_btn,
  },

  headerRight: {
    flexDirection: "row",
    // alignItems: "center",
  },
  bellIconWrap: {
    alignItems: "center",
    marginRight: 15,
  },

  notificationCount: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 18,
    color: LightTheme.colors.yellow_primary,
  },
  bellIcon: {
    width: 44,
    height: 44,
    borderRadius: 25,
    ...global.flexCenter,
    borderWidth: 1,
    borderColor: LightTheme.colors.yellow_primary,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 25,
    marginRight: 10,
  },
  avatar2: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  calender: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    // backgroundColor:"red"
  },
  calenderWrap: {
    width: "100%",
    alignItems: "center",
    marginVertical: 25,
  },
  monthWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  monthText: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    lineHeight: 21,
    color: LightTheme.colors.black,
    marginHorizontal: 8,
  },
  dayText: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 14,
    color: LightTheme.colors.black,
    // marginBottom: 5,
  },
  daystrText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 21,
    color: LightTheme.colors.black,
  },
  dayWrap: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: LightTheme.colors.yellow_4,
    ...global.flexCenter,
    marginRight: 10,
  },

  btn: {
    width: "85%",
    alignSelf: "center",
    borderRadius: 10,
    height: 56,
    ...global.flexCenter,
    backgroundColor: LightTheme.colors.primary_btn,
    borderWidth: 0.5,
    borderColor: LightTheme.colors.input_border_color,
    marginVertical: 20,
  },
  btnText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
  },

  tmcWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  tmcText1: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor1,
    lineHeight: 21,
  },
  tmcText2: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.primary_btn,
    lineHeight: 21,
  },
  activityImg: {
    width: 237,
    height: 230,
    borderRadius: 16,
    marginRight: 20,
    overflow: "hidden",
  },
  imgLayer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
  },

  imgTopText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.white,
    lineHeight: 21,
  },
  imgText: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor3,
    marginTop: 8,
    marginLeft: 2,
  },
  imgCaption: {
    fontSize: 9,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.white,
    lineHeight: 21,
  },

  heading: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    lineHeight: 21,
    marginBottom: 15,
    marginTop: 15,
    paddingHorizontal: 30,
  },

  upcomingAppoi: {
    height: 80,
    paddingHorizontal: 15,
    flexDirection: "row",
    maxWidth: 250,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: LightTheme.colors.bookmark_border,
    borderRadius: 12,
    marginRight: 15,
  },

  appoinmentText: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    marginLeft: 15,
  },
  appoinmentNote: {
    fontSize: 8,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    fontStyle: "italic",
    paddingHorizontal: 30,
    marginTop: 6,
  },
  appoinmentAmnt: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: "rgba(0, 108, 4, 1)",
  },

  footerBtn: {
    width: 98,
    height: 37,
    borderRadius: 45,
    ...global.flexCenter,
    borderWidth: 1,
    borderColor: LightTheme.colors.yellow_primary,
    backgroundColor: LightTheme.colors.yellow_4,
    alignSelf: "center",
  },
  footerBtnText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
  },
});
