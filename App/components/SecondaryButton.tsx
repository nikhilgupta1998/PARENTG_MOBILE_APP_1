import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import global from "../styles/global";
import { LightTheme } from "../utils/theme";

interface SecondaryButtonProps {
  title: any;
  style: any;
  onPress: any;
  textColor: string;
  textStyle: any;
  loading: boolean;
  Showborder: boolean;
}

const SecondaryButton = ({
  title,
  style,
  textColor,
  onPress,
  textStyle,
  loading,
  Showborder,
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
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

export default SecondaryButton;

SecondaryButton.defaultProps = {
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
    backgroundColor: LightTheme.colors.yellow_primary,
    borderColor: LightTheme.colors.input_border_color,
  },
  btnText: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.white,
    // lineHeight: 27,
  },
});
