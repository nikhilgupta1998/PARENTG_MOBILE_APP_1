import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";
import BookMark from "assets/icons/bookmark.svg";
import NoBookMark from "assets/icons/bookwithoutmark.svg";
import { LightTheme } from "../../utils/theme";
import BackHeader from "components/BackHeader";
import global from "styles/global";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import analytics from "@react-native-firebase/analytics";
import { actions } from "../../Redux/Toys/slice";
import { AWS_PATH } from "utils/constrats";
import { useFocusEffect } from "@react-navigation/native";
import { hp } from "../../constants/Dimenstions";
import { selectToyDetails } from "../../Redux/Toys/selectors.";
import { renderEmpty } from "components/renderEmpty";
import { BookmarkEnum } from "../../Redux/Toys/types";
const ToyDetails = (props: any) => {
  const goBack = () => {
    dispatch(actions.resetdata());
    props.navigation.goBack();
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data: any = useSelector(selectToyDetails);
  // console.log(data, "data");

  useEffect(() => {
    dispatch(
      actions.doGetDetails({
        id: props.route.params.id,
        callback() {},
      })
    );
    return () => {};
  }, [props.route.params.id]);

  useEffect(() => {
    console.log("data",data);
    
  
    return () => {
      
    }
  }, [data])
  
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => {
        unsubscribe;
        dispatch(actions.resetdata());
      };
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
  const openTab =  async (url: any) => {
    await analytics().logEvent("toyPurchase", {});
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } 
  };
  useEffect(() => {
    return () => {
      dispatch(actions.resetdata());
    };
  }, []);
  const doAddBookmark = (id: string, bookmark: number) => {
    dispatch(actions.setAddBookmark(bookmark == 1 ? 0 : 1));
    dispatch(
      actions.doAddRandomBookmarkManualDetails({
        category: data.categoryId,
        bookmark: bookmark == 1 ? 0 : 1,
        itemId:id
     
      })
    );
    dispatch(
      actions.doAddBookmark({
        id: id,
        bookmark: bookmark == 1 ? 0 : 1,
        callback() {
          dispatch(
            actions.doGetDetails({
              id: props.route.params.id,
              callback() {},
            })
          );
        },
      })
    );

 
  };
  return (
    <SafeAreaView style={[global.wrap]}>
    <View style={[global.wrap, { paddingHorizontal: 20, paddingTop: 30 }]}>
      <BackHeader  iconStyle={undefined} 
        title={"Toy Detail"}
        titleStyle={{ fontSize: 22 }}
        RightIcon={
          data?.bookmark == BookmarkEnum.YES ? <BookMark /> : <NoBookMark />
        }
        goback={goBack}
        rightIconOnPress={() => doAddBookmark(data?._id, data?.bookmark)}
      />
      {data._id ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: AWS_PATH + data.image }}
              style={styles.mealPic}
            />
          </View>
          <Text
            style={{
              ...styles.titleFontStyle,
              fontSize: 18,
              marginTop: 15,
              marginBottom: 2,
            }}
          >
            {data?.englishTitle}
          </Text>
          <View style={styles.container}>
            {/* First box */}
            <View style={styles.box}>
              <Text style={styles.description}>
                {data.categoryEnglishTitle}
              </Text>
            </View>

            {/* Second box */}
            <View style={styles.box}>
              <Text style={styles.description}>
                {data?.minPrice} -{data?.maxPrice}
                {data?.currency.length > 0 ? data?.currency : "INR"}
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={[styles.description , {
                  width:"70%"
              }]} lineBreakMode="clip" >
                {" "}
                {data?.toysCategoryEnglishTitle} ( {data?.minAge} -
                {data?.maxAge} Months)
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.postCaption,
                {
                  marginTop: 15,
                  marginBottom: 20,
                  fontFamily: LightTheme.fontFamily.regular,
                },
              ]}
            >
              {data.shortEnglishDescription}
            </Text>
          </View>

          <View>
            <Text
              style={[
                styles.mealName,
                {
                  color: LightTheme.colors.primary_btn,
                },
              ]}
            >
              Why you need this?
            </Text>
            <Text
              style={[styles.postCaption, { marginTop: 10, marginBottom: 40 }]}
            >
              {data.englishDescription}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => openTab(data?.productLink)}
          >
            <Text style={styles.btnTxt}>{t("EXPLORE.BUY_NOW")}</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        renderEmpty(true, "")
      )}
    </View>
    </SafeAreaView>
  );
};

export default ToyDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: LightTheme.colors.primary,
  },
  btnTxt: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.white,
  },

  btn: {
    height: 32,
    width: "auto",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 30,
    backgroundColor: LightTheme.colors.primary_btn,
  },
  mealPic: {
    width: "100%",
    height: hp(26),
    borderRadius: 12,
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
    marginTop: 20,
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
  mealNameWrap: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  mealName: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor,
  },
  // btn: {
  //   borderRadius: 5,
  //   height: 24,
  //   width: 74,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#29E33B",
  // },
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
  },
  box: {
    // flex: 1, // Each box takes equal space
    backgroundColor: LightTheme.colors.primary_btn,
    borderRadius: 5,
    padding: 10,
    marginVertical: 2,
    marginHorizontal:1
  },
  title: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.bold,
    color: LightTheme.colors.white,
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.white,
    flexWrap:"wrap",
  
  },
  container: {
    flexDirection: "row", // Arrange boxes horizontally
    justifyContent: "space-between", // Space evenly between boxes
    alignItems: "center", // Center items verticall // Background color of container
  },
});
