import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import Done from "assets/svg/done.svg";
import Complete from "assets/svg/Complete.svg";
import Video from "../../components/VideoComponent";
import { LightTheme } from "../../utils/theme";
import BackHeader from "components/BackHeader";
import global from "styles/global";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Home/Activitys/slice";
import analytics from "@react-native-firebase/analytics";
import {
  selectActivityDetails,
} from "../../Redux/Home/Activitys/selectors.";
import { useFocusEffect } from "@react-navigation/native";
import { AWS_PATH } from "utils/constrats";
import MileStoneModal from "./MilestoneDetail";
import { hp } from "../../constants/Dimenstions";
import { renderEmpty } from "components/renderEmpty";
import { SafeAreaView } from "react-native-safe-area-context";
const BlogDetailScreen = (props: any) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const goBack = () => {
    props.navigation.goBack();
    dispatch(actions.clearBlogDetails());
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data: any = useSelector(selectActivityDetails);
  // console.log(data, "data");

  useEffect(() => {
    if (props.route.params.id) {
      dispatch(
        actions.doGetDetails({
          showLoading: true,
          id: props.route.params.id,
          callback() {},
        })
      );
    }

    return () => {};
  }, [props.route.params.id]);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetDetails({
        showLoading: true,
        id: props.route.params.id,
        callback() {},
      })
    );
  };

  const doComplete = (id: string, isCompleted: any) => {
    dispatch(
      actions.setCompleteActivityDetails({
        isCompleted: !isCompleted,
      })
    );
    dispatch(
      actions.CompleteActivity({
        id: id,
        callback() {},
      })
    );
  };
  const [milestoneVisibility, setMilestoneVisibility] = useState(false);

  const renderItemMaterial = (item: string, index: any) => {
    // console.log(item, "item");

    return (
      <View key={index} style={{ padding: 1 }}>
        <Text
          numberOfLines={3}
          style={[
            styles.selfCareFontStyle,
            {
              fontSize: 12,
            },
          ]}
        >{`\u29BF  ${item}`}</Text>
      </View>
    );
  };
  const [strength, setStrength] = useState(0);
  const renderStrength = (item: any, index: any) => {
    const setIndex = () => {
      setStrength(index);
    };
    return (
      <TouchableOpacity
        onPress={setIndex}
        style={{ flex: 1, alignItems: "center" }}
      >
        <Text
          style={{
            ...styles.strengthText,
            color: strength == index ? LightTheme.colors.green_6 : "#000000",
            borderBottomWidth: 2,
            borderColor:
              strength == index
                ? LightTheme.colors.green_6
                : LightTheme.colors.background,
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const [milestoneID, setMilestoneID] = useState("");
  const mileStoneToggle = async (id: any) => {
    setMilestoneID(id);
    await analytics().logEvent("milestoneQuestionsRequested", {
      MilestoneId: id,
    });
    dispatch(
      actions.doGetQuestion({
        id: id,
        callback() {
          toggle();
        },
      })
    );
  };
  const toggle = () => {
    setMilestoneVisibility(!milestoneVisibility);
  };
  const [imageSize, setImageSize] = useState<any>(null);

  useEffect(() => {
    // Fetch the size of the image
    if (data?.englishVideo) {
      Image.getSize(
        AWS_PATH + data?.image,
        (width: any, height: any) => {
          // Update the state with the image dimensions
          setImageSize({ width, height });
        },
        (error) => {
          console.error("Error getting image size:", error);
        }
      );
    }
  }, [data?.image]);
  // console.log(imageSize, "imageSize");

  return (
    <SafeAreaView
      style={[global.wrap, { paddingHorizontal: 20, paddingTop: 10 }]}
    >
      <BackHeader
        iconStyle={undefined}
        title={t("EXPLORE.ACTIVITY_DETAILS")}
        titleStyle={{ fontSize: 22 }}
        RightIcon={data.isCompleted ? <Complete /> : <Done />}
        goback={goBack}
        rightIconOnPress={() => doComplete(data?._id, data.isCompleted)}
      />
      {!data?.englishTitle ? (
        renderEmpty(true, "")
      ) : (
        <View style={styles.subContainer}>
          <View style={[styles.bannerImageContainer]}>
            {data?.englishVideo ? (
              <Video
                poster={AWS_PATH + data?.image}
                source={{ uri: AWS_PATH + data?.englishVideo }}
                top={Platform.OS == "android"?-80: -91}
                left={-20}
                updateFullScreen={(val)=>{setFullscreen(val)}}
              />
            ) : (
              <Image
                source={{ uri: AWS_PATH + data?.image }}
                style={{ width: imageSize?.width, height: imageSize?.height }}
              />
            )}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{marginTop:fullscreen?100:0}}
          >
            <View style={styles.activityContainer}>
              <View style={styles.alignContainer}>
                <View style={styles.btnContainer}>
                  <View style={styles.btn}>
                    <Text
                      style={[
                        styles.physicalFontStyle,
                        {
                          textTransform: "uppercase",
                        },
                      ]}
                    >
                      {data?.category}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.btn,
                      marginLeft: 12,
                      backgroundColor: "#FFE053",
                    }}
                  >
                    <Text style={styles.physicalFontStyle}>
                      {data?.visibleAge}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View
                style={{
                  marginTop: 0,
                }}
              >
                <Text style={styles.parentFontStyle}>{data?.englishTitle}</Text>
                <View style={{ marginTop: 0 }}>
                  <Text style={styles.parentDescriptionFontStyle}>
                    {data?.englishPurpose}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  ...styles.selfConationStyle,
                  justifyContent: "space-between",
                  paddingHorizontal: 0,
                  marginTop: 10,
                }}
              >
                <View style={{ ...styles.selfConationStyle }}>
                  <Image
                    source={{ uri: AWS_PATH + data?.visibleMilestoneImage }}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                    // resizeMode="contain"
                  />
                  <Text
                    style={{
                      ...styles.selfCareFontStyle,
                      marginLeft: 0,
                      width: "60%",
                    }}
                  >
                    {data?.visibleMilestoneEnglish}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => mileStoneToggle(data?.activityId)}
                  style={styles.btn}
                >
                  <Text style={styles.physicalFontStyle}>Milestone</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.line}></View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {["Description", "Material"].map(renderStrength)}
              </View>
              {strength == 0 ? (
                <View
                  style={{
                    marginTop: 12,
                  }}
                >
                  <Text style={styles.parentDescriptionFontStyle}>
                    {data?.englishDescription}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    marginTop: 12,
                  }}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    {data?.englishMaterialList.map(renderItemMaterial)}
                  </ScrollView>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      )}
      <MileStoneModal
        visible={milestoneVisibility}
        toggle={toggle}
        milestoneID={milestoneID}
      />
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
    height: 236,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",

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
  },
  btn: {
    borderRadius: 5,
    padding: 5,
    width: "auto",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LightTheme.colors.green_6,
  },
  physicalFontStyle: {
    fontSize: 15,
    textTransform: "capitalize",
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
  },

  alignContainer: {
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

    marginTop: 20,
  },
  bannerImageContainer: {
    marginTop: 20,
    width: "100%",
    height: 220,
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

  backText: {
    color: LightTheme.colors.black,
    marginLeft: 20,
    marginTop: 60,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  activityContainer: {
    marginBottom: 0,
    marginTop: 14,
  },

  activityFontStyle: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
    marginBottom: 10,
  },

  parentFontStyle: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
    marginBottom: 2,
  },

  parentDescriptionFontStyle: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: "#0000008C",
  },
  selfCareFontStyle: {
    fontSize: 13,
    textTransform: "capitalize",
    flexWrap: "wrap",
    fontFamily: LightTheme.fontFamily.semiBold,
    color: "#3C3C3C",
  },
  mealPic: {
    width: "100%",
    height: hp(23),
    borderRadius: 12,
  },
  selfConationStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    height: 1,
    backgroundColor: "#D9D9D97A",
    marginTop: 23,
    marginBottom: 15,
  },
  strengthText: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.green_6,
  },
  shareContainer: {
    borderWidth: 1,
    borderColor: "#D9D9D9",

    paddingVertical: 25,
  },
  shareIconContainer: {
    height: 53,
    width: 53,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#25B7D3",
  },
  linkContainer: {
    borderRadius: 5,

    backgroundColor: LightTheme.colors.green_6,
    paddingVertical: 2,
  },
  linkFontStyle: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    color: "#000000",
    textAlign: "center",
  },
  iconContainer: {
    paddingRight: 10,
  },
  physicalFontMatrailStyle: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
  },
});
