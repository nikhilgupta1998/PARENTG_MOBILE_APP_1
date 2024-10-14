import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Svg, { Rect } from "react-native-svg";
import PrimaryButton from "components/PrimaryButton";
import { useTranslation } from "react-i18next";
import { SCREENS } from "../../constants/var";
import AuthInput from "components/AuthInput";
import { selectBottleFeeding } from "../../Redux/Analytics/selectors.";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Analytics/slice";
import { selectProfileForm } from "../../Redux/Auth/selector";
import { useFocusEffect } from "@react-navigation/native";
import VerticalDraggableBar from "components/VerticalDraggableBar";
import { debounce, throttle } from "lodash";
import analytics from "@react-native-firebase/analytics";
const BottleFeeding = (props: any) => {
  const { t } = useTranslation();
  const goFeeding = () => {
    props.navigation.navigate(SCREENS.BOTTELFEEDING);
  };
  const goBreast = () => {
    props.navigation.navigate(SCREENS.FEEDING);
  };
  const [bottle, setBottle] = useState(false);
  const handleEnter = () => {
    setBottle(true);
  };
  const dispatch = useDispatch();
  const form = useSelector(selectBottleFeeding);
  const handleChange = (value: any, name: any) => {
    dispatch(actions.updateBottleFeedingFormValue({ key: name, value: value }));
  };
  const data: any = useSelector(selectProfileForm);
  useEffect(() => {
    dispatch(
      actions.updateBottleFeedingFormValue({
        key: "childId",
        value: data.selectedChild,
      })
    );
    return () => {};
  }, [data]);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.updateBottleFeedingFormValue({
        key: "childId",
        value: data.selectedChild,
      })
    );
    dispatch(
      actions.updateBottleFeedingFormValue({
        key: "volume",
        value: 150,
      })
    );
  };
  const handleAddSleep = async () => {
    dispatch(
      actions.doAddBottleFeedingList({
        callback() {
          props.navigation.goBack();
          dispatch(actions.clearBreastFeedingForm());
        },
      })
    );
    await analytics().logEvent("bottleFeedingRecorded", {});
  };
  const GOBack = () => {
    props.navigation.goBack();
  };

  const throttledUpdateValue = useMemo(
    () =>
      throttle(
        (value) => {
          dispatch(
            actions.updateBottleFeedingFormValue({
              key: "volume",
              value: value,
            })
          );
        },
        1000,
        { leading: true, trailing: true }
      ),
    []
  );

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("FEEDING")}
          titleStyle={{ fontSize: 27 }}
          goback={GOBack}
          rightIconOnPress={undefined}
        />
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ImageBackground
            style={[
              styles.container,
              {
                flexDirection: "row",
              },
            ]}
            resizeMode="contain"
            source={images.SELECTOROUTSIDE}
          >
            <TouchableOpacity style={styles.activityImg} onPress={goBreast}>
              <Text style={styles.imgTopText}>{t("BREAST_FEEDING")}</Text>
            </TouchableOpacity>
            <View>
              <ImageBackground
                style={styles.activityImg}
                source={images.SELECTOR}
                resizeMode="contain"
              >
                <Text style={styles.imgTopText}>{t("BOTTLE_FEEDING")} </Text>
              </ImageBackground>
            </View>
          </ImageBackground>

          <View style={styles.main}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={[
                  styles.meterLevel,
                  {
                    flex: 8,
                  },
                ]}
              >
                <ImageBackground
                  style={{ height: 300, width: 300 }}
                  source={images.BOTTLEFEEDING}
                  resizeMode="contain"
                >
                  <VerticalDraggableBar
                    onChange={(value) => {
                      let outValue = 0;
                      if (value > 290) {
                        outValue = 0;
                      } else if (0 >= value) {
                        outValue = 200;
                      } else {
                        outValue = 200 - value / 1.45;
                      }
                      throttledUpdateValue(outValue);
                    }}
                  ></VerticalDraggableBar>
                </ImageBackground>
              </View>

              <View
                style={[
                  styles.meterLevel,
                  {
                    flex: 2,
                  },
                ]}
              >
                <Text style={styles.meterLevelTxt}>200ml</Text>
                <Text style={styles.meterLevelTxt}>160ml</Text>
                <Text style={styles.meterLevelTxt}>120ml</Text>
                <Text style={styles.meterLevelTxt}>80ml</Text>
                <Text style={styles.meterLevelTxt}>40ml</Text>
                <Text style={styles.meterLevelTxt}>0ml</Text>
              </View>
            </View>

            <Text
              style={[
                styles.timeTxt,
                {
                  color: LightTheme.colors.textColor3,
                  marginTop: 0,
                },
              ]}
            >
              {Number(form.volume).toFixed()} ml (milliliter)
            </Text>
            <View
              style={{ width: "100%", alignItems: "center", marginTop: 10 }}
            >
              <TouchableOpacity onPress={handleEnter}>
                <Text style={styles.timeTxt}>{t("ENTER_MANUALLY")}</Text>
              </TouchableOpacity>

              {bottle && (
                <AuthInput
                  inputProps={{
                    placeholder: "Volume",
                    value: form.volume,
                    onChangeText: (text) => handleChange(text, "volume"),
                    keyboardType: "number-pad",
                  }}
                  wrapstyle={{
                    width: "100%",
                  }}
                />
              )}
            </View>
            <PrimaryButton
              title={t("SAVE")}
              disabled={false}
              onPress={handleAddSleep}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default BottleFeeding;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginVertical: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerFlex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  arrows: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  arrowWrap: {
    width: 114,
    height: 114,
    borderRadius: 60,
    ...global.flexCenter,
    borderWidth: 5,
    borderColor: LightTheme.colors.yellow_3,
  },
  arrowTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    marginTop: 8,
  },
  timeTxt: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.primary_btn,
    marginTop: 15,
  },
  activityImg: {
    width: 120,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  meterWrap: {
    height: 300,
  },

  meter: {
    borderWidth: 3,
    borderColor: LightTheme.colors.yellow_3,
    width: "70%",
    height: "100%",
    borderRadius: 10,
  },

  meterLevel: {
    height: 300,
    justifyContent: "space-between",
    marginLeft: 10,
  },
  meterLevelTxt: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
  },
  buttonContainer: {
    height: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "95%",
  },
  buttonText: {
    textAlign: "center",
    color: LightTheme.colors.textColor1,
    alignSelf: "center",
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 15,
    paddingBottom: 8,
    alignItems: "center",
    height: 80,
    justifyContent: "center",
  },
  grediant: {
    height: 44,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  imgTopText: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
    lineHeight: 21,
    textAlign: "center",
  },
});
