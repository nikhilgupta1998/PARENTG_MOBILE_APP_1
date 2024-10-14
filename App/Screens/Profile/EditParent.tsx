import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import analytics from "@react-native-firebase/analytics";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useRef, useState } from "react";
import Delete from "assets/icons/delete.svg";
import AuthInput from "components/AuthInput";
import User from "assets/icons/user.svg";
import ActionSheet from "react-native-actionsheet";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import Birth from "assets/icons/birth.svg";
import Genstation from "assets/icons/genstation.svg";
import Gender from "assets/icons/gender.svg";
import Camera from "assets/icons/camera.svg";
import Email from "assets/icons/email.svg";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import { actions as action } from "../../Redux/Auth/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectParentForm, selectloader } from "../../Redux/Auth/selector";
import { profiledFormInterface } from "../../Redux/Auth/types";
import { SCREENS } from "../../constants/var";
import DatePicker from "react-native-date-picker";
import { DateTime } from "luxon";
import PhoneInput from "react-native-phone-input";
import { AWS_PATH } from "utils/constrats";
import { useTranslation } from "react-i18next";
import showToast from "utils/toast";
import { useFocusEffect } from "@react-navigation/native";
const EditParent = (props: any) => {
  const [open, setOpen] = useState(false);
  const mime = require("mime");
  let ActionSheets: any = useRef(null);
  const UploadFile = (res: ImageOrVideo) => {
    const getFile = {
      uri: res.path,
      name: res.path.split("/")[res.path.split("/").length - 1],
      type: res.mime,
      size: res.size,
    };
    dispatch(
      action.AddImagesParent({
        data: getFile.name,
        callback: (signedUrl: any, fileNameWithPrefix: any) => {
          dispatch(
            action.UploadeImage({
              data: res.path,
              signedUrl: signedUrl,
              result: mime.getType(getFile.name),
              callback: () => {
                dispatch(
                  action.updateParentFormFormValue({
                    key: "profilePic",
                    value: fileNameWithPrefix,
                  })
                );
              },
            })
          );
        },
      })
    );
  };

  const openCamera = async () => {
    try {
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      }).then((res: ImageOrVideo) => {
        UploadFile(res);
      });
    } catch (error) {}
  };

  const openLibrary = async () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      }).then((res: ImageOrVideo) => {
        UploadFile(res);
      });
    } catch (error) {
      console.warn(error);
    }
  };
  const goBack = () => {
    props.navigation.goBack();
  };
  const form: profiledFormInterface = useSelector(selectParentForm);
  const dispatch = useDispatch();
  const handleChange = (value: any, name: any) => {
    dispatch(action.updateParentFormFormValue({ key: name, value: value }));
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(action.clearParentForm());
    if (form.mobileNumber == form.mobileNumberCheck) {
      dispatch(
        action.updateProfileFormFormValue({
          key: "mobileVerify",
          value: true,
        })
      );
    } else {
      dispatch(
        action.updateProfileFormFormValue({
          key: "mobileVerify",
          value: false,
        })
      );
    }
  };
  const handleCreateProfile = async () => {
    if (!form.mobileVerify) {
      showToast("Please Verified Mobile Number First");
      return;
    }
    dispatch(
      action.doupdateParent({
        callback() {
          dispatch(
            action.doGetParentList({
              callback() {},
            })
          );
          dispatch(action.clearParentForm());
          props.navigation.navigate(SCREENS.FAMILY);

          dispatch(
            action.doGetParentList({
              callback() {},
            })
          );
        },
      })
    );
    await analytics().logEvent("updateParentProfile", {});
  };
  const deleteParent = (id: any) => {
    dispatch(
      action.deleteParent({
        id: id,
        callback() {
          props.navigation.navigate(SCREENS.FAMILY);
        },
      })
    );
  };
  useEffect(() => {
    if (props.route.params.id) {
      dispatch(
        action.getParentById({
          id: props.route.params.id,
          callback() {},
        })
      );
    }
    return () => {};
  }, [props.route.params.id]);
  const [errors, setErrors] = useState("");
  const [phoneCode, setPhoneCode] = useState("+91");
  const phoneInput: any = useRef(null);
  const { t } = useTranslation();
  const onPhoneNumber = (text: any) => {
    let phone_data = text.split(" ");
    if (phone_data.length > 1) {
      dispatch(
        action.updateParentFormFormValue({
          key: "countryCode",
          value: phone_data[0],
        })
      );
      let final_phone = phone_data.splice(1, phone_data.length).join("");

      dispatch(
        action.updateParentFormFormValue({
          key: "mobileNumber",
          value: final_phone.replace(/-/g, ""),
        })
      );
      dispatch(
        action.updateParentFormFormValue({
          key: "isMobileNumberValid",
          value: phoneInput.current.isValidNumber(),
        })
      );

      if (form.isMobileNumberValid) {
        setErrors("");
      } else {
      }
    } else {
      dispatch(
        action.updateParentFormFormValue({
          key: "countryCode",
          value: phone_data[0],
        })
      );
    }
  };

  const handleGetOTP = async () => {
    await analytics().logEvent("otpVerification", {});
    dispatch(
      action.getOtp({
        mobileNumber: form.mobileNumber,
        countryCode: form.countryCode,
        callback(check) {
          if (check == 1) {
            showToast("Verified");
            dispatch(
              action.updateParentFormFormValue({
                key: "mobileVerify",
                value: true,
              })
            );
          } else {
            props.navigation.navigate(SCREENS.VERIFIED_OTP);
          }
        },
      })
    );
  };
  useEffect(() => {
    if (form.mobileNumber == form.mobileNumberCheck) {
      dispatch(
        action.updateProfileFormFormValue({
          key: "mobileVerify",
          value: true,
        })
      );
    } else {
      dispatch(
        action.updateProfileFormFormValue({
          key: "mobileVerify",
          value: false,
        })
      );
    }
  }, [form.mobileNumber, form.mobileNumberCheck]);

  const data = [
    { label: "Mother", value: "Mother" },
    { label: "Father", value: "Father" },
    { label: "Guardian", value: "Guardian" },
  ];
  const gender = [
    { label: "Male", value: 1 },
    { label: "Female", value: 0 },
  ];
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const loader = useSelector(selectloader);
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <StatusBar
          backgroundColor={LightTheme.colors.background}
          barStyle={"dark-content"}
        />
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />
        <BackHeader
          iconStyle={undefined}
          title={t("PROFILEOBJ.EDIT_PARENT")}
          goback={goBack}
          RightIcon={<Delete />}
          rightIconOnPress={() => deleteParent(form._id)}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 30,
            paddingBottom: 40,
          }}
        >
          <ScrollView
            style={styles.wrap}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <View style={styles.camera}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    ActionSheets.current.show();
                  }}
                >
                  <View style={styles.cameraWrap}>
                    {form.profilePic?.length > 0 ? (
                      <Image
                        source={{ uri: AWS_PATH + form.profilePic }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 100,
                        }}
                      />
                    ) : (
                      <Camera />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.tmcWrap}>
                <Text style={styles.tmcText1}>
                  {t("PROFILEOBJ.UPLOAD_PHOTO")}
                </Text>
              </View>
            </View>

            <AuthInput
              inputProps={{
                placeholder: t("PROFILEOBJ.YOUR_NAME"),
                value: form.name,
                onChangeText: (text) => handleChange(text, "name"),
              }}
              icon={<User height={23} />}
            />
            <DatePicker
              modal
              open={open}
              date={
                form.dob?.length > 0
                  ? DateTime.fromISO(form.dob).toJSDate()
                  : new Date()
              }
              onConfirm={(date) => {
                setOpen(false);
                handleChange(DateTime.fromJSDate(date).toISO(), "dob");
              }}
              mode="date"
              onCancel={() => {
                setOpen(false);
              }}
              maximumDate={new Date()}
            />
            <TouchableOpacity
              style={[styles.inputWrap]}
              onPress={() => setOpen(true)}
            >
              <Birth height={23} />
              <Text style={styles.inputDateText}>
                {form.dob?.length > 0
                  ? DateTime.fromISO(form.dob).toFormat("dd-MM-yyyy")
                  : t("DATE_OF_BIRTH")}
              </Text>
            </TouchableOpacity>
            <Dropdown
              style={[styles.dropdown]}
              itemTextStyle={{ color: "black" }}
              selectedTextStyle={styles.selectedTextStyle}
              data={gender}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={t("OTHER.SELECT_GENDER")}
              searchPlaceholder={t("OTHER.SEARCH_ITEMS")}
              value={form.gender}
              onChange={(item: any) => {
                dispatch(
                  action.updateParentFormFormValue({
                    key: "gender",
                    value: item?.value,
                  })
                );
              }}
              renderLeftIcon={() => <Gender height={23} style={styles.icon} />}
            />
            <Dropdown
              style={[styles.dropdown]}
              itemTextStyle={{ color: "black" }}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select relation"}
              searchPlaceholder={t("OTHER.SEARCH_ITEMS")}
              value={form.relation}
              onChange={(item: any) => {
                dispatch(
                  action.updateParentFormFormValue({
                    key: "relation",
                    value: item?.value,
                  })
                );
              }}
              renderLeftIcon={() => (
                <Genstation height={23} style={styles.icon} />
              )}
            />
            <AuthInput
              inputProps={{
                placeholder: t("PROFILEOBJ.EMAIL"),

                value: form.email,
                onChangeText: (text) => handleChange(text, "email"),
              }}
              icon={<Email height={23} />}
            />
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

            {form.mobileNumber &&
              form?.isMobileNumberValid &&
              !form?.mobileVerify && (
                <PrimaryButton
                  title={t("PROFILEOBJ.VERIFY_MOBILE")}
                  onPress={handleGetOTP}
                  disabled={loader}
                  loading={loader}
                />
              )}
          </ScrollView>
          {form.mobileVerify && (
            <PrimaryButton
              title={t("PROFILEOBJ.UPDATE_PROFILE")}
              onPress={handleCreateProfile}
              disabled={loader}
              loading={loader}
            />
          )}

          <ActionSheet
            ref={ActionSheets}
            title={t("PROFILEOBJ.WHICH_ONE_DO_YOU_LIKE") + "?"}
            options={[
              t("PROFILEOBJ.CAMERA"),
              t("PROFILEOBJ.PICK_FROM_PHONE"),
              t("PROFILEOBJ.CANCEL"),
            ]}
            cancelButtonIndex={2}
            destructiveButtonIndex={2}
            onPress={(index: any) => {
              if (index == 0) {
                openCamera();
              } else if (index == 1) {
                openLibrary();
              } else return;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditParent;

const styles = StyleSheet.create({
  wrap: {
    width: widthPercentageToDP("80%"),
    // alignItems: "center",
  },
  btnText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    // lineHeight: 27,
  },
  headWrap: {
    width: "80%",
    justifyContent: "center",
  },
  headWrap2: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerText1: {
    fontSize: 42,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.orange_1,
    lineHeight: 50,
  },
  headerText2: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor,
    lineHeight: 28,
  },
  headerText3: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    lineHeight: 28,
  },
  camera: {
    marginBottom: 20,
    alignItems: "center",
  },
  cameraWrap: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: LightTheme.colors.primary_btn,
    marginBottom: 10,
  },
  tmcWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  tmcText1: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.regular,
    textAlign: "center",
    color: LightTheme.colors.textColor1,
    lineHeight: 16,
  },
  dropdown: {
    width: "100%",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 51,
  },

  selectedTextStyle: {
    fontSize: 15,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "black",
  },
  tmcText2: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.orange_1,
    lineHeight: 16,
  },
  icon: {
    marginRight: 5,
  },
  inputWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 51,
  },
  inputDateText: {
    marginLeft: 8,
    color: LightTheme.colors.black,
  },
});
