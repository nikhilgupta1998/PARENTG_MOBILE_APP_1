import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Plus from "assets/icons/plus.svg";
import Edit from "assets/icons/edit.svg";
import { hp } from "../../constants/Dimenstions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChildList,
  selectProfileForm,
  selectloader,
} from "../../Redux/Auth/selector";
import { actions as action } from "../../Redux/Auth/slice";
import { SCREENS } from "../../constants/var";
import LinearGradient from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import { AWS_PATH } from "utils/constrats";
import { useFocusEffect } from "@react-navigation/native";
import { renderEmpty } from "components/renderEmpty";
import BackHeader from "components/BackHeader";

const Kids = (props: any) => {
  const list = useSelector(selectChildList);
  const handleEditChild = (id: any) => {
    props.navigation.navigate(SCREENS.EDIT_CHILD, {
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
      action.doGetChildList({
        callback() {},
      })
    );
  };
  const AddChild = () => {
    if (list.length >= 2) {
      toggleModal();
    } else {
      props.navigation.navigate(SCREENS.ADD_CHILD);
    }
  };

  const goFamily = () => {
    props.navigation.navigate(SCREENS.FAMILY);
  };
  const goChild = () => {
    props.navigation.navigate(SCREENS.KIDS);
  };
  const { t } = useTranslation();
  const loader = useSelector(selectloader);
  const data: any = useSelector(selectProfileForm);
  const goMyProfile = () => {
    props.navigation.navigate(SCREENS.MY_PROFILE);
  };
  var selectedChildDetail: any = list.filter(
    (item) => item?._id == data.selectedChild
  );
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={[global.wrap]}>
     <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("PROFILEOBJ.SETTINGS")}
          titleStyle={{ fontSize: 27 }}
          goback={goBack}
          rightIconOnPress={undefined}
        />
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
          <View>
            <ImageBackground
              style={styles.activityImg}
              source={images.SELECTOR}
              resizeMode="contain"
            >
              <Text style={styles.imgTopText}>{t("PROFILEOBJ.KIDS")}</Text>
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.activityImg} onPress={goFamily}>
            <Text style={styles.imgTopText}>{t("PROFILEOBJ.FAMILY")}</Text>
          </TouchableOpacity>
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
                    onPress={() => handleEditChild(item?._id)}
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
              onPress={AddChild}
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
                {t("PROFILEOBJ.ADD_CHILD")}
              </Text>
            </TouchableOpacity>
          </>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 25,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={images.INFORMATION}
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 50,
                    marginRight: 5,
                  }}
                />
                <Text style={styles.tmcText1}>
                  You can't add more then 2 child
                </Text>
              </View>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  alignSelf: "center",
                  marginTop: 15,
                  width: 80,
                  borderRadius: 5,
                  height: 30,
                  alignItems: "center",
                  backgroundColor: LightTheme.colors.green_6,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    {
                      color: LightTheme.colors.black,
                      fontFamily: LightTheme.fontFamily.regular,
                      fontSize: 13,
                    },
                  ]}
                >
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Kids;

const styles = StyleSheet.create({
  switchProfileWrap: {
    height: 60,
    alignItems: "center",

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
  tmcText1: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.regular,
    textAlign: "center",
    color: LightTheme.colors.textColor1,
    lineHeight: 16,
  },
});
