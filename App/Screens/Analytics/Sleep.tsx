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
import BackHeader from "components/BackHeader";
import analytics from "@react-native-firebase/analytics";
import { images } from "../../constants/img";
import global from "../../styles/global";
import PrimaryButton from "components/PrimaryButton";
import Calender from "assets/icons/calender.svg";
import { LightTheme } from "../../utils/theme";
import { width } from "../../constants/Dimenstions";
import { useTranslation } from "react-i18next";
import Lock from "assets/svg/lockSecond.svg";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Analytics/slice";
import { selectLoading, selectSleep } from "../../Redux/Analytics/selectors.";
import { sleepInterface } from "../../Redux/Analytics/types";
import { selectPlan, selectProfileForm } from "../../Redux/Auth/selector";
import { DateTime } from "luxon";
import DatePicker from "react-native-date-picker";
import showToast from "utils/toast";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const Sleep = (props: any) => {
  const myScroll = useRef<ScrollView | null>(null);
  const [_nodes, set_nodes] = useState(
    () => new Map<number, TouchableOpacity | null>()
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data: any = useSelector(selectProfileForm);
  useEffect(() => {
    dispatch(
      actions.updateSleepFormValue({
        key: "childId",
        value: data.selectedChild,
      })
    );
    return () => {};
  }, [data]);
  const GOBack = () => {
    props.navigation.goBack();
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = async (date: any, index: number) => {
    setfromDate(date);
    dispatch(actions.updateSleepFormValue({ key: "from", value: date }));
    dispatch(
      actions.updateSleepFormValue({
        key: "date",
        value: date,
      })
    );
    setTimeout(() => {
      scrollToElement(index);
    }, 500);
    await analytics().logEvent("modifyDateFilter", {});
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

  const form: sleepInterface = useSelector(selectSleep);
  const loader = useSelector(selectLoading);
  const [date, setDate] = useState(new Date());
  const [fromDate, setfromDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [Fromopen, setFromOpen] = useState(false);
  const setNode = (index: number, ref: TouchableOpacity | null) => {
    // console.log("_nodes.set(index, ref)", index, ref);
    set_nodes(_nodes.set(index, ref));
  };

  useEffect(() => {
    dispatch(actions.updateSleepFormValue({ key: "from", value: fromDate }));
    dispatch(actions.updateSleepFormValue({ key: "to", value: date }));
    dispatch(
      actions.updateSleepFormValue({
        key: "offset",
        value: new Date().getTimezoneOffset() * -1,
      })
    );
    return () => {};
  }, []);
  const handleAddSleep = async () => {
    if (fromDate > date) {
      showToast(
        "The sleep end time cannot be earlier than the sleep start time. "
      );
      return;
    }
    if (fromDate instanceof Date && date instanceof Date) {
      // Calculate the difference in milliseconds
      const differenceInMs = Math.abs(date.getTime() - fromDate.getTime());

      // Convert milliseconds to hours
      const differenceInHours = differenceInMs / (1000 * 60 * 60);

      // Check if the difference is not more than 24 hours
      const isValidDifference = differenceInHours <= 24;
      if (isValidDifference) {
        dispatch(
          actions.doAddSleepFeedingList({
            callback() {
              props.navigation.goBack();
              dispatch(actions.clearSleepForm());
            },
          })
        );
        await analytics().logEvent("sleepDataAdded", {});
      } else {
        showToast(
          "Please ensure that the difference between the two selected times does not exceed 24 hours."
        );
      }
    } else {
      console.log("Invalid date objects.");
    }
  };
  // const maxDate = new Date();
  const maxDate = new Date(fromDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours in milliseconds

  const CanAccess: any = useSelector(selectPlan);
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("SLEEP")}
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

            <View style={styles.inputWrapCombine}>
              <TouchableOpacity
                style={[styles.inputWrap]}
                onPress={() => setFromOpen(true)}
              >
                <Text style={styles.inputDateText}>
                  {fromDate.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={Fromopen}
                date={fromDate}
                onConfirm={(date) => {
                  setFromOpen(false);
                  setfromDate(date);

                  console.log("setOuterPressed(from)", date);

                  console.log(
                    "setOuterPressed(from)",
                    DateTime.fromJSDate(date).toISO()
                  );
                  console.log(
                    "setOuterPressed(from)",
                    new Date().getTimezoneOffset() * -1
                  );

                  dispatch(
                    actions.updateSleepFormValue({
                      key: "from",
                      value: DateTime.fromJSDate(date).toISO(),
                    })
                  );
                }}
                onCancel={() => {
                  setFromOpen(false);
                }}
                mode="time"
              />
              <TouchableOpacity
                style={[styles.inputWrap]}
                onPress={() => setOpen(true)}
              >
                <Text style={styles.inputDateText}>
                  {date.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                minimumDate={fromDate}
                maximumDate={maxDate}
                date={date}
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(date);

                  console.log("setOuterPressed(true)", date);

                  console.log(
                    "setOuterPressed(true)",
                    DateTime.fromJSDate(date).toISO()
                  );

                  dispatch(
                    actions.updateSleepFormValue({
                      key: "to",
                      value: DateTime.fromJSDate(date).toISO(),
                    })
                  );
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                mode="datetime"
              />
            </View>
          </View>
          <PrimaryButton
            title={t("UPDATE")}
            onPress={handleAddSleep}
            disabled={loader}
            loading={loader}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Sleep;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 40,
    justifyContent: "space-between",
    alignItems: "center",
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
  inputDateText: {
    marginLeft: 8,
    color: LightTheme.colors.black,
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
    // width: "110%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 51,
    width: 150,
  },
  inputWrapCombine: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
