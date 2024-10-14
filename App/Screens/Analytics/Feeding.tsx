import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import BackgroundTimer from "react-native-background-timer"; // Import BackgroundTimer
import { useTranslation } from "react-i18next";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Play from "assets/icons/play.svg";
import Pause from "assets/icons/pause.svg";
import PrimaryButton from "components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Analytics/slice";
import { selectProfileForm } from "../../Redux/Auth/selector";
import { SCREENS } from "../../constants/var";
import analytics from "@react-native-firebase/analytics";
const Feeding = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleRIghtChange = (date: any) => {
    dispatch(
      actions.updateBreastFeedingFormValue({
        key: "rightStartTime",
        value: date,
      })
    );
  };
  const handleLeftChange = (date: any) => {
    dispatch(
      actions.updateBreastFeedingFormValue({
        key: "leftStartTime",
        value: date,
      })
    );
  };
  const handleRIghtChangeEnd = (date: any) => {
    dispatch(
      actions.updateBreastFeedingFormValue({
        key: "rightEndTime",
        value: date,
      })
    );
  };
  const handleLeftChangeEnd = (date: any) => {
    dispatch(
      actions.updateBreastFeedingFormValue({
        key: "leftEndTime",
        value: date,
      })
    );
  };
  const data: any = useSelector(selectProfileForm);
  useEffect(() => {
    dispatch(
      actions.updateBreastFeedingFormValue({
        key: "childId",
        value: data.selectedChild,
      })
    );
    return () => {};
  }, [data]);
  useEffect(() => {
    dispatch(
      actions.updateBreastFeedingFormValue({
        key: "childId",
        value: data.selectedChild,
      })
    );
    return () => {};
  }, []);
  // Right side stopwatch state and functions
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  // Left side stopwatch state and functions
  const [timeLeft, setTimeLeft] = useState(0);
  const [runningLeft, setRunningLeft] = useState(false);

  // Reference for intervals
  const intervalRef = useRef<any>(null);
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString();
  // Start the right side stopwatch
  const startStopwatch = () => {
    handleRIghtChange(currentDateString);
    setRunning(true);
  };

  // Pause the right side stopwatch
  const pauseStopwatch = () => {
    handleRIghtChangeEnd(currentDateString);
    setRunning(false);
  };
  const intervalRefLeft = useRef<any>(null);
  const currentDateLeft = new Date(); // Get current date and time
  const currentDateStringLeft = currentDateLeft.toISOString();
  // Start the left side stopwatch
  const startStopwatchLeft = () => {
    handleLeftChange(currentDateStringLeft);
    setRunningLeft(true);
  };
  // Pause the left side stopwatch
  const pauseStopwatchLeft = () => {
    clearInterval(intervalRefLeft.current);
    setRunningLeft(false);
    handleLeftChangeEnd(currentDateStringLeft);
  };

  const [isRightActive, setIsRightActive] = useState(false);
  const [isLeftActive, setIsLeftActive] = useState(false);
  // Function to handle the play/pause button press for the right side stopwatch
  const isPlayOrStop = async () => {
    if (!running) {
      setIsLeftActive(true);
      setIsRightActive(false);
      startStopwatch();
    } else {
      setIsLeftActive(false);
      setIsRightActive(false);
      pauseStopwatch();
    }
    await analytics().logEvent("RightBreastFeedingTimeAction", {});
  };

  // Function to handle the play/pause button press for the left side stopwatch
  const isPlayOrStopLeft = async () => {
    if (!runningLeft) {
      startStopwatchLeft();
    } else {
      pauseStopwatchLeft();
    }
    await analytics().logEvent("leftBreastFeedingTimeAction", {});
  };

  // Effect to update the right side stopwatch time every second
  useEffect(() => {
    if (running) {
      BackgroundTimer.runBackgroundTimer(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [running]);

  // Effect to update the left side stopwatch time every second
  useEffect(() => {
    if (runningLeft) {
      BackgroundTimer.runBackgroundTimer(() => {
        setTimeLeft((timeLeft) => timeLeft + 1);
      }, 1000);
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [runningLeft]);
  const handleAddSleep = async () => {
    dispatch(
      actions.doAddBreastFeedingList({
        callback() {
          setTime(0);
          setTimeLeft(0);
          dispatch(actions.clearBreastFeedingForm());
        },
      })
    );
    await analytics().logEvent("breastFeedingRecorded", {});
  };
  const GOBack = () => {
    props.navigation.goBack();
  };
  const goFeeding = () => {
    props.navigation.navigate(SCREENS.BOTTELFEEDING);
    pauseStopwatch();
    pauseStopwatchLeft();
  };
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
          <View>
            <ImageBackground
              style={styles.activityImg}
              source={images.SELECTOR}
              resizeMode="contain"
            >
              <Text style={styles.imgTopText}>{t("BREAST_FEEDING")} </Text>
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.activityImg} onPress={goFeeding}>
            <Text style={styles.imgTopText}>{t("BOTTLE_FEEDING")}</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.main}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.arrows}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={isPlayOrStop}
                  disabled={isRightActive}
                >
                  <ImageBackground
                    style={[styles.containerSquire]}
                    source={images.SQUIRE}
                    resizeMode="contain"
                  >
                    {!running ? <Play /> : <Pause />}
                  </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.arrowTxt}>{t("RIGHT")}</Text>
                <Text
                  style={[
                    styles.arrowTxt,
                    {
                      fontSize: 20,
                    },
                  ]}
                >
                  {time}s
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={isPlayOrStopLeft}
                  disabled={isLeftActive}
                >
                  <ImageBackground
                    style={[styles.containerSquire]}
                    source={images.SQUIRE}
                    resizeMode="contain"
                  >
                    {!runningLeft ? <Play /> : <Pause />}
                  </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.arrowTxt}>{t("LEFT")}</Text>
                <Text
                  style={[
                    styles.arrowTxt,
                    {
                      fontSize: 20,
                    },
                  ]}
                >
                  {timeLeft}s
                </Text>
              </View>
            </View>
          </View>

          <PrimaryButton
            title={t("SAVE")}
            disabled={false}
            onPress={handleAddSleep}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feeding;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: "green",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: "blue",
  },
  timeText: {
    fontSize: 48,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: "#2ecc71",
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: "#e74c3c",
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: "#f39c12",
  },
  resumeButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  containerButtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  datePickerButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 16,
  },
  displayText: {
    fontSize: 16,
    color: "blue",
    marginTop: 16,
  },
  main: {
    flex: 0.94,
    justifyContent: "space-between",
    alignItems: "center",
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
  // buttonContainer: {
  //   height: "90%",
  //   alignSelf: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#ffffff",
  //   width: "95%",
  // },
  // buttonText: {
  //   textAlign: "center",
  //   color: LightTheme.colors.textColor1,
  //   alignSelf: "center",
  // },
  arrowTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    marginTop: 8,
  },
  timeTxt: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
    marginTop: 8,
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
  containerSquire: {
    marginTop: 0,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 95,
    height: 95,
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
  activityImg: {
    width: 120,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
});
