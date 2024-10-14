import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LightTheme } from "../utils/theme";
import { images } from "../constants/img";
import WhiteStar from "../assets/icons/white_star.svg";

interface BookMarkComp {
  name: string;
  exp: string;
  profession: string;
}

const BookMarkComp = ({ name, exp, profession }: BookMarkComp) => {
  return (
    <View style={styles.wrap}>
      <>
        <Image source={images.AVATAR} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.exp}>{exp}</Text>
          <Text style={styles.work}>{profession}</Text>
        </View>

        <View style={styles.ratingWrap}>
          <Text style={styles.ratingTxt}>4.5</Text>
          <WhiteStar />
        </View>
      </>
    </View>
  );
};

export default BookMarkComp;

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    borderWidth: 2,
    borderColor: LightTheme.colors.bookmark_border,
    backgroundColor: LightTheme.colors.background,
    height: 128,
    borderRadius: 19,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatar: {
    height: 85,
    width: 85,
    borderRadius: 50,
    marginRight: 15,
  },
  info: {},
  name: {
    fontSize: 20,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
  },
  exp: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.primary_btn,
  },
  work: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
  },

  ratingWrap: {
    height: 22,
    width: 44,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.green_3,
    position: "absolute",
    bottom: 10,
    right: 10,
  },

  ratingTxt: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.white,
    marginRight: 5,
    marginTop: 3,
  },
});
