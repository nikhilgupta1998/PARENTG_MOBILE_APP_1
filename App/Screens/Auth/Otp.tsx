import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthInput from "components/AuthInput";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import { actions as action, actions } from "../../Redux/Auth/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGoogleLoginSetHash,
  selectOTPForm,
  selectProfileForm,
  selectloader,
} from "../../Redux/Auth/selector";
import analytics from "@react-native-firebase/analytics";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
const Otp = (props: any) => {
  const dispatch = useDispatch();
  const handleChnage = (value: any, name: any) => {
    dispatch(action.updateOTPFormValue({ key: name, value: value }));
  };
  const googleHash = useSelector(selectGoogleLoginSetHash);
  const handleOTPVerification = async () => {
    dispatch(
      action.OTPVerification({
        callback(check, profileCompleted) {
          dispatch(action.clearOtpForm());
          if (googleHash.googleHash.length > 0) {
            dispatch(
              action.doGoogleLoginMobileNumberUpdate({
                callback(check, profileCompleted) {
                  if (!profileCompleted) {
                    props.navigation.navigate(SCREENS.CREATE_PARENT);
                  }
                },
              })
            );
          } else if (check) {
            props.navigation.navigate(SCREENS.PASSWORD);
          } else {
            if (profileCompleted) {
              props.navigation.navigate(SCREENS.CREATE_PARENT);
            } else {
              props.navigation.navigate(SCREENS.SPLASH);
            }
          }
        },
      })
    );

    await analytics().logEvent("opt_verification", {});
  };
  const form = useSelector(selectOTPForm);
  const [timer, setTimer] = useState(300); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setIsTimerRunning(false); // Stop the timer when it reaches 0
            return 300; // Reset timer to initial value
          } else {
            return prevTimer - 1; // Decrement timer by 1 second
          }
        });
      }, 1000); // Update timer every second
    }

    return () => clearInterval(interval); // Clean up interval on unmount or timer stop
  }, [isTimerRunning]);
  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimer(300); // Reset timer to initial value
  };
  useEffect(() => {
    if (timer === 0) {
      stopTimer(); // Automatically stop timer after one minute
    }
  }, [timer]);
  const resendOTP = async () => {
    setIsTimerRunning(true);
    dispatch(
      action.doLogin({
        callback(check) {
          dispatch(action.clearOtpForm());
        },
      })
    );
    await analytics().logEvent("resendOtp", {});
  };
  useEffect(() => {
    setIsTimerRunning(true);
  }, []);
  const loader = useSelector(selectloader);
  const { t } = useTranslation();
  return (
    <SafeAreaView style={global.authcontainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={global.authcontainer}
      >
        <StatusBar
          backgroundColor={LightTheme.colors.background}
          barStyle={"dark-content"}
        />
        <View style={styles.wrap}>
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
              onChangeText: (text) => handleChnage(text, "otp"),
              maxLength: 4,
              keyboardType: "number-pad",
            }}
          />
          {isTimerRunning && (
            <Text style={styles.tmcWrap}>Resend OTP in: {timer} seconds</Text>
          )}

          {!isTimerRunning && (
            <View style={styles.tmcWrap}>
              <Text style={styles.tmcText1}> {t("DIDNT_GET_OTP")} </Text>
              <Text style={styles.tmcText2} onPress={resendOTP}>
                {t("RESEND")}
              </Text>
            </View>
          )}

          <PrimaryButton
            style={{ marginTop: 40 }}
            title={t("VERIFY_OTP")}
            onPress={handleOTPVerification}
            disabled={loader}
            loading={loader}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Otp;

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
