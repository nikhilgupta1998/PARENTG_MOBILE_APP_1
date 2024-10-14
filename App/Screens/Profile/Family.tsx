import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Plus from "assets/icons/plus.svg";
import Edit from "assets/icons/edit.svg";
import { hp } from "../../constants/Dimenstions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChildList,
  selectParentList,
  selectProfileForm,
  selectloader,
} from "../../Redux/Auth/selector";
import { actions as action } from "../../Redux/Auth/slice";
import { SCREENS } from "../../constants/var";
import { useTranslation } from "react-i18next";
import { AWS_PATH } from "utils/constrats";
import { useFocusEffect } from "@react-navigation/native";
import { renderEmpty } from "components/renderEmpty";

const Family = (props: any) => {
  const list = useSelector(selectParentList);
  const handleEditParent = (id: any) => {
    props.navigation.navigate(SCREENS.EDIT_FAMILY, {
      id: id,
    });
  };

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      action.doGetParentList({
        callback() {},
      })
    );
  };
  const AddParent = () => {
    props.navigation.navigate(SCREENS.CREATE_FAMILY);
  };

  const goFamily = () => {
    props.navigation.navigate(SCREENS.FAMILY);
  };
  const goParent = () => {
    props.navigation.navigate(SCREENS.KIDS);
  };
  const { t } = useTranslation();
  const loader = useSelector(selectloader);
  const data: any = useSelector(selectProfileForm);
  const goMyProfile = () => {
    props.navigation.navigate(SCREENS.MY_PROFILE);
  };
  const Child = useSelector(selectChildList);
  var selectedChildDetail: any = Child.filter(
    (item) => item?._id == data.selectedChild
  );
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={global.wrap}>
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={global.greenShder}
        />
        <View style={styles.headerWrap}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>
              {t("HELLO")} {selectedChildDetail[0]?.name}!
            </Text>
            <Text style={styles.profileInfo}>{t("OTHER.SEE_PROFILE")}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => goMyProfile()}>
              <Image
                // resizeMode="contain"
                source={{ uri: AWS_PATH + data?.profilePic }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>
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
          <TouchableOpacity style={styles.activityImg} onPress={goParent}>
            <Text style={styles.imgTopText}>{t("PROFILEOBJ.KIDS")}</Text>
          </TouchableOpacity>
          <View>
            <ImageBackground
              style={styles.activityImg}
              source={images.SELECTOR}
              resizeMode="contain"
            >
              <Text style={styles.imgTopText}>{t("PROFILEOBJ.FAMILY")}</Text>
            </ImageBackground>
          </View>
        </ImageBackground>
        {loader ? (
          renderEmpty(true, "")
        ) : (
          <>
            <FlatList
              data={list}
              style={{ flexGrow: 0, maxHeight: hp(60) }}
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={styles.switchProfileWrap} key={index}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: AWS_PATH + item?.profilePic }}
                      style={styles.switchAvatar}
                      resizeMode="contain"
                    />
                    <Text style={styles.switchProfileTxt}>{item?.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.edit}
                    onPress={() => handleEditParent(item?._id)}
                  >
                    <Edit />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity
              style={[
                styles.switchProfileWrap,
                { justifyContent: "flex-start" },
              ]}
              onPress={AddParent}
            >
              <View style={styles.switchProfileAddIcon}>
                <Plus height={18} />
              </View>
              <Text
                style={[
                  styles.switchProfileTxt,
                  { color: LightTheme.colors.primary_btn },
                ]}
              >
                {t("PROFILEOBJ.ADD_FAMILY")}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Family;

const styles = StyleSheet.create({
  switchProfileWrap: {
    height: 60,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchAvatar: {
    width: 42,
    height: 42,
    borderRadius: 25,
    marginRight: 15,
    ...global.flexCenter,
  },
  edit: {
    width: 42,
    height: 42,
    borderRadius: 25,
    ...global.flexCenter,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
  },

  switchProfileTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
  },
  txt1: {
    fontSize: 28,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
  switchProfileAddIcon: {
    width: 42,
    height: 42,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: LightTheme.colors.green_6,
    ...global.flexCenter,
    marginRight: 15,
  },
  imgTopText: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
    lineHeight: 21,
    textAlign: "center",
  },
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
  headerOption: {
    flex: 1,
  },
  grediant: {
    height: 44,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
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
  imgLayer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  container: {
    flex: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 15,
    paddingBottom: 8,
    alignItems: "center",
    height: 80,
    justifyContent: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 25,
  },
  activityImg: {
    width: 150,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
});
