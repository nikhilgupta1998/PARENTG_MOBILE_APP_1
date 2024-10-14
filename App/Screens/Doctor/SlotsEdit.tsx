import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackHeaderDoctor from "components/BackHeaderDoctor";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import { hp, width } from "../../constants/Dimenstions";
import SecondaryButton from "components/SecondaryButton";
import { useTranslation } from "react-i18next";

const SlotsEdit = () => {
  const data = [
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
    "18:00 PM",
  ];
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30, paddingBottom: 70 }]}>
      <BackHeader  iconStyle={undefined} Doctor
        title={t("SLOTS_EDIT")}
        titleStyle={
          {
            //   fontSize: 14,
          }
        }
      />
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 19,
          fontFamily: LightTheme.fontFamily.semiBold,
          color: LightTheme.colors.textColor6,
          marginVertical: 10,
        }}
      >
       
       {t("SELECT_DATE")}
      </Text>
      <FlatList
        data={data}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: (width - 60) / 3,
              //   alignItems: (index + 1) % 2 === 0 ? "flex-start" : "flex-end",
            }}
          >
            <View style={styles.eventBtnWrap} key={index}>
              <Text style={styles.eventBtnTxt}>{item}</Text>
            </View>
          </View>
        )}
      />
      <SecondaryButton title={t("UPDATE_SLOTS")} />
    </View>
  );
};

export default SlotsEdit;

const styles = StyleSheet.create({
  eventBtnWrap: {
    // width: "65%",
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
});
