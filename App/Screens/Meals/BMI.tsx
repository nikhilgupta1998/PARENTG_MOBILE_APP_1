import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { LightTheme } from "../../utils/theme";
import PrimaryButton from "components/PrimaryButton";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Meals/slice";
import { selectBmiCalculateForm } from "../../Redux/Meals/selectors.";
import Gender from "assets/icons/gender.svg";
import { Dropdown } from "react-native-element-dropdown";
import { SCREENS } from "../../constants/var";
import showToast from "utils/toast";
import WebView from "react-native-webview";
import { CHART_PATH } from "utils/constrats";
import { selectProfileForm } from "../../Redux/Auth/selector";
import { GenderEnum } from "../../Redux/Auth/types";
import { width } from "../../constants/Dimenstions";
import { OpenURLButton } from "components/SourceofInfo";

const BMI = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChange = (evt: any, name: any) => {
    dispatch(
      actions.updateBMIFormFormValue({
        key: name,
        value: evt.slice(0, 2),
      })
    );
  };

  const handleChangeInch = (evt: any, name: any) => {
    if (evt <= 11) {
      dispatch(
        actions.updateBMIFormFormValue({
          key: name,
          value: evt.slice(0, 2),
        })
      );
    }
  };

  const form = useSelector(selectBmiCalculateForm);
  useEffect(() => {
    if (
      form.age.length == 0 ||
      form.heightFeet.length == 0 ||
      form.heightInch.length == 0 ||
      form.weight.length == 0
    ) {
      return;
    } else {
      if (Number(form.age) > 23) {
        dispatch(
          actions.doCalculateBMI({
            callback() {
              setSetshoeBMI(true);
            },
          })
        );
        return;
      } else {
        setSetshoeBMI(false);
        showToast("BMI calculation not valid for children under 2 years old");
      }
    }

    return () => {};
  }, [form]);

  const gender = [
    { label: "Male", value: 1 },
    { label: "Female", value: 0 },
  ];
  const [setshoeBMI, setSetshoeBMI] = useState(true);
  const doCalculate = () => {
    if (form.age.length == 0) {
      showToast("please enter age");
      return;
    }
    if (Number(form.age) > 23) {
      dispatch(
        actions.doCalculateBMI({
          callback() {
            setSetshoeBMI(true);
          },
        })
      );
      return;
    } else {
      showToast("BMI calculation not valid for children under 2 years old");
    }
  };
  const checkmeal = () => {
    props.navigation.navigate(SCREENS.MEAL_LIST);
  };
  const onSubmit = () => {
    dispatch(actions.clearBmiCalculateForm());
    setSetshoeBMI(false);
    props.navigation.goBack();
  };
  const message = (event: any) => {};
  const data: any = useSelector(selectProfileForm);
  return (
    <SafeAreaView style={[global.wrap]}>
      <View
        style={[global.wrap, { padding: 30, justifyContent: "space-between" }]}
      >
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
          title={t("MEALSOBJ.BMI_CALCULATE")}
          titleStyle={{ fontSize: 22 }}
          goback={onSubmit}
          rightIconOnPress={undefined}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.headTxt}>{t("MEALSOBJ.CALCULATE_BMI")}</Text>
          <OpenURLButton url="https://www.who.int/toolkits/child-growth-standards/standards/body-mass-index-for-age-bmi-for-age"></OpenURLButton>
          <View style={[styles.info, { marginBottom: 10 }]}>
            <View style={styles.infoWrap}>
              <Text style={styles.title}>{t("MEALSOBJ.AGE")}</Text>
              <TextInput
                keyboardType="numeric"
                textAlignVertical="center"
                placeholder={t("MEALSOBJ.MONTHS")}
                placeholderTextColor={LightTheme.colors.textColor7}
                style={styles.input}
                value={form.age}
                onChangeText={(text) => handleChange(text, "age")}
              />
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.title}>{t("MEALSOBJ.GENDER")}</Text>
              <Dropdown
                itemTextStyle={{ color: "black" }}
                selectedTextStyle={styles.input}
                data={gender}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={t("OTHER.SELECT_GENDER")}
                searchPlaceholder={t("OTHER.SEARCH_ITEMS")}
                value={form.gender}
                onChange={(item: any) => {
                  dispatch(
                    actions.updateBMIFormFormValue({
                      key: "gender",
                      value: item?.value,
                    })
                  );
                }}
                renderLeftIcon={() => (
                  <Gender height={23} style={styles.icon} />
                )}
              />
            </View>
          </View>
          <View
            style={[styles.info, { flexDirection: "column", marginBottom: 10 }]}
          >
            <Text style={styles.title}>{t("MEALSOBJ.GIVE_HEIGHT")}</Text>
            <View style={[styles.info]}>
              <View style={styles.infoWrap}>
                <TextInput
                  keyboardType="numeric"
                  textAlignVertical="center"
                  placeholder={t("MEALSOBJ.FEET")}
                  placeholderTextColor={LightTheme.colors.textColor7}
                  style={styles.input}
                  value={form.heightFeet}
                  onChangeText={(text) => handleChange(text, "heightFeet")}
                />
              </View>
              <View style={styles.infoWrap}>
                <TextInput
                  keyboardType="numeric"
                  textAlignVertical="center"
                  placeholder={t("MEALSOBJ.INCHES")}
                  placeholderTextColor={LightTheme.colors.textColor7}
                  style={styles.input}
                  value={form.heightInch}
                  onChangeText={(text) => handleChangeInch(text, "heightInch")}
                />
              </View>
            </View>
          </View>
          <View style={[styles.info, { flexDirection: "column" }]}>
            <Text style={styles.title}> {t("MEALSOBJ.GIVE_WEIGHT")}</Text>
            <View style={[styles.info]}>
              <View style={styles.infoWrap}>
                <TextInput
                  keyboardType="numeric"
                  textAlignVertical="center"
                  placeholder={t("MEALSOBJ.WEIGHT_IN_KG")}
                  placeholderTextColor={LightTheme.colors.textColor7}
                  style={styles.input}
                  value={form.weight}
                  onChangeText={(text) => handleChange(text, "weight")}
                />
              </View>
            </View>
          </View>
          <>
            {setshoeBMI && (
              <>
                <Text style={[styles.title, { marginTop: 5 }]}>
                  {t("MEALSOBJ.BELOW_IS_BMI")}
                </Text>
                <Text style={[styles.title, { fontSize: 28 }]}>
                  {Number(form.BMI).toFixed(0)}
                </Text>
              </>
            )}
          </>

          <View
            style={{
              height: 240,
            }}
          >
            {form.gender == GenderEnum.MALE && setshoeBMI ? (
              <WebView
                source={{
                  uri:
                    CHART_PATH +
                    `/boy-bmi?month=${form.age}&bmi=${Number(form.BMI).toFixed(
                      0
                    )}&width=${width}`,
                }}
                onMessage={(event) => message(event)}
                style={{ flex: 1 }}
              />
            ) : setshoeBMI ? (
              <WebView
                source={{
                  uri:
                    CHART_PATH +
                    `/girl-bmi?month=${form.age}&bmi=${Number(form.BMI).toFixed(
                      0
                    )}&width=${width}`,
                }}
                onMessage={(event) => message(event)}
                style={{ flex: 1 }}
              />
            ) : null}
          </View>

          {setshoeBMI && (
            <>
              <PrimaryButton
                title={t("OTHER.CHECK_MY_MEALS")}
                onPress={checkmeal}
                disabled={false}
                loading={undefined}
              />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BMI;

const styles = StyleSheet.create({
  headTxt: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor7,
    marginVertical: 10,
  },
  sourceTxt: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.light_blue_1,
    marginVertical: 10,
  },
  info: {
    width: "100%",
    flexDirection: "row",
    // alignItems: "center",
  },
  infoWrap: {
    width: "40%",
  },
  title: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
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
  icon: {
    marginRight: 5,
  },
  input: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor7,
    // marginTop: 5,
    width: "100%",
    padding: 0,
    paddingVertical: 5,
  },
});
