import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import global from "../styles/global";
import { LightTheme } from "../utils/theme";

interface PrimaryButtonProps {
  title: any;
  style: any;
  onPress: any;
  textColor: string;
  textStyle: any;
  loading: boolean;
  Showborder: boolean;
  disabled: boolean;
}

const PrimaryButton = ({
  title,
  style,
  textColor,
  onPress,
  textStyle,
  loading,
  disabled,
  Showborder,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.btn,
        style,
        {
          borderWidth: Showborder ? 1.5 : 0,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={LightTheme.colors.white} />
      ) : (
        <Text style={[styles.btnText, { color: textColor, ...textStyle }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

PrimaryButton.defaultProps = {
  style: {},
  textStyle: {},
  textColor: LightTheme.colors.white,
  onPress: () => {},
  loading: false,
  Showborder: false,
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    borderRadius: 13,
    height: 51,
    ...global.flexCenter,
    backgroundColor: LightTheme.colors.primary_btn,
    borderColor: LightTheme.colors.input_border_color,
    marginBottom:10
  },
  btnText: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.white,
    // lineHeight: 27,
  },
});
