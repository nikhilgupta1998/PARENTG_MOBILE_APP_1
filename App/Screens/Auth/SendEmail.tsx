import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import React, { useRef } from "react";
import { actions as action } from "../../Redux/Auth/slice";
import PhoneInput from "react-native-phone-input";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import {
  selectForgotPasswordEmail,
  selectloader,
} from "../../Redux/Auth/selector";
import { UserSendEmailInterface } from "../../Redux/Auth/types";
import analytics from "@react-native-firebase/analytics";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";

const SendEmail = (props: any) => {
  const form: UserSendEmailInterface = useSelector(selectForgotPasswordEmail);
  const dispatch = useDispatch();
  const handleChange = (value: any, name: any) => {
    dispatch(action.forgotPasswordSendEmailForm({ key: name, value: value }));
  };
  const doSend = async () => {
    dispatch(
      action.doSendForgotPasswordEmail({
        callback() {
          dispatch(action.clearforgotPasswordSendEmailForm());
          props.navigation.navigate(SCREENS.FORGOT_PASSWORD_CODE);
        },
      })
    );

    await analytics().logEvent("forgot_password", {
      mobile: form.countryCode + form.mobileNumber,
    });
  };
  const goBack = () => {
    dispatch(action.clearUpdatePasswordForm());
    props.navigation.goBack();
  };
  const loader = useSelector(selectloader);
  const { t } = useTranslation();
  const phoneInput: any = useRef(null);
  const onPhoneNumber = (text: any) => {
    let phone_data = text.split(" ");
    dispatch(
      action.forgotPasswordSendEmailForm({
        key: "isMobileNumberValid",
        value: phoneInput.current.isValidNumber(),
      })
    );
    if (phone_data.length > 1) {
      dispatch(
        action.forgotPasswordSendEmailForm({
          key: "countryCode",
          value: phone_data[0],
        })
      );
      let final_phone = phone_data.splice(1, phone_data.length).join("");

      dispatch(
        action.forgotPasswordSendEmailForm({
          key: "mobileNumber",
          value: final_phone.replace(/-/g, ""),
        })
      );
      dispatch(
        action.forgotPasswordSendEmailForm({
          key: "isMobileNumberValid",
          value: phoneInput.current.isValidNumber(),
        })
      );
    } else {
      dispatch(
        action.forgotPasswordSendEmailForm({
          key: "countryCode",
          value: phone_data[0],
        })
      );
    }
  };
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
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
              marginBottom: 15,
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
            title={t("SEND_EMAIL")}
            onPress={doSend}
            disabled={!form.isMobileNumberValid || loader}
            loading={loader}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendEmail;

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
