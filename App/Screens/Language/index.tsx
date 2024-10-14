import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import global from "../../styles/global";
import { images } from "../../constants/img";
import { LightTheme } from "utils/theme";
import PrimaryButton from "components/PrimaryButton";
import { selectLoginForm } from "../../Redux/Auth/selector";
import { useSelector } from "react-redux";
import { SCREENS } from "../../constants/var";

function index(props: any) {
  const form = useSelector(selectLoginForm);
  const handleLanguageSelect = () => {
    props.navigation.navigate(SCREENS.PASSWORD);
  };
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
      <Text style={[styles.title]}>Language</Text>
      <View style={styles.eventBtns}>
        <View
          style={{ alignItems: "center", marginVertical: 20, marginTop: 70 }}
        >
          <View
            style={[
              styles.eventBtnWrap,
              {
                backgroundColor: LightTheme.colors.green_1,
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
              English
            </Text>
          </View>
        </View>
        {/* <View style={{ alignItems: "center", marginVertical: 40 }}>
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
              Hindi
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
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
              Arabic
            </Text>
          </View>
        </View> */}
      </View>
      <View style={{ top: "55%" }}>
        <PrimaryButton
          title={"Procced"}
          onPress={handleLanguageSelect}
          disabled={false}
        />
      </View>
    </View>
  );
}

export default index;
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
  },
  eventDotActive: {
    marginTop: 30,
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  eventBtnTxt: {
    fontSize: 25,
    fontFamily: LightTheme.fontFamily.semiBold,
  },
  eventBtns: {
    paddingHorizontal: 30,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventBtnWrap: {
    width: 250,
    height: 70,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
  },
});
