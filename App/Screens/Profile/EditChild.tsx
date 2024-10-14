import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AuthInput from "components/AuthInput";
import User from "assets/icons/user.svg";
import analytics from "@react-native-firebase/analytics";
import DatePicker from "react-native-date-picker";
import { DateTime } from "luxon";
import ActionSheet from "react-native-actionsheet";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import Birth from "assets/icons/birth.svg";
import Genstation from "assets/icons/genstation.svg";
import Gender from "assets/icons/gender.svg";
import Delete from "assets/icons/delete.svg";
import Camera from "assets/icons/camera.svg";
import { LightTheme } from "../../utils/theme";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import { actions as action } from "../../Redux/Auth/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectChildForm, selectloader } from "../../Redux/Auth/selector";
import { childFormInterface } from "../../Redux/Auth/types";
import { SCREENS } from "../../constants/var";
import { AWS_PATH } from "utils/constrats";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-native-element-dropdown";
import { useFocusEffect } from "@react-navigation/native";
const EditChild = (props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleChange = (value: any, name: any) => {
    dispatch(action.updateChildFormFormValue({ key: name, value: value }));
  };
  let ActionSheets: any = useRef(null);
  const form: childFormInterface = useSelector(selectChildForm);
  const handleCreateChild = async () => {
    dispatch(
      action.doupdateChild({
        callback() {
          dispatch(action.clearChildForm());
          props.navigation.navigate(SCREENS.KIDS);
          dispatch(
            action.doGetChildList({
              callback() {},
            })
          );
        },
      })
    );
    await analytics().logEvent("childProfileCreated", {});
  };
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
      action.childAddImages({
        data: getFile.name,
        callback: (signedUrl: any, fileNameWithPrefix: any) => {
          dispatch(
            action.UploadeImage({
              data: res.path,
              signedUrl: signedUrl,
              result: mime.getType(getFile.name),
              callback: () => {
                dispatch(
                  action.updateChildFormFormValue({
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
  const [open, setOpen] = useState(false);
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
    dispatch(action.clearChildForm());
    props.navigation.goBack();
  };
  const deleteChild = (id: any) => {
    dispatch(
      action.deleteChild({
        id: id,
        callback() {
          dispatch(action.clearChildForm());
          props.navigation.navigate(SCREENS.KIDS);
          dispatch(
            action.doGetChildList({
              callback() {},
            })
          );
        },
      })
    );
  };
  const gender = [
    { label: "Male", value: 1 },
    { label: "Female", value: 0 },
  ];

  useEffect(() => {
    if (props.route.params.id) {
      dispatch(
        action.getChildById({
          id: props.route.params.id,
          callback() {},
        })
      );
    }
    return () => {};
  }, [props.route.params.id]);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(action.clearChildForm());
  };
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
          title={t("PROFILEOBJ.EDIT_CHILD")}
          goback={goBack}
          RightIcon={<Delete />}
          rightIconOnPress={() => deleteChild(form._id)}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingTop: 30,
            paddingBottom: 40,
          }}
        >
          <View style={styles.wrap}>
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
                <Text style={styles.tmcText1}>Tap to Edit photo</Text>
              </View>
            </View>

            <AuthInput
              inputProps={{
                placeholder: t("PROFILEOBJ.CHILD_NAME"),
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
              disabled={true}
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
                  action.updateChildFormFormValue({
                    key: "gender",
                    value: item?.value,
                  })
                );
              }}
              renderLeftIcon={() => <Gender height={23} style={styles.icon} />}
            />
            <AuthInput
              inputProps={{
                placeholder: t("PROFILEOBJ.WEEK_OF_GESTATION"),

                value: form.weekOfGestation,
                onChangeText: (text) => handleChange(text, "weekOfGestation"),
              }}
              icon={<Genstation height={23} />}
            />
          </View>
          <PrimaryButton
            title={"Update"}
            onPress={handleCreateChild}
            disabled={loader}
            loading={loader}
          />
        </View>
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
    </SafeAreaView>
  );
};

export default EditChild;

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
  tmcText2: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.orange_1,
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
    color: LightTheme.colors.border,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "black",
  },
  icon: {
    marginRight: 5,
  },
});
