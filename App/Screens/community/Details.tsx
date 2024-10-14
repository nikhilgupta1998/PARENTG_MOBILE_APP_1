import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { LightTheme } from "../../utils/theme";
import BackHeader from "components/BackHeader";
import global from "styles/global";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Community/redux/slice";
import { SCREENS } from "../../constants/var";
import { selectPostDetails } from "../../Redux/Community/redux/selectors";
import { AWS_PATH } from "utils/constrats";
import { useFocusEffect } from "@react-navigation/native";
import { hp } from "../../constants/Dimenstions";
import { renderEmpty } from "components/renderEmpty";
const BlogDetailScreen = (props: any) => {
  const goBack = () => {
    dispatch(actions.clearPostDetail());
    props.navigation.goBack();
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data: any = useSelector(selectPostDetails);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetDetails({
        id: props.route.params.id,
        callback() {},
      })
    );
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { paddingTop: 30 }]}>
        <View
          style={{
            paddingHorizontal: 30,
          }}
        >
          <BackHeader
            iconStyle={undefined}
            title={t("COMMUNITY_DETAILS")}
            titleStyle={{ fontSize: 18 }}
            RightIcon={undefined}
            goback={goBack}
            rightIconOnPress={() => {}}
          />
        </View>

        {data._id ? (
          <>
            <Text
              style={{
                ...styles.titleFontStyle,
                fontSize: 18,
                marginBottom: 11,
                marginTop: 26,
                paddingHorizontal: 30,
              }}
            >
              {data?.title}
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: AWS_PATH + data?.images[0] }}
                style={styles.mealPic}
                // resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.postCaption}>{data?.description}</Text>
            </View>
          </>
        ) : (
          renderEmpty(true, "")
        )}
      </View>
    </SafeAreaView>
  );
};

export default BlogDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
  },
  mealPic: {
    width: "auto",
    height: hp(50),
    borderRadius: 0,
  },
  linearGradient: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  CommentsScreen: {
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
    fontSize: 20,
    marginLeft: 18,
    marginVertical: 11,
  },
  imageView: {
    width: 43,
    height: 43,
  },
  commentProfileImage: {
    width: "100%",
    height: "100%",
  },
  commentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 19,
  },
  sideTextView: {
    marginLeft: 9,
    flex: 1,
  },
  userNameText: {
    color: LightTheme.colors.black,
    fontFamily: LightTheme.fontFamily.semiBold,
    fontSize: 12,
  },
  CommentText: {
    color: "#686868",
    fontFamily: LightTheme.fontFamily.regular,
    fontSize: 10,
    marginRight: 15,
  },
  typeCommentView: {
    width: Dimensions.get("window").width - 84,
    height: 41,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: LightTheme.colors.white,
    borderColor: "#CFCFCF",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  commentMainView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.white,
    marginBottom: 15,
  },
  imageContainer: {
    // height: 170,
    // width: Constants.SCREEN_WIDTH - Constants.CHANGE_BY_MOBILE_DPI(30),
    // width: 70,
    // marginHorizontal: 15,
    // marginTop: Constants.CHANGE_BY_MOBILE_DPI(17)
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 17,
  },
  titleFontStyle: {
    color: LightTheme.colors.black,
    fontFamily: LightTheme.fontFamily.semiBold,
    fontSize: 14,
  },
  descriptionFontStyle: {
    color: "#737373",
    fontFamily: LightTheme.fontFamily.regular,
    fontSize: 10,
    marginTop: 5,
  },
  linearGradientCreatePostBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  createPostBtn: {
    height: 46,
    width: 176,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  createPostFontStyle: {
    color: LightTheme.colors.white,
    fontFamily: LightTheme.fontFamily.semiBold,
    fontSize: 18,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    // paddingHorizontal: Constants.CHANGE_BY_MOBILE_DPI(18),
  },
  btn: {
    borderRadius: 5,
    height: 24,
    width: 74,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#29E33B",
  },
  physicalFontStyle: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
  },

  alignContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  searchContainer: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: LightTheme.colors.white,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  searchFontStyle: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
  },
  headerFontStyle: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
  },
  backButton: {
    marginLeft: 20,
    marginVertical: 13,
  },
  postCaption: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor1,
    lineHeight: 18,
    marginTop: 20,
    paddingHorizontal: 30,
  },
});
