import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { LightTheme } from "../../utils/theme";
import ProfileMenu from "components/ProfileMenu";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { SCREENS } from "../../constants/var";
import { useDispatch } from "react-redux";
import { actions } from "../../Redux/Auth/slice";
import InAppReview from "react-native-in-app-review";
import showToast from "utils/toast";
const Explore = (props: any) => {
  const { t } = useTranslation();
  const chnageBLOG = () => {
    props.navigation.navigate(SCREENS.BLOG_SCREEN);
  };
  const goVaccination = () => {
    props.navigation.navigate(SCREENS.VACCINATION);
  };
  const changeBMI = () => {
    props.navigation.navigate(SCREENS.BMI_CALCULATE);
  };
  const chnageMEALSList = () => {
    props.navigation.navigate(SCREENS.MEAL_LIST);
  };

  const chnageTOYS = () => {
    props.navigation.navigate(SCREENS.TOYS);
  };
  const chnageANALYTICS = () => {
    props.navigation.navigate(SCREENS.ANALYTICS);
  };
  const chnageRATINGS = async () => {
    // working on rating
    try {
      const isAvailable = await InAppReview.isAvailable();
      if (isAvailable) {
        InAppReview.RequestInAppReview()
          .then((hasFlowFinishedSuccessfully) => {
            // when return true in android it means user finished or close review flow
            // console.log("InAppReview in android", hasFlowFinishedSuccessfully);

            // when return true in ios it means review flow lanuched to user.
            console.log(
              "InAppReview in ios has launched successfully",
              hasFlowFinishedSuccessfully
            );

            // 1- you have option to do something ex: (navigate Home page) (in android).
            // 2- you have option to do something,
            // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

            // 3- another option:
            if (hasFlowFinishedSuccessfully) {
              showToast("Rating Posted Successfully On Play Store");
              // do something for ios
              // do something for android
            }

            // for android:
            // The flow has finished. The API does not indicate whether the user
            // reviewed or not, or even whether the review dialog was shown. Thus, no
            // matter the result, we continue our app flow.

            // for ios
            // the flow lanuched successfully, The API does not indicate whether the user
            // reviewed or not, or he/she closed flow yet as android, Thus, no
            // matter the result, we continue our app flow.
          })
          .catch((error) => {
            showToast("Error requesting Rating");
            //we continue our app flow.
            // we have some error could happen while lanuching InAppReview,
            // Check table for errors and code number that can return in catch.
            // console.log(error);
          });
        // Review flow launched successfully
      } else {
        showToast("Rating is not available on this device.");
        // In-app review is not available on this device
      }
    } catch (error) {
      // Handle error

      showToast("Error requesting Rating");
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actions.doLogout());
    props.navigation.navigate(SCREENS.SPLASH);
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={global.wrap}>
        <BackHeader
          iconStyle={undefined}
          title=""
          style={{
            paddingVertical: 30,
            paddingHorizontal: 30,
          }}
          goback={goBack}
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
        <View style={styles.inputWrap}>
          {/* <TextInput
          textAlignVertical="center"
          placeholder={t("EXPLORE.SEARCH_HERE")}
          placeholderTextColor={LightTheme.colors.textColor6}
          style={styles.input}
        /> */}
          {/* <Text style={styles.inputCaption}>
          {t("EXPLORE.SEARCH_BOOKING_ID")}
        </Text> */}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.menuWrap}>
            <ProfileMenu title={t("TOYS")} onPress={chnageTOYS} />
            <ProfileMenu
              title={t("EXPLORE.MEAL_PLANNER")}
              onPress={chnageMEALSList}
            />
            <ProfileMenu title={"BMI Calculator"} onPress={changeBMI} />
            {/* <ProfileMenu title={t("MEALSOBJ.PHYSCOLOGY")} onPress={() => {}} /> */}
            <ProfileMenu
              title={t("EXPLORE.VACCINATION")}
              onPress={goVaccination}
            />
            <ProfileMenu title={t("EXPLORE.BLOGS")} onPress={chnageBLOG} />
            <ProfileMenu title={"Analytics"} onPress={chnageANALYTICS} />
            <ProfileMenu title={"Ratings"} onPress={chnageRATINGS} />
            {Platform.OS == "android" && (
              <ProfileMenu
                title={"Transaction"}
                onPress={() => {
                  props.navigation.navigate(SCREENS.TRANSACTION);
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  inputWrap: {
    width: "100%",
    paddingHorizontal: 30,
  },
  input: {
    width: "100%",
    fontSize: 35,
    borderWidth: 0,
    // backgroundColor: "transparent",
    height: 70,
    fontFamily: LightTheme.fontFamily.semiBold,
  },

  inputCaption: {
    fontSize: 17,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: LightTheme.colors.green_3,
    fontFamily: LightTheme.fontFamily.regular,
    marginTop: 4,
  },
  menuWrap: {
    flex: 1,
    // justifyContent: "space-between",
    paddingVertical: 45,
    paddingHorizontal: 30,
    marginBottom: 50,
  },
});
