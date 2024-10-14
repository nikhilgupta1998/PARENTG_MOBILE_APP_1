import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Arrow from "../assets/icons/arrow_doc.svg";
import global from "../styles/global";
import { LightTheme } from "../utils/theme";

interface BackHeaderDoctorProps {
  title: string;
  style: any;
  titleStyle: any;
  RightIcon: any;
}
const BackHeaderDoctor = ({
  title,
  style,
  RightIcon,
  titleStyle,
}: BackHeaderDoctorProps) => {
  return (
    <View style={[styles.wrap, style]}>
      <TouchableOpacity style={styles.btn}>
        <Arrow />
      </TouchableOpacity>
      <View style={styles.right}>
        <Text
          style={[
            styles.title,
            titleStyle,
            {
              marginRight: RightIcon ? 0 : 35,
            },
          ]}
        >
          {title}
        </Text>
      </View>
      {RightIcon && (
        <TouchableOpacity style={styles.btn}>{RightIcon}</TouchableOpacity>
      )}
    </View>
  );
};

BackHeaderDoctor.defaultProps = {
  style: {},
  titleStyle: {},
};

export default BackHeaderDoctor;

BackHeaderDoctor.defaultProps = {
  style: {},
  RightIcon: null,
};

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  btn: {
    height: 55,
    width: 55,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.yellow_4,
    borderRadius: 30,
    ...global.flexCenter,
    // position: "absolute",
  },
  right: {
    flex: 1,
    ...global.flexCenter,
  },
  title: {
    fontSize: 36,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
    marginRight: 35,
  },
});
