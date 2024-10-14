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
import { actions as action } from "../../Redux/Auth/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectForgotPasswordEmail,
  selectloader,
} from "../../Redux/Auth/selector";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
import { UserSendEmailInterface } from "../../Redux/Auth/types";
import { useFocusEffect } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";
const ForgotPasswordCode = (props: any) => {
  const dispatch = useDispatch();
  const handleChange = (value: any, name: any) => {
    dispatch(action.forgotPasswordSendEmailForm({ key: name, value: value }));
  };
  const doSend = () => {
    dispatch(
      action.doSendForgotPasswordCode({
        callback() {
          dispatch(action.clearForgotPasswordSendCodeForm());
          props.navigation.navigate(SCREENS.UPDATE_PASSWORD);
        },
      })
    );

    analytics().logEvent("forgot_password_phone_verification", {
      mobile: form.mobileNumber,
      phoneCode: form.countryCode,
    });
  };
  const goBack = () => {
    dispatch(action.clearUpdatePasswordForm());
    props.navigation.goBack();
  };
  const form: UserSendEmailInterface = useSelector(selectForgotPasswordEmail);
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
  const resendOTP = () => {
    setIsTimerRunning(true);
    dispatch(
      action.doSendForgotPasswordEmail({
        callback() {},
      })
    );
  };
  useEffect(() => {
    setIsTimerRunning(true);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    setTimer(0);
  };
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
              value: form?.code,
              onChangeText: (text) => handleChange(text, "code"),
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
            onPress={doSend}
            disabled={loader}
            loading={loader}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordCode;

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
