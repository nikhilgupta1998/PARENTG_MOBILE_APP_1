import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useWindowDimensions } from "react-native";
import { LightTheme } from "../../utils/theme";
import BackHeader from "components/BackHeader";
import global from "styles/global";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectBlogDetails, selectLoading } from "../../Redux/Blog/selectors.";
import { actions } from "../../Redux/Blog/slice";
import RenderHtml from "react-native-render-html";

import { SCREENS } from "../../constants/var";
import { AWS_PATH } from "utils/constrats";
import { hp } from "../../constants/Dimenstions";
import { renderEmpty } from "components/renderEmpty";

const BlogDetailScreen = (props: any) => {
  const { width } = useWindowDimensions();

  const goBack = () => {
    props.navigation.goBack();
  };
  const loading = useSelector(selectLoading);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector(selectBlogDetails);

  const doLike = (id: string, like: any) => {
    dispatch(actions.setCategory(""));
    dispatch(
      actions.doLikeBlog({
        id: id,
        like: like == 1 ? 0 : 1,
        callback() {
          dispatch(
            actions.doGetDetails({
              id: id,
              callback() {},
            })
          );
        },
      })
    );
  };
  // console.log(data.image, "data");
  const tagsStyles = {
    body: {
      whiteSpace: "normal",
      color: "gray",
    },
    a: {
      color: "green",
    },
    p: {
      margin: 0,
      color: "gray",
    },
    span: {
      color: "black",
    },
    h1: {
      fontSize: 10,
    },
    strong: {
      margin: 0,
    },
  };
  // const tagsStyles = {
  //   body: {
  //     whiteSpace: 'normal',
  //     color: 'gray'
  //   },
  //   span: {
  //     color: 'black'
  //   },
  //   td:{
  //     borderWidth:1,
  //     justifyContent:'center',
  //     borderColor:'#d5d5d5',
  //     paddingLeft:10

  //   },
  //   p:{
  //     margin:0
  //   }
  // };
  useEffect(() => {
    // console.log("data",data.englishDescription);
    // console.log("data",data.englishDescription.replace("<p><strong></strong></p>",""));

    return () => {};
  }, [data]);

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { paddingHorizontal: 20, paddingTop: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("EXPLORE.BLOGS_DETAILS")}
          titleStyle={{ fontSize: 27 }}
          RightIcon={undefined}
          goback={goBack}
          rightIconOnPress={() => doLike(data._id, data.like)}
        />
        {loading ? (
          renderEmpty(true, "")
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text
              style={{
                ...styles.titleFontStyle,
                fontSize: 18,
                marginHorizontal: 15,
                marginBottom: 10,
                marginTop: 26,
              }}
            >
              {data?.englishTitle}
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: AWS_PATH + data.image }}
                // resizeMode="contain"
                style={styles.mealPic}
              />
            </View>
            <View style={styles.alignContainer}>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.physicalFontStyle}>
                    {data?.categoryEnglishTitle}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.btn,
                    marginLeft: 12,
                    backgroundColor: "#FFE053",
                  }}
                >
                  <Text style={styles.physicalFontStyle}>
                    {data?.minAge}- {data?.maxAge} Months
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginBottom: 70 }}>
              <RenderHtml
                contentWidth={width}
                baseStyle={{ color: "#737373" }}
                source={{
                  html: data?.englishDescription.replace(
                    "<p><strong></strong></p>",
                    ""
                  ),
                }}
                enableExperimentalMarginCollapsing={true}
                // enableExperimentalMarginCollapsing={true}
                // enableExperimentalGhostLinesPrevention={true}
                // enableCSSInlineProcessing={true}
                // enableExperimentalBRCollapsing={true}
                // enableUserAgentStyles={true}
                tagsStyles={tagsStyles}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BlogDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: Colors.PRIMARY,
    backgroundColor: LightTheme.colors.primary,
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
    height: 190,
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
    paddingBottom: 0,
    // paddingHorizontal: Constants.CHANGE_BY_MOBILE_DPI(18),
  },
  btn: {
    borderRadius: 5,
    height: "auto",
    width: "auto",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#29E33B",
  },
  physicalFontStyle: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
  },
  mealPic: {
    width: "100%",
    height: hp(23),
    borderRadius: 12,
  },
  alignContainer: {
    marginHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 0,
    marginVertical: 10,
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
  },
});
