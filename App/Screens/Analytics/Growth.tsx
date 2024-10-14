import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import analytics from "@react-native-firebase/analytics";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import PrimaryButton from "components/PrimaryButton";
import Calender from "assets/icons/calender.svg";
import { LightTheme } from "../../utils/theme";
import { width } from "../../constants/Dimenstions";
import AuthInput from "components/AuthInput";
import { useTranslation } from "react-i18next";
import Lock from "assets/svg/lockSecond.svg";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Analytics/slice";
import { selectPlan, selectProfileForm } from "../../Redux/Auth/selector";
import { SCREENS } from "../../constants/var";
import { selectGrowth, selectLoading } from "../../Redux/Analytics/selectors.";
import { growthInterface } from "../../Redux/Analytics/types";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const Growth = (props: any) => {
  const myScroll = useRef<ScrollView | null>(null);
  const [_nodes, set_nodes] = useState(
    () => new Map<number, TouchableOpacity | null>()
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleChange = (value: any, name: any) => {
    dispatch(
      actions.updateGrowthFormValue({
        key: name,
        value: value.slice(0, 2),
      })
    );
  };
  const handleChangeInch = (evt: any, name: any) => {
    if (evt <= 11) {
      dispatch(
        actions.updateGrowthFormValue({
          key: name,
          value: evt.slice(0, 2),
        })
      );
    }
  };

  const handleWeightChange = (value: any, name: any) => {
    const numericText = value.replace(/[^0-9]/g, "");
    dispatch(
      actions.updateGrowthFormValue({
        key: name,
        value: numericText.slice(0, 2),
      })
    );
  };
  const data: any = useSelector(selectProfileForm);
  useEffect(() => {
    dispatch(
      actions.updateGrowthFormValue({
        key: "childId",
        value: data.selectedChild,
      })
    );
    return () => {};
  }, [data]);

  const handleAddSleep = async () => {
    dispatch(
      actions.doAddGrowthFeedingList({
        callback() {
          dispatch(actions.clearGrowthForm());
          props.navigation.goBack();
        },
      })
    );
    await analytics().logEvent("childGrowthDataEntered", {});
  };
  const GOBack = () => {
    dispatch(actions.clearGrowthForm());
    props.navigation.goBack();
  };
  const form: growthInterface = useSelector(selectGrowth);
  const loader = useSelector(selectLoading);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = async (date: any, index: number) => {
    dispatch(
      actions.updateGrowthFormValue({
        key: "date",
        value: date,
      })
    );
    //
    await analytics().logEvent("modifyDateFilter", {});
    setTimeout(() => {
      scrollToElement(index);
    }, 500);
  };
  const generateDates = () => {
    const dates = [];
    const currentDate = new Date(selectedDate);
    for (let i = -7; i <= 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };
  const formatDate = (dateString: any) => {
    const dateObject = new Date(dateString);
    const dayOfMonth = dateObject.getDate();
    return ` ${dayOfMonth}`;
  };

  const scrollToElement = (indexOf: number) => {
    const node = _nodes.get(indexOf);
    node?.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ) => {
        // // console.log("position Component width is: " + width);
        // // console.log("position Component height is: " + height);
        // // console.log("position X offset to frame: " + fx);
        // // console.log("position Y offset to frame: " + fy);
        // // console.log("position X offset to page: " + px);
        // // console.log("position Y offset to page: " + py);
        let position = width * (indexOf - 2.5);
        // // console.log("position offset to page: " + position);
        myScroll.current?.scrollTo({ x: position, y: 0, animated: true });
      }
    );
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToElement(7);
    }, 500);
    return () => {};
  }, []);

  const setNode = (index: number, ref: TouchableOpacity | null) => {
    // console.log("_nodes.set(index, ref)", index, ref);
    set_nodes(_nodes.set(index, ref));
  };
  const CanAccess: any = useSelector(selectPlan);

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("GROWTH")}
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
        <View style={styles.main}>
          <View style={{ width: "100%" }}>
            <View style={styles.calenderWrap}>
              <View style={styles.monthWrap}>
                <Calender />
                <Text style={styles.monthText}>
                  {/* {form.date?.getDate()}{" "} */}
                  {form.date?.toLocaleDateString("en-US", {
                    month: "short",
                  })}{" "}
                  {form.date?.getFullYear()}
                </Text>
              </View>
              <View style={styles.calender}>
                <ScrollView
                  horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ref={myScroll}
                >
                  {generateDates().map((date, index) => (
                    <TouchableOpacity
                      ref={(ref) => setNode(index, ref)}
                      onPress={() =>
                        CanAccess.isDefault == 0
                          ? handleDateChange(date, index)
                          : undefined
                      }
                    >
                      <View
                        style={
                          form.date.getDate() == date.getDate()
                            ? styles.dayWrapSelected
                            : styles.dayWrap
                        }
                      >
                        {CanAccess.isDefault == 0 && (
                          <Text
                            style={
                              form.date.getDate() == date.getDate()
                                ? styles.dayTextSelected
                                : styles.dayText
                            }
                          >
                            {DateTime.fromJSDate(date).toFormat("ccc")}
                          </Text>
                        )}

                        {CanAccess.isDefault == 0 && (
                          <Text
                            style={
                              form.date.getDate() == date.getDate()
                                ? styles.daystrTextSelected
                                : styles.daystrText
                            }
                          >
                            {formatDate(date)}
                          </Text>
                        )}

                        {form.date.getDate() == date.getDate() &&
                        CanAccess.isDefault == 1 ? (
                          <>
                            <Text
                              style={
                                form.date?.getDate() == date.getDate()
                                  ? styles.dayTextSelected
                                  : styles.dayText
                              }
                            >
                              {DateTime.fromJSDate(date).toFormat("ccc")}
                            </Text>
                            <Text
                              style={
                                form.date.getDate() == date.getDate()
                                  ? styles.daystrTextSelected
                                  : styles.daystrText
                              }
                            >
                              {formatDate(date)}
                            </Text>
                          </>
                        ) : (
                          CanAccess.isDefault == 1 && <Lock />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.inputWrap}>
              <AuthInput
                inputProps={{
                  placeholder: t("HEIGHT_FEET"),
                  value: form.heightFeet,
                  onChangeText: (text) => handleChange(text, "heightFeet"),
                  keyboardType: "numeric",
                }}
                keyboardType="numeric"
                wrapstyle={{
                  width: "47%",
                }}
              />
              <AuthInput
                inputProps={{
                  placeholder: t("HEIGHT_INCH"),
                  value: form.heightInch,
                  onChangeText: (text) => handleChangeInch(text, "heightInch"),
                  keyboardType: "numeric",
                }}
                wrapstyle={{
                  width: "47%",
                }}
              />
            </View>
            <AuthInput
              inputProps={{
                placeholder: t("WEIGHT_KG"),
                value: form.weight,
                onChangeText: (text) => handleChange(text, "weight"),
                keyboardType: "numeric",
              }}
            />
          </View>
          <PrimaryButton
            title={t("UPDATE")}
            disabled={false}
            onPress={handleAddSleep}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Growth;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  calender: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    // backgroundColor:"red"
  },
  calenderWrap: {
    width: "100%",
    alignItems: "center",
    marginVertical: 25,
  },
  monthWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 30,
  },
  monthText: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    lineHeight: 21,
    color: LightTheme.colors.primary_btn,
    marginHorizontal: 8,
  },
  dayText: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 14,
    color: LightTheme.colors.black,
    // marginBottom: 5,
  },
  dayWrapInput: {
    display: "none",
  },
  container: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  datePicker: {
    marginRight: 10,
  },
  dayTextSelected: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 14,
    color: LightTheme.colors.white,
    // marginBottom: 5,
  },
  daystrTextSelected: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 21,
    color: LightTheme.colors.white,
  },
  dayWrapSelected: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: LightTheme.colors.white,
    backgroundColor: LightTheme.colors.primary_btn,
    ...global.flexCenter,
    marginRight: 10,
  },
  dateInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    alignItems: "flex-start",
    paddingLeft: 10,
    borderColor: "#ccc",
  },
  dateText: {
    fontSize: 18,
  },
  daystrText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 21,
    color: LightTheme.colors.black,
  },
  dayWrap: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
    ...global.flexCenter,
    marginRight: 10,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
