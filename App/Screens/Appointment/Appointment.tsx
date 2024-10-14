import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import Search from "assets/icons/search.svg";
import { LightTheme } from "../../utils/theme";
import BookMarkComp from "components/BookMarkComp";
import AuthInput from "components/AuthInput";
import { useTranslation } from "react-i18next";

const Appointment = () => {
  const data = [
    {
      name: "Dr. Angelia Jhonson",
      exp: "15 Years Experience",
      profession: "Cardiologist",
    },
    {
      name: "Dr. Angelia Jhonson",
      exp: "15 Years Experience",
      profession: "Cardiologist",
    },
    {
      name: "Dr. Angelia Jhonson",
      exp: "15 Years Experience",
      profession: "Cardiologist",
    },
  ];
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
        RightIcon={<Search />}
        title="15th Cross, Kormangla Bangalore"
        titleStyle={{
          fontSize: 11,
        }} goback={undefined} rightIconOnPress={undefined}      />
      <Text style={styles.title}> {t("APPOINTMENTS")}</Text>
      <View style={styles.eventBtns}>
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              styles.eventBtnWrap,
              {
                backgroundColor: LightTheme.colors.yellow_2,
                borderColor: LightTheme.colors.yellow_primary,
              },
            ]}
          >
            <Text
              style={[
                styles.eventBtnTxt,
                {
                  color: LightTheme.colors.yellow_primary,
                },
              ]}
            >
              {t("DOCTORS")}
            </Text>
          </View>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.yellow_primary,
              },
            ]}
          ></View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              styles.eventBtnWrap,
              {
                backgroundColor: LightTheme.colors.violet_2,
                borderColor: LightTheme.colors.violet_primary,
              },
            ]}
          >
            <Text
              style={[
                styles.eventBtnTxt,
                {
                  color: LightTheme.colors.violet_primary,
                },
              ]}
            >
                    {t("NUTRIONIST")}
            </Text>
          </View>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.violet_primary,
              },
            ]}
          ></View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              styles.eventBtnWrap,
              {
                backgroundColor: LightTheme.colors.green_2,
                borderColor: LightTheme.colors.primary_btn,
              },
            ]}
          >
            <Text
              style={[
                styles.eventBtnTxt,
                {
                  color: LightTheme.colors.primary_btn,
                },
              ]}
            >
               {t("TEACHERS")}
            </Text>
          </View>
          <View
            style={[
              styles.eventDotActive,
              {
                backgroundColor: LightTheme.colors.primary_btn,
              },
            ]}
          ></View>
        </View>
      </View>
      <AuthInput
        inputProps={{
          placeholder: t("SEARCH_CARDIOLOGIST_GENERAL_PHYSICIAN"),
          style: {},
        }}
        wrapstyle={{
          height: 59,
          borderRadius: 10,
          borderColor: LightTheme.colors.yellow_3,
          marginTop: 20,
        }}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <BookMarkComp
            key={index}
            name={item?.name}
            exp={item?.exp}
            profession={item?.profession}
          />
        )}
      />
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
    marginVertical: 20,
  },
  eventBtns: {
    // paddingHorizontal: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventBtnWrap: {
    width: 107,
    height: 40,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
  },
  eventDotActive: {
    marginTop: 8,
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  eventBtnTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
  },
});
