import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import global from "styles/global";
import { LightTheme } from "utils/theme";
import { images } from "../../constants/img";
import SliderShow from "./SliderShow";
import { useDispatch, useSelector } from "react-redux";
import { selectPlans } from "../../Redux/Plan/redux/selectors";
import { selectProfileForm } from "../../Redux/Auth/selector";
import { actions as actionAuth } from "../../Redux/Auth/slice";
import { actions } from "../../Redux/Plan/redux/slice";
import PrimaryButton from "components/PrimaryButton";
import { SCREENS } from "../../constants/var";
function SuccessScreen(props: any) {
  const GOBack = () => {
    props.navigation.goBack();
  };
  const dispatch = useDispatch();
  const plans = useSelector(selectPlans);
  const userData: any = useSelector(selectProfileForm);
  var userPurchasePlan: any = plans.filter(
    (item: any) => userData?.planId == item._id
  );
  useEffect(() => {
    dispatch(
      actionAuth.getMeRequestSecond({
        callback() {},
      })
    );
    dispatch(
      actionAuth.getMeRequest({
        callback() {},
      })
    );
    dispatch(actions.doGetPlans());

    return () => {};
  }, []);
  // console.log(userPurchasePlan, plans, "userPurchasePlan");

  return (
    <SafeAreaView style={[global.wrap]}>
      <View
        style={[
          global.wrap,
          {
            padding: 30,
            paddingBottom: 50,
            //   justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
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

        <View style={styles.container}>
          <View style={styles.leftSection}>
            <View
              style={{
                flexDirection: "column",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  marginBottom: 30,
                }}
              >
                <Image source={images.MASKSUCCESS} />
              </View>
              <View style={{ marginBottom: 45 }}>
                <Image source={images.SUCCESSTROPHI} />
              </View>

              <View>
                <Text
                  style={[
                    styles.FontStyle,
                    {
                      color: LightTheme.colors.red_1,
                    },
                  ]}
                >
                  Congratulations!
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.FontStyle,
                    {
                      color: LightTheme.colors.black,
                    },
                  ]}
                >
                  Your account is upgarded to
                </Text>
                <Text
                  style={[
                    styles.FontStyle,
                    {
                      color: LightTheme.colors.black,
                      marginBottom: 30,
                    },
                  ]}
                >
                  Premium
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rightSection}>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <PrimaryButton
                title={"Back To Home"}
                onPress={() => {
                  props.navigation.navigate(SCREENS.HOME);
                }}
                disabled={false}
                loading={undefined}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SuccessScreen;

const styles = StyleSheet.create({
  FontStyle: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column", // Horizontal layout
  },
  leftSection: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  rightSection: {
    flex: 2,
  },
});
