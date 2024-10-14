import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-native-phone-input";
import Google from "assets/icons/google.svg";
import Apple from "assets/appple.svg";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGoogleLoading,
  selectLoginForm,
  selectloader,
} from "../../Redux/Auth/selector";
import { actions as action, actions } from "../../Redux/Auth/slice";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
import Lock from "assets/icons/lock.svg";
import AuthInput from "components/AuthInput";
import { getMyStringValue } from "utils/local-storage";
import { CommonActions } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";
import { images } from "../../constants/img";
import {
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import { UserSocialTypeEnum } from "../../Redux/Auth/types";
import { SafeAreaView } from "react-native-safe-area-context";

const PhoneNumber = (props: any) => {
  GoogleSignin.configure();
  let user: any = null;
  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const dispatch = useDispatch();
  const handleLogin = async () => {
    dispatch(
      action.doCheckUser({
        callback(check) {
          if (check) {
            if (form.countryCode == "+91") {
              dispatch(
                action.doLogin({
                  callback(check) {
                    dispatch(action.clearLoginFromForm());
                    props.navigation.navigate(SCREENS.OTP);
                  },
                })
              );
            } else {
              dispatch(action.clearLoginFromForm());
              props.navigation.navigate(SCREENS.PASSWORD);
            }
          } else {
            SetShowPassword(true);
          }
        },
      })
    );
    await analytics().logEvent("phoneVerify", {
      mobile: form.mobileNumber,
      phoneCode: form.countryCode,
    });
  };
  const handleWithPasswordLogin = async () => {
    dispatch(
      action.doLoginWithPassword({
        callback(check, profileCompleted) {
          dispatch(action.clearLoginFromForm());
          props.navigation.navigate(SCREENS.SPLASH);
        },
      })
    );

    await analytics().logEvent("phoneLogin", {
      mobile: form.mobileNumber,
      phoneCode: form.countryCode,
    });
  };
  const form = useSelector(selectLoginForm);
  useEffect(() => {
    if (!form.isMobileNumberValid) {
      SetShowPassword(false);
    }

    return () => {};
  }, [form.isMobileNumberValid]);

  const [showPassword, SetShowPassword] = useState(false);
  const { t } = useTranslation();

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
  const handleChange = (value: any, name: any) => {
    dispatch(action.updateLoginFormValue({ key: name, value: value }));
  };
  const resetStackAndGoToLogin = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.PHONENUMBER }],
  });
  const resetStackAndBottomTabs = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.CREATE_PARENT }],
  });
  const resetStackAndProfileCreate = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.HOME }],
  });
  const resetStackAndUserProfileCreate = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.CREATE_CHILD }],
  });
  useEffect(() => {
    if (Platform.OS == "ios") {
      if (!appleAuth.isSupported) return;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(
        (error) => updateCredentialStateForUser(-1)
      );
    }
  }, []);

  useEffect(() => {
    if (Platform.OS == "ios") {
      if (!appleAuth.isSupported) return;

      return appleAuth.onCredentialRevoked(async () => {
        console.warn("Credential Revoked");
        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(
          (error) => updateCredentialStateForUser(-1)
        );
      });
    }
  }, []);
  async function fetchAndUpdateCredentialState(
    updateCredentialStateForUser: any
  ) {
    if (user === null) {
      updateCredentialStateForUser("N/A");
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser("AUTHORIZED");
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }
  const loader = useSelector(selectloader);
  const loading = useSelector(selectGoogleLoading);
  const onGooglePress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: any = await GoogleSignin.signIn();
      dispatch(
        actions.doLoginWithGoogle({
          name: userInfo?.user?.name,
          googleId: userInfo?.user?.id,
          email: userInfo?.user?.email,
          googlePhoto: userInfo.user.photo,
          socialType: UserSocialTypeEnum.GOOGLE,
          identityToken: null,
          callback: async (check: boolean, profileCompleted: boolean) => {
            if (profileCompleted) {
              let token = await getMyStringValue("@token");
              if (token) {
                dispatch(
                  actions.getMeRequest({
                    callback: (
                      check: boolean,
                      profileCompleted: boolean,
                      childAdded: boolean
                    ) => {
                      if (check) {
                        if (!profileCompleted) {
                          props.navigation.dispatch(resetStackAndBottomTabs);
                        } else if (!childAdded) {
                          props.navigation.dispatch(
                            resetStackAndUserProfileCreate
                          );
                        } else {
                          props.navigation.dispatch(resetStackAndProfileCreate);
                        }
                      } else {
                        props.navigation.dispatch(resetStackAndGoToLogin);
                      }
                    },
                  })
                );
              } else {
                props.navigation.dispatch(resetStackAndGoToLogin);
              }
            } else if (!profileCompleted && !check) {
              props.navigation.navigate(SCREENS.GOOGLE_PHONE_NUMBER);
            } else if (check) {
              props.navigation.navigate(SCREENS.CREATE_PARENT);
            }
          },
        })
      );
      GoogleSignin.signOut();
      await analytics().logEvent("googleLogin", {
        email: userInfo?.user?.email,
        googleId: userInfo?.user?.id,
        socialType: UserSocialTypeEnum.GOOGLE,
      });
    } catch (error: any) {
      console.log("error", error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const onApplePress = async () => {
    if (Platform.OS == "ios") {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        console.log("appleAuthRequestResponse", appleAuthRequestResponse);

        const {
          user: newUser,
          email,
          nonce,
          identityToken,
          realUserStatus,
          fullName,
        } = appleAuthRequestResponse;
        user = newUser;
        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(
          (error) => updateCredentialStateForUser(0)
        );
        dispatch(
          actions.doLoginWithGoogle({
            name: fullName?.familyName || "",
            googleId: newUser,
            email: email || "",
            googlePhoto: "",
            identityToken: identityToken,
            socialType: UserSocialTypeEnum.APPLE,
            callback: async (check: boolean, profileCompleted: boolean) => {
              await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGOUT,
                requestedScopes: [
                  appleAuth.Scope.EMAIL,
                  appleAuth.Scope.FULL_NAME,
                ],
              });
              if (profileCompleted) {
                let token = await getMyStringValue("@token");
                if (token) {
                  dispatch(
                    actions.getMeRequest({
                      callback: (
                        check: boolean,
                        profileCompleted: boolean,
                        childAdded: boolean
                      ) => {
                        if (check) {
                          if (!profileCompleted) {
                            props.navigation.dispatch(resetStackAndBottomTabs);
                          } else if (!childAdded) {
                            props.navigation.dispatch(
                              resetStackAndUserProfileCreate
                            );
                          } else {
                            props.navigation.dispatch(
                              resetStackAndProfileCreate
                            );
                          }
                        } else {
                          props.navigation.dispatch(resetStackAndGoToLogin);
                        }
                      },
                    })
                  );
                } else {
                  props.navigation.dispatch(resetStackAndGoToLogin);
                }
              } else if (!profileCompleted && !check) {
                props.navigation.navigate(SCREENS.GOOGLE_PHONE_NUMBER);
              } else if (check) {
                props.navigation.navigate(SCREENS.CREATE_PARENT);
              }
            },
          })
        );
        if (identityToken) {
          // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
          console.log(nonce, identityToken);
        } else {
          // no token - failed sign-in?
        }

        if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
          console.log("I'm a real person!");
        }

        console.log(`Apple Authentication Completed, ${user}, ${email}`);
      } catch (error: any) {
        if (error.code === appleAuth.Error.CANCELED) {
          console.warn("User canceled Apple Sign in.");
        } else {
          console.error(error);
        }
      }
    } else {
    }
  };

  const goSendEmail = () => {
    props.navigation.navigate(SCREENS.FORGOT_PASSWORD);
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
        <Image source={images.LOGO} style={styles.image} resizeMode="contain" />
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
          {showPassword && form.isMobileNumberValid && (
            <View>
              <AuthInput
                inputProps={{
                  placeholder: t("PASSWORD"),
                  value: form.password,
                  onChangeText: (text) => handleChange(text, "password"),
                  // keyboardType: "visible-password",
                }}
                icon={<Lock height={23} />}
                isPass
              />
            </View>
          )}

          {form.isMobileNumberValid && !showPassword && (
            <PrimaryButton
              title={t("LOGIN")}
              onPress={handleLogin}
              disabled={loader}
              loading={loader}
            />
          )}
          {showPassword && form.isMobileNumberValid && (
            <PrimaryButton
              title={t("OTHER.LOGIN_WITH_PASSWORD")}
              onPress={handleWithPasswordLogin}
              disabled={loader}
              loading={loader}
            />
          )}
          {showPassword && form.isMobileNumberValid && (
            <View style={styles.tmcWrap}>
              <Text style={styles.tmcText3}>you don't have password</Text>
              <TouchableOpacity onPress={goSendEmail}>
                <Text style={styles.tmcText4}>{t("CLICK_HERE")}</Text>
              </TouchableOpacity>
            </View>
          )}
          <PrimaryButton
            Showborder
            style={{
              backgroundColor: LightTheme.colors.white,
              marginBottom: 10,
            }}
            title={
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={styles.btnText}>{t("LOGIN_WITH_GOOGLE")} </Text>
                <Google />
              </View>
            }
            textColor={LightTheme.colors.textColor1}
            textStyle={{
              fontSize: 15,
            }}
            onPress={() => onGooglePress()}
            disabled={loading}
            loading={undefined}
          />
          {Platform.OS == "ios" && (
            <PrimaryButton
              Showborder
              style={{
                backgroundColor: LightTheme.colors.white,
                marginBottom: 14,
              }}
              title={
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Text style={styles.btnText}>{t("LOGIN_WITH_APPLE")} </Text>
                  <Apple />
                </View>
              }
              textColor={LightTheme.colors.textColor1}
              textStyle={{
                fontSize: 15,
              }}
              onPress={onApplePress}
              disabled={loading}
              loading={undefined}
            />
          )}
          <View>
            <Text style={styles.tmcText1}>
              {t("LOGIN_WITH_GOBY_CLICKING_SIGNUP_YOU_ARE_AGREE_WITH_OUR")}
            </Text>
            <Text
              onPress={async () => {
                const url = "https://parentg.com/terms-and-conditions";
                const supported = await Linking.canOpenURL(url);

                if (supported) {
                  // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                  // by some browser in the mobile
                  await Linking.openURL(url);
                }
              }}
              style={styles.tmcText2}
            >
              {t("TERMS_AND_CONDITIONS")}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneNumber;

const styles = StyleSheet.create({
  wrap: {
    width: widthPercentageToDP("80%"),
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "60%", // Optional: Add border-radius or other styling for the image
  },
  // right: {
  //   // justifyContent: "center",
  //   // alignItems: "center",
  // },
  readAll: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.red_2,
  },
  btnText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
  },
  tmcWrap: {
    flexDirection: "row",
    marginTop: 6,
  },
  tmcText1: {
    fontSize: 10,
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
  tmcText3: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,

    color: LightTheme.colors.textColor1,
    lineHeight: 19,
  },
  tmcText4: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.semiBold,
    marginLeft: 3,
    color: LightTheme.colors.tandc,
    lineHeight: 19,
  },
});
