import { StyleSheet } from "react-native";
import { hp, wp } from "../constants/Dimenstions";
import font from "./font";
import { LightTheme } from "../utils/theme";

export default StyleSheet.create({
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  wrap: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: LightTheme.colors.background,
  },
  authcontainer: {
    backgroundColor: LightTheme.colors.background,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: wp("100%"),
    paddingVertical: 50,
  },
  tabbarIcon: {
    width: 26,
    height: 26,
    marginTop: 2,
  },
  greenShder: {
    width: "100%",
    height: 250,
    position: 'absolute',
    top: 0,
    right: 0,
 transform: [{ rotateY: "180deg" }] ,
    zIndex: -10,
  },
  eventBtnWrap: {
    paddingHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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

  modalWrap: {
    backgroundColor: LightTheme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
