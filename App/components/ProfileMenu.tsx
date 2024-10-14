import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LightTheme } from "../utils/theme";

interface ProfileMenuInterface {
  onPress: any;
  textStyle: any;
  title: string;
  Icon: any;
}

const ProfileMenu = ({
  onPress,
  title,
  textStyle,
  Icon,
}: ProfileMenuInterface) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.menuItem]}>
      {Icon && Icon}
      <Text style={[styles.menuText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ProfileMenu;

ProfileMenu.defaultProps = {
  textStyle: {},
  Icon: null,
};

const styles = StyleSheet.create({
  menuItem: {
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 30,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
  },
});
