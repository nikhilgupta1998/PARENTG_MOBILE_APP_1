import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Close from "assets/icons/close.svg";
import analytics from "@react-native-firebase/analytics";
import Plus from "assets/icons/plus.svg";
import React, { useEffect, useRef, useState } from "react";
import AuthInput from "components/AuthInput";
import ActionSheet from "react-native-actionsheet";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import Birth from "assets/icons/birth.svg";
import { LightTheme } from "../../utils/theme";
import DatePicker from "react-native-date-picker";
import { DateTime } from "luxon";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "components/PrimaryButton";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import { actions } from "../../Redux/Vaccination/slice";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS } from "../../constants/var";
import { AWS_PATH } from "utils/constrats";
import { useTranslation } from "react-i18next";
import {
  selectLoading,
  selectVaccinationForm,
} from "../../Redux/Vaccination/selectors.";
import { selectProfileForm } from "../../Redux/Auth/selector";
import { width } from "../../constants/Dimenstions";
import showToast from "utils/toast";

const ConfirmVaccination = (props: any) => {
  const dispatch = useDispatch();
  const handleChange = (value: any, name: any) => {
    dispatch(
      actions.updateFormValue({
        key: "vaccineId",
        value: props.route.params.id,
      })
    );
    dispatch(actions.updateFormValue({ key: name, value: value.slice(0, 2) }));
  };
  const handleDateChange = (value: any, name: any) => {
    dispatch(
      actions.updateFormValue({
        key: "vaccineId",
        value: props.route.params.id,
      })
    );
    dispatch(actions.updateFormValue({ key: name, value: value }));
  };

  useEffect(() => {
    dispatch(
      actions.updateFormValue({
        key: "vaccineId",
        value: props.route.params.id,
      })
    );
    return () => {
      dispatch(actions.setCurrentPage(1));
      dispatch(actions.clearFrom());
      dispatch(
        actions.doGetList({
          callback() {},
        })
      );
    };
  }, [props.route.params.id]);
  useEffect(() => {
    return () => {
      dispatch(actions.clearFrom());
    };
  }, []);

  const [open, setOpen] = useState(false);
  let ActionSheets: any = useRef(null);
  const form = useSelector(selectVaccinationForm);
  const handleSubmit = async () => {
    await analytics().logEvent("vaccinationAddEditAction", {});
    dispatch(actions.setLoading(true));
    if (!props.route.params.isImageEdit) {
      dispatch(
        actions.doAddVaccination({
          callback() {
            dispatch(actions.clearFrom());
            dispatch(actions.setList([]));
            props.navigation.navigate(SCREENS.VACCINATION);
          },
        })
      );
    } else {
      dispatch(
        actions.doEditVaccination({
          callback() {
            dispatch(actions.clearFrom());
            dispatch(actions.setList([]));
            props.navigation.navigate(SCREENS.VACCINATION);
          },
        })
      );
    }
  };
  const data = useSelector(selectProfileForm);

  const loader = useSelector(selectLoading);
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

    if (form.image.length < 6) {
      dispatch(
        actions.doAddImages({
          data: getFile.name,
          callback: (signedUrl: any, fileNameWithPrefix: any) => {
            dispatch(
              actions.UploadeImage({
                data: res.path,
                signedUrl: signedUrl,
                result: mime.getType(getFile.name),
                callback: () => {
                  dispatch(actions.setAddImages(fileNameWithPrefix));
                },
              })
            );
          },
        })
      );
    } else {
      showToast("Can't Upload More then 6");
    }
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
  const handleDelete = (index: number) => {
    var indexNew = index - 1;
    // dispatch(actions.DeleteList(indexNew));
  };
  const fixedItem = [{ id: "fixed", type: "icon", icon: "your-icon-url" }];
  const combinedData: any = fixedItem?.concat(form.image);
  const renderPostImage = () => {
    return (
      <>
        <FlatList
          data={combinedData}
          columnWrapperStyle={{
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          keyExtractor={(item) => item?.id}
          renderItem={renderItem}
        />
      </>
    );
  };
  const renderItem = ({ item, index }: any) => {
    // console.log(item, "item");

    if (item?.type === "icon") {
      return (
        <TouchableOpacity
          disabled={loader}
          onPress={() => {
            ActionSheets.current.show();
          }}
        >
          <ImageBackground
            style={[styles.PictureContainer]}
            source={images.POSTRECT}
            resizeMode="stretch"
          >
            <Plus height={28} width={28} />
          </ImageBackground>
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={[
            {
              flexDirection: "column",
            },
          ]}
        >
          <View style={{ flex: 1, marginVertical: 5 }}>
            <Image
              source={{ uri: AWS_PATH + item }}
              style={{
                ...styles.AddWrap,
              }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <View style={styles.cutIcon}>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Close />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };
  const { t } = useTranslation();
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
          title={
            props.route.params.isImageEdit
              ? "Upload Vaccination Report"
              : t("VACCINATION.VACCINATION")
          }
          goback={goBack}
          titleStyle={{
            fontSize: props.route.params.isImageEdit ? 15 : 26,
          }}
          rightIconOnPress={undefined}
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 24,
                  }}
                >
                  {renderPostImage()}
                </View>
              </View>
              {/* <View style={styles.tmcWrap}>
              <Text style={styles.tmcText1}>
                {t("PROFILEOBJ.UPLOAD_PHOTO")}
              </Text>
            </View> */}
            </View>
            {!props.route.params.isImageEdit && (
              <>
                <DatePicker
                  modal
                  open={open}
                  date={
                    form.date?.length > 0
                      ? DateTime.fromISO(form.date).toJSDate()
                      : new Date()
                  }
                  onConfirm={(date) => {
                    setOpen(false);
                    handleDateChange(DateTime.fromJSDate(date).toISO(), "date");
                  }}
                  mode="date"
                  onCancel={() => {
                    setOpen(false);
                  }}
                  minimumDate={new Date(data.dob)}
                  maximumDate={new Date()}
                />
                <TouchableOpacity
                  style={[styles.inputWrap]}
                  onPress={() => setOpen(true)}
                >
                  <Birth height={23} />
                  <Text style={styles.inputDateText}>
                    {form.date?.length > 0
                      ? DateTime.fromISO(form.date).toFormat("dd-MM-yyyy")
                      : ""}
                  </Text>
                </TouchableOpacity>

                <View style={styles.inputWrapForHeight}>
                  <AuthInput
                    inputProps={{
                      placeholder: t("HEIGHT_FEET"),
                      value: form.heightFeet,
                      onChangeText: (text) => handleChange(text, "heightFeet"),
                      keyboardType: "number-pad",
                    }}
                    wrapstyle={{
                      width: "49%",
                    }}
                  />
                  <AuthInput
                    inputProps={{
                      placeholder: t("HEIGHT_INCH"),
                      value: form.heightInch,
                      onChangeText: (text) => handleChange(text, "heightInch"),
                      keyboardType: "number-pad",
                    }}
                    wrapstyle={{
                      width: "49%",
                    }}
                  />
                </View>
                <AuthInput
                  inputProps={{
                    placeholder: t("WEIGHT_KG"),
                    value: form.weight,
                    onChangeText: (text) => handleChange(text, "weight"),
                    keyboardType: "number-pad",
                  }}
                />
              </>
            )}
          </View>
          <PrimaryButton
            title={t("SUBMIT")}
            onPress={handleSubmit}
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

export default ConfirmVaccination;

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
  inputWrapForHeight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputDateText: {
    marginLeft: 8,
    color: LightTheme.colors.black,
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
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.textColor1,
    lineHeight: 16,
    marginTop: 5,
  },
  cutIcon: {
    marginTop: 8,
    marginRight: 8,
    alignContent: "center",
    alignItems: "center",
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
  AddWrap: {
    height: width / 3 - 45,
    width: width / 3 - 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: LightTheme.colors.yellow_3,
    elevation: 1,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: LightTheme.colors.background,
    overflow: "hidden",
    // marginTop: 10,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "black",
  },
  icon: {
    marginRight: 5,
  },
  PictureContainer: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    height: width / 3 - 35,
    width: width / 3 - 35,
    marginHorizontal: 5,
  },
});
