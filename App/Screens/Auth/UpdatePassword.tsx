import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AuthInput from "components/AuthInput";
import { actions as action } from "../../Redux/Auth/slice";
import Lock from "assets/icons/lock.svg";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import {
  selectForgotPasswordEmail,
  selectPassword,
  selectloader,
} from "../../Redux/Auth/selector";
import { updatePasswordInterface } from "../../Redux/Auth/types";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
import BackHeader from "components/BackHeader";
import { useFocusEffect } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";
const Password = (props: any) => {
  const form: updatePasswordInterface = useSelector(selectPassword);
  const dispatch = useDispatch();
  const handleChnage = (value: any, name: any) => {
    dispatch(action.updatePasswordFormValue({ key: name, value: value }));
  };
  const doUpdatePassword = async () => {
    dispatch(
      action.doUpdatePassword({
        callback() {
          dispatch(action.clearUpdatePasswordForm());
          props.navigation.navigate(SCREENS.SPLASH);
        },
      })
    );

    await analytics().logEvent("update_password", {});
  };
  const data = useSelector(selectForgotPasswordEmail);
  const goBack = () => {
    dispatch(action.clearUpdatePasswordForm());
    props.navigation.goBack();
  };
  const isSelectionModeEnabled = () => {
    return true; // Example implementation
  };

  const disableSelectionMode = () => {
    props.navigation.navigate(SCREENS.FORGOT_PASSWORD);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSelectionModeEnabled()) {
          disableSelectionMode();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [isSelectionModeEnabled, disableSelectionMode])
  );
  const loader = useSelector(selectloader);
  const { t } = useTranslation();
  return (
    <SafeAreaView style={[global.wrap]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[global.wrap,{padding:20}]}
      >
        <BackHeader
          iconStyle={undefined}
          title={t("OTHER.UPDATE_PASSWORD")}
          goback={goBack}
          titleStyle={{
            fontSize: 20,
          }}
          rightIconOnPress={undefined}
          RightIcon={undefined}
        />
        <View style={styles.authcontainer}>
          <StatusBar
            backgroundColor={LightTheme.colors.background}
            barStyle={"dark-content"}
          />
          <View style={styles.wrap}>
            <AuthInput
              inputProps={{
                placeholder: t("PASSWORD"),
                value: form.password,
                onChangeText: (text) => handleChnage(text, "password"),
              }}
              icon={<Lock height={23} />}
              isPass
              wrapstyle={{
                marginBottom: 0,
              }}
            />
            <Text
              style={{
                fontSize: 10,
                marginBottom: 0,
                marginLeft: 10,
                marginTop: 2,
              }}
            >
              Password must contain minimum 8 characters, at least one uppercase
              letter, one number, and one special character
            </Text>
            <AuthInput
              inputProps={{
                placeholder: t("CONFIRM_PASSWORD"),
                value: form.confirmPassword,
                onChangeText: (text) => handleChnage(text, "confirmPassword"),
              }}
              wrapstyle={{
                marginBottom: 0,
                marginTop: 15,
              }}
              icon={<Lock height={23} />}
              isPass
            />
            <Text
              style={{
                fontSize: 10,
                marginBottom: 10,
                marginLeft: 10,
                marginTop: 2,
              }}
            >
              Password must contain minimum 8 characters, at least one uppercase
              letter, one number, and one special character
            </Text>
            <PrimaryButton
              title={t("OTHER.UPDATE_PASSWORD")}
              onPress={doUpdatePassword}
              disabled={loader}
              loading={loader}
              style={{
                marginTop: "7%",
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Password;

const styles = StyleSheet.create({
  authcontainer: {
    backgroundColor: LightTheme.colors.background,
    flex: 0.35,
    justifyContent: "flex-end",
    alignItems: "center",
    // width: wp("100%"),
    // paddingVertical: 50,
  },
  wrap: {
    width: widthPercentageToDP("80%"),
    // alignItems: "center",
    top: "35%",
  },
  btnText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    // lineHeight: 27,
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
