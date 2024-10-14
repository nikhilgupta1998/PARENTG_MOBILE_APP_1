import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import global from "../../styles/global";
import { images } from "../../constants/img";
import { LightTheme } from "../../utils/theme";
import Customer from "assets/icons/customer_call.svg";
import Heart from "assets/icons/heart.svg";
import ProfileMenu from "components/ProfileMenu";
import { useTranslation } from "react-i18next";
import {
  selectPlan,
  selectProfileForm,
  selectTutorial,
} from "../../Redux/Auth/selector";
import { useDispatch, useSelector } from "react-redux";
import { AWS_PATH } from "utils/constrats";
import { SCREENS } from "../../constants/var";
import { actions } from "../../Redux/Auth/slice";
import BackHeader from "components/BackHeader";
const Profile = (props: any) => {
  const { t } = useTranslation();
  const data: any = useSelector(selectProfileForm);
  const goMyProfile = () => {
    props.navigation.navigate(SCREENS.MY_PROFILE);
  };
  const dispatch = useDispatch();
  const logout = () => {
    Alert.alert("Confirm", "Do You want to sure do logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(actions.doLogout());
          props.navigation.navigate(SCREENS.SPLASH);
        },
      },
    ]);
  };
  const deleteAccount = () => {
    Alert.alert("Confirm", "Do You want to sure do delete account?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(
            actions.doDeleteAccount({
              callback: () => {
                props.navigation.navigate(SCREENS.SPLASH);
              },
            })
          );
        },
      },
    ]);
  };

  useEffect(() => {
    dispatch(actions.getTutorial());
    return () => {};
  }, []);

  const changePlan = () => {
    props.navigation.navigate(SCREENS.PLAN);
  };
  const link = useSelector(selectTutorial);
  const handleRedirectToPlaylist = () => {
    // Replace 'YOUR_YOUTUBE_PLAYLIST_URL' with the actual URL of your YouTube playlist
    // const youtubePlaylistUrl =
    //   "https://youtu.be/EPx7X9Bxc2I?si=HAQpEdGQAy6iRTHu";

    // // Open the YouTube playlist URL in the default browser or the YouTube app if installed
    // Linking.openURL(link).catch((err) =>
    //   console.error("An error occurred while opening the URL:", err)
    // );
    props.navigation.navigate(SCREENS.TUTORIAL);
  };
  const CanAccess: any = useSelector(selectPlan);


  return (
    <SafeAreaView style={[global.wrap]}>
      <View
        style={[
          global.wrap,
          { paddingBottom: 50, paddingTop: 15, paddingHorizontal: 10 },
        ]}
      >
       
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />
        <View style={styles.headerWrap}>
          <View style={styles.headerLeft}>
            <BackHeader
              iconStyle={undefined}
              title=""
              RightIcon={undefined}
              goback={() => {
                props.navigation.goBack();
              }}
              rightIconOnPress={undefined}
            />
          </View>
          <View style={styles.headerRight}>
            <View style={styles.bellIconWrap}>
              {CanAccess.mealChat ? (
                <TouchableOpacity
                  style={styles.bellIcon}
                  onPress={() => {
                    props.navigation.navigate(SCREENS.CHAT, {
                      id: "",
                    });
                  }}
                >
                  <Customer />
                </TouchableOpacity>
              ) : undefined}
            </View>
            <TouchableOpacity onPress={() => goMyProfile()}>
              <Image
                resizeMode="contain"
                source={{ uri: AWS_PATH + data?.profilePic }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menuWrap}>
          <View style={styles.menu}>
            <ProfileMenu
              title={t("PROFILEOBJ.SETTINGS")}
              onPress={() => {
                props.navigation.navigate(SCREENS.KIDS);
              }}
            />
            {Platform.OS == "android" && (
              <ProfileMenu title={"My Account"} onPress={changePlan} />
            )}

            {/* <ProfileMenu title={t("PROFILEOBJ.BOOKINGS")} onPress={() => {}} /> */}
            {/* <ProfileMenu title={t("PROFILEOBJ.REWARDS")} onPress={() => {}} /> */}
            {/* <ProfileMenu title={t("PROFILEOBJ.BOOKMARK")} onPress={() => {}} /> */}
            {/* <ProfileMenu title={t("PROFILEOBJ.LANGUAGE")} onPress={() => {}} /> */}
            <ProfileMenu
              title={"Tutorial"}
              onPress={handleRedirectToPlaylist}
            />

            <ProfileMenu
              title={"Help Me"}
              onPress={() => {
                props.navigation.navigate(SCREENS.FAQ);
              }}
            />

            <ProfileMenu
              title={t("LOGOUT")}
              textStyle={{
                color: LightTheme.colors.red_2,
                fontSize: 23,
              }}
              onPress={logout}
            />
            <ProfileMenu
              title={t("DELETE_ACCOUNT")}
              textStyle={{
                color: LightTheme.colors.red_2,
                fontSize: 23,
              }}
              onPress={deleteAccount}
            />
          </View>

          <View>
            <Text style={styles.footerMsg}>Imminity Private Limited</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.footerMsg, { marginRight: 6 }]}>
                {" "}
                {t("PROFILEOBJ.MADE_IN_INDIA")}
              </Text>
              <Heart />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    paddingHorizontal: 30,
  },

  headerLeft: {
    flex: 0.8,
  },

  name: {
    fontSize: 19,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 28,
    color: LightTheme.colors.textColor1,
  },

  profileInfo: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 17,
    color: LightTheme.colors.primary_btn,
  },

  headerRight: {
    flexDirection: "row",
    // alignItems: "center",
  },
  bellIconWrap: {
    alignItems: "center",
    marginRight: 15,
  },

  notificationCount: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 18,
    color: LightTheme.colors.primary_btn,
  },
  bellIcon: {
    width: 44,
    height: 44,
    borderRadius: 25,
    ...global.flexCenter,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 25,
  },

  menuWrap: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 45,
    paddingHorizontal: 30,
  },
  menu: {},

  footerMsg: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor4,
    alignItems: "center",
  },
});
