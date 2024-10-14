import { DefaultTheme } from "@react-navigation/native";

export const fontFamily = {
  light: "Poppins-Light",
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
  extra_bold: "Poppins-ExtraBold",
};

export const palette = {
  primary: "#045de9",
  primaryDark: "#067EEE",
  primary_btn: "rgba(0,170,168,1)",
  green_2: "rgba(0, 171, 168, 0)",
  green_1: "rgba(0, 170, 168, 0.1)",
  green_6: "rgba(0, 170, 168, 0.5)",
  green_3: "rgba(0, 108, 4, 1)",
  green_4: "rgba(95, 255, 101, 0.09)",
  green_5: "rgba(0, 108, 4, 0.9)",
  green_7: "rgba(0, 218, 22, 1)",
  input_placeholder_color: "rgba(0, 0, 0, 0.5)",
  input_border_color: "rgba(43, 39, 40, 0.1)",
  white: "#fff",
  black: "#000",
  textColor1: "rgba(43, 39, 40, 1)",
  textColor5: "rgba(43, 39, 40, 0.71)",
  textColor3: "rgba(48, 60, 88, 0.8)",
  textColor4: "rgba(48, 60, 88, 0.2)",
  textColor6: "rgba(48, 60, 88, 0.3)",
  textColor7: "rgba(48, 60, 88, 0.5)",
  orange_1: "rgba(232, 96, 75, 1)",
  orange_2: "  rgb(255, 238, 230)",

  yellow_primary: "rgba(255,193,7,1)",
  yellow_2: "rgba(255, 244, 204, 0.2)",
  yellow_3: "rgba(255, 193, 7, 0.2)",
  yellow_4: "rgba(255, 193, 7, 0.3)",
  violet_primary: "rgba(143,123,231,1)",
  violet_2: "rgba(237, 233, 255, 0.5)",
  headerTextColor: "rgba(48, 60, 88, 0.4)",
  headerTextColor_2: "rgba(48, 60, 88, 1)",

  light_blue_1: "rgba(0, 170, 168, 1)",
  light_blue_2: "rgba(138, 255, 254, 0.2)",
  red_1: "rgba(252, 35, 89, 1)",
  red_2: "rgba(255, 0, 0, 0.73)",
  light_red: "rgba(255, 226, 238, 0.2)",
  tandc: "rgba(255,20,105,1)",
  textColor2: "#000",
  background: "#fff",
  focused_icon: "rgba(48, 60, 88, 1)",
  unfocused_icon: "rgba(43, 39, 40, 0.4)",  img_bg_1: "rgba(43, 39, 40, 1)",
  img_bg_2: "rgba(43, 39, 40, 0)",
  booking_border: "rgba(228, 228, 228, 1)",
  bookmark_border: "rgba(237, 237, 237,1)",
  time_back: "rgba(92, 89, 90, 0.02)",
};

export const LightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...palette,
  },
  fontFamily,
};

export const DarkTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    ...palette,
    background: "#0D1721",
  },
  fontFamily,
};
