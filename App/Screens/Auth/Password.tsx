import { BackHandler, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthInput from "components/AuthInput";
import { actions as action } from "../../Redux/Auth/slice";
import Lock from "assets/icons/lock.svg";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { selectPassword, selectloader } from "../../Redux/Auth/selector";
import { updatePasswordInterface } from "../../Redux/Auth/types";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";
const Password = (props: any) => {
  const form: updatePasswordInterface = useSelector(selectPassword);
  const dispatch = useDispatch();
  const handleChnage = (value: any, name: any) => {
    dispatch(action.updatePasswordFormValue({ key: name, value: value }));
  };
  const handleCreatePassword = async() => {
    dispatch(
      action.doCreatePassword({
        callback(check) {
          dispatch(action.clearUpdatePasswordForm());
          props.navigation.navigate(SCREENS.CREATE_PARENT);
        },
      })
    );
    await analytics().logEvent('passwordCreation', {

     })
  };
  const loader = useSelector(selectloader);
  const { t } = useTranslation();
  const isSelectionModeEnabled = () => {
    return true; // Example implementation
  };

  const disableSelectionMode = () => {
    props.navigation.navigate(SCREENS.PHONENUMBER);
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
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [isSelectionModeEnabled, disableSelectionMode])
  );

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
          inputProps={{
            placeholder: t("PASSWORD"),
            value: form.password,
            onChangeText: (text) => handleChnage(text, "password"),
          }}
          icon={<Lock height={23} />}
          isPass
        />
        <AuthInput
          inputProps={{
            placeholder: t("CONFIRM_PASSWORD"),
            value: form.confirmPassword,
            onChangeText: (text) => handleChnage(text, "confirmPassword"),
          }}
          icon={<Lock height={23} />}
          isPass
        />
        <PrimaryButton
          title={t("CREATE_PASSWORD")}
          onPress={handleCreatePassword}
          disabled={loader}
          loading={loader}
        />
      </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

export default Password;

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
