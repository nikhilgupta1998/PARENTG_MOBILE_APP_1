import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useRef, useState } from "react";
import PhoneInput from "react-native-phone-input";
import Google from "assets/icons/google.svg";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginForm, selectloader } from "../../Redux/Auth/selector";
import { actions as action, actions } from "../../Redux/Auth/slice";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
import analytics from "@react-native-firebase/analytics";
import showToast from "utils/toast";
function GooglePhone(props: any) {
  // const form: updatePasswordInterface = useSelector(selectPassword);
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const form = useSelector(selectLoginForm);
  const phoneInput: any = useRef(null);
  const onPhoneNumber = (text: any) => {
    let phone_data = text.split(" ");
    dispatch(
      action.updateLoginFormValue({
        key: "isMobileNumberValid",
        value: phoneInput.current.isValidNumber(),
      })
    );
    if (phone_data.length > 1) {
      dispatch(
        action.updateLoginFormValue({
          key: "countryCode",
          value: phone_data[0],
        })
      );
      let final_phone = phone_data.splice(1, phone_data.length).join("");

      dispatch(
        action.updateLoginFormValue({
          key: "mobileNumber",
          value: final_phone.replace(/-/g, ""),
        })
      );
      dispatch(
        action.updateLoginFormValue({
          key: "isMobileNumberValid",
          value: phoneInput.current.isValidNumber(),
        })
      );
    } else {
      dispatch(
        action.updateLoginFormValue({
          key: "countryCode",
          value: phone_data[0],
        })
      );
    }
  };
  const loader = useSelector(selectloader);
  const handleLogin = () => {
    dispatch(
      action.doCheckUser({
        callback(check) {
          if (check) {
            if (form.countryCode == "+91") {
              dispatch(
                action.doLogin({
                  callback(check) {
                    props.navigation.navigate(SCREENS.OTP);
                  },
                })
              );
            } else {
              dispatch(
                action.doGoogleLoginMobileNumberUpdate({
                  callback(check, profileCompleted) {
                    if (!profileCompleted) {
                      props.navigation.navigate(SCREENS.CREATE_PARENT);
                    }
                  },
                })
              );
            }
          } else {
            showToast("Your number already exist");
          }
        },
      })
    );
    analytics().logEvent("google_phone_update", {
      mobile: form.mobileNumber,
      phoneCode: form.countryCode,
    });
  };
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
          <PhoneInput
            ref={(ref: any) => {
              phoneInput.current = ref;
            }}
            autoFormat
            initialCountry={"in"}
            onChangePhoneNumber={(val, iso2) => {
              onPhoneNumber(val);
            }}
            disabled={form.mobileVerify}
            initialValue={
              form.countryCode ? form.countryCode : "+91" + form.mobileNumber
            }
            textStyle={{
              color: LightTheme.colors.black,
            }}
            pickerBackgroundColor={
              isDarkTheme ? LightTheme.colors.black : LightTheme.colors.white
            }
            pickerItemStyle={{ backgroundColor: LightTheme.colors.white }}
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              borderWidth: 1.5,
              borderColor: LightTheme.colors.input_border_color,
              borderRadius: 13,
              paddingHorizontal: 13,
              height: 51,
            }}
            textProps={{
              placeholder: t("ENTER_A_PHONE_NUMBER"),
            }}
          />

          <PrimaryButton
            title={t("LOGIN")}
            onPress={handleLogin}
            disabled={loader}
            loading={loader}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default GooglePhone;
const styles = StyleSheet.create({
  wrap: {
    width: widthPercentageToDP("80%"),
    alignItems: "center",
  },
  btnText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
  },
  tmcWrap: {},
  tmcText1: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    textAlign: "center",
    color: LightTheme.colors.textColor1,
    lineHeight: 19,
  },
  tmcText2: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.tandc,
    lineHeight: 19,
  },
});
