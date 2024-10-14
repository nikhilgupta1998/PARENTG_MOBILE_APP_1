import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Arrow from "../assets/icons/back_arrow.svg";
import global from "../styles/global";
import { LightTheme } from "../utils/theme";

interface BackHeaderProps {
  title: string;
  style: any;
  titleStyle: any;
  RightIcon: any;
  goback : any
  rightIconOnPress :any
  iconStyle:any
}
const BackHeader = ({
  title,
  style,
  RightIcon,
  titleStyle,
  iconStyle,
  goback,
  rightIconOnPress,
}: BackHeaderProps) => {
  return (
    <View style={[styles.wrap, style]}>
      <TouchableOpacity 
       style={[
        styles.btn,
        iconStyle,
      ]}
      onPress={goback}>
        <Arrow />
      </TouchableOpacity>
      <View style={styles.right}>
        <Text
          style={[
            styles.title,
            titleStyle,
            {
              marginRight: RightIcon ? 0 : 40,
            },
          ]}
        >
          {title}
        </Text>
      </View>
      {RightIcon && (
        <TouchableOpacity style={styles.btn_delete} onPress={rightIconOnPress}>{RightIcon}</TouchableOpacity>
      )}
    </View>
  );
};

BackHeader.defaultProps = {
  style: {},
  titleStyle: {},
};

export default BackHeader;

BackHeader.defaultProps = {
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
    height: 40,
    width: 40,
    borderWidth: 1.5,
    borderColor: "#7fd4d3",
    borderRadius: 30,
    ...global.flexCenter,
    backgroundColor:"#fff"
    // position: "absolute",
  },
  btn_delete: {
    height: 40,
    width: 40,
    marginRight:0,
    borderWidth: 1.5,
    borderColor: "#7fd4d3",
    borderRadius: 30,
    ...global.flexCenter,
  },
  right: {
    flex: 1,
    ...global.flexCenter,
  },
  title: {
    fontSize: 30,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
    marginRight: 35,
  },
});
