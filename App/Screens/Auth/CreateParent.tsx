import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import analytics from "@react-native-firebase/analytics";
import React, { useRef, useState } from "react";
import AuthInput from "components/AuthInput";
import User from "assets/icons/user.svg";
import Email from "assets/icons/email.svg";
import Birth from "assets/icons/birth.svg";
import Camera from "assets/icons/camera.svg";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import { selectProfileForm, selectloader } from "../../Redux/Auth/selector";
import { profiledFormInterface } from "../../Redux/Auth/types";
import { useDispatch, useSelector } from "react-redux";
import { actions as action } from "../../Redux/Auth/slice";
import { SCREENS } from "../../constants/var";
import { DateTime } from "luxon";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { useTranslation } from "react-i18next";
import ActionSheet from "react-native-actionsheet";
import { AWS_PATH } from "utils/constrats";
import DatePicker from "react-native-date-picker";
import { useFocusEffect } from "@react-navigation/native";
const CreateParent = (props: any) => {
  const [open, setOpen] = useState(false);
  const form: profiledFormInterface = useSelector(selectProfileForm);
  const dispatch = useDispatch();
  const handleChange = (value: any, name: any) => {
    dispatch(action.updateProfileFormFormValue({ key: name, value: value }));
  };
  const handleCreateProfile = async () => {
    dispatch(
      action.doCreateProfile({
        callback() {
          dispatch(action.clearProfileForm());
          props.navigation.navigate(SCREENS.CREATE_CHILD);
        },
      })
    );
    await analytics().logEvent("parentProfileCreated", {});

    // userProfileCreated
  };
  let ActionSheets: any = useRef(null);
  const loader = useSelector(selectloader);
  const { t } = useTranslation();
  const mime = require("mime");
  const UploadFile = (res: ImageOrVideo) => {
    const getFile = {
      uri: res.path,
      name: res.path.split("/")[res.path.split("/").length - 1],
      type: res.mime,
      size: res.size,
    };
    const data = new FormData();
    data.append("file", getFile);
    dispatch(
      action.userAddImages({
        data: getFile.name,
        callback: (signedUrl: any, fileNameWithPrefix: any) => {
          dispatch(
            action.UploadeImage({
              data: res.path,
              signedUrl: signedUrl,
              result: mime.getType(getFile.name),
              callback: () => {
                dispatch(
                  action.updateProfileFormFormValue({
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

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(action.getMeRequestSecond({ callback() {} }));
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
  return (
    <View style={[global.authcontainer, { justifyContent: "space-between" }]}>
      <StatusBar
        backgroundColor={LightTheme.colors.background}
        barStyle={"dark-content"}
      />
      <View style={styles.headWrap}>
        <Text style={styles.headerText1}>{t("HELLO_PARENT")}!</Text>
        <View style={styles.headWrap2}>
          <Text style={styles.headerText2}> {t("WELCOME_TO")}</Text>
          <Text style={styles.headerText3}> {t("PARENT_G")}</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.wrap}>
            <View style={styles.camera}>
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
                  <Text style={styles.tmcText1}> {t("SAY")}</Text>
                  <Text style={styles.tmcText2}>{t("CHEESE")}!</Text>
                </View>
              </View>
            </View>

            <AuthInput
              inputProps={{
                placeholder: t("YOUR_NAME"),
                value: form.name,
                onChangeText: (text) => handleChange(text, "name"),
              }}
              icon={<User height={23} />}
            />
            <AuthInput
              inputProps={{
                placeholder: t("EMAIL"),
                value: form.email,
                onChangeText: (text) => handleChange(text, "email"),
                keyboardType:'email-address',
              }}
              icon={<Email height={23} />}
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
                  : t("DATE_OF_BIRTH")+" (Optional)"} 
              </Text>
            </TouchableOpacity>
            <PrimaryButton
              title={t("CREATE_PARENT")}
              onPress={handleCreateProfile}
              disabled={loader}
              loading={loader}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  );
};

export default CreateParent;

const styles = StyleSheet.create({
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
  headWrap: {
    width: "80%",
    justifyContent: "center",
  },
  headWrap2: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerText1: {
    fontSize: 37,
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
    borderColor: LightTheme.colors.input_border_color,
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
  tmcText2: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.orange_1,
    lineHeight: 16,
  },
});
