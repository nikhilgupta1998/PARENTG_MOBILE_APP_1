import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import AuthInput from "../../components/AuthInput";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "../../components/PrimaryButton";
import global from "../../styles/global";
import { actions as action } from "../../Redux/Auth/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOTPForm,
  selectParentForm,
  selectProfileForm,
} from "../../Redux/Auth/selector";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
import MarkDisable from "assets/icons/mark-disable.svg";
import MarkEnable from "assets/icons/mark-enable.svg";
import analytics from "@react-native-firebase/analytics";
import { profiledFormInterface } from "../../Redux/Auth/types";
const Verifiedotp = (props: any) => {
  const dispatch = useDispatch();
  const handleChange = (value: any, name: any) => {
    dispatch(action.updateOTPFormValue({ key: name, value: value }));
  };
  const handleOTPVerification = async () => {
    await analytics().logEvent("otpVerification", {});
    dispatch(
      action.verifiedOtp({
        OTP: form?.otp,
        callback(check) {
          dispatch(action.clearOtpForm());

          if (check) {
            dispatch(
              action.updateParentFormFormValue({
                key: "mobileVerify",
                value: check,
              })
            );
            props.navigation.navigate(SCREENS.CREATE_FAMILY);
          } else {
            return;
          }
        },
      })
    );
  };
  const form = useSelector(selectOTPForm);
  const resendOTP = async () => {
    await analytics().logEvent("resendOtp", {});
    dispatch(
      action.doLogin({
        callback(check) {
          dispatch(action.clearOtpForm());
        },
      })
    );
  };
  const formProfile: profiledFormInterface = useSelector(selectParentForm);
  const { t } = useTranslation();
  return (
    <SafeAreaView style={[global.authcontainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={global.authcontainer}
      >
        <StatusBar
          backgroundColor={LightTheme.colors.background}
          barStyle={"dark-content"}
        />
        <View style={styles.wrap}>
          <View style={{ width: "100%" }}>
            <AuthInput
              style={{
                letterSpacing: 12,
              }}
              wrapstyle={{
                marginBottom: 0,
              }}
              inputProps={{
                placeholder: "XXXX",
                value: form?.otp,
                onChangeText: (text) => handleChange(text, "otp"),
                maxLength: 4,
                keyboardType: "number-pad",
              }}
            />
            <View
              style={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              {formProfile.mobileVerify ? <MarkEnable /> : <MarkDisable />}
            </View>
          </View>

          <View style={styles.tmcWrap}>
            <Text style={styles.tmcText1}> {t("DIDNT_GET_OTP")} </Text>
            <Text style={styles.tmcText2} onPress={resendOTP}>
              {t("RESEND")}
            </Text>
          </View>
          <PrimaryButton
            style={{ marginTop: 40 }}
            title={t("VERIFY_OTP")}
            onPress={handleOTPVerification}
            disabled={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Verifiedotp;
const styles = StyleSheet.create({
  wrap: {
    width: widthPercentageToDP("80%"),
    alignItems: "center",
  },
  btnText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    // lineHeight: 27,
  },
  tmcWrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 12,
    marginLeft: 8,
  },
  tmcText1: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    lineHeight: 19,
  },
  tmcText2: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.tandc,
    lineHeight: 19,
  },
});
