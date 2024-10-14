import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import YouTube from "react-native-youtube";
import React, { useEffect } from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { hp, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import RenderHtml from "react-native-render-html";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Meals/slice";
import {
  selectLoading,
  selectMealsFunFoodDetails,
} from "../../Redux/Meals/selectors.";
import { AWS_PATH } from "utils/constrats";
import { SCREENS } from "../../constants/var";
import Video from "../../components/VideoComponent";
import { TypeEnum } from "../../Redux/Meals/types";
import { images } from "../../constants/img";
import YoutubeVideo from "./Video";

const Recepies = (props: any) => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.route.params.id) {
      dispatch(
        actions.doGetFunFoodDetails({
          id: props.route.params.id,
          callback() {},
        })
      );
    }

    return () => {
      dispatch(actions.resetData());
    };
  }, [props.route.params.id]);
  const data: any = useSelector(selectMealsFunFoodDetails);
  const { t } = useTranslation();
  const GOBack = () => {
    props.navigation.goBack();
    dispatch(actions.resetData());
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };
  // console.log("data", data);

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("MEALSOBJ.RECIPES")}
          titleStyle={{ fontSize: 27 }}
          RightIcon={undefined}
          goback={GOBack}
          rightIconOnPress={undefined}
        />
        {data?.englishName ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ marginBottom: 50 }}>
              <View style={{ marginTop: 20 }}>
                {data?.englishVideo ? (
                  <Video
                    poster={AWS_PATH + data?.image}
                    source={{ uri: AWS_PATH + data?.englishVideo }}
                    top={-96}
                    left={-30}
                  />
                ) : (
                  <Image
                    source={{ uri: AWS_PATH + data?.image }}
                    style={styles.mealPic}
                    // resizeMode="contain"
                  />
                )}

                <View
                  style={[
                    styles.mealNameWrap,
                    {
                      flex: 1,
                    },
                  ]}
                >
                  <Text style={[styles.mealName, { paddingRight: 5, flex: 6 }]}>
                    {capitalizeFirstLetter(data?.englishName)}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: LightTheme.colors.black,
                    fontFamily: LightTheme.fontFamily.semiBold,
                  }}
                >
                  Ingredients
                </Text>
                <FlatList
                  data={data?.ingredientData}
                  contentContainerStyle={{
                    paddingLeft: 20,
                  }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexGrow: 0, marginTop: 15 }}
                  horizontal
                  renderItem={({ item, index }: any) => (
                    <View
                      style={{
                        marginHorizontal: 5,
                        alignItems: "center",
                      }}
                    >
                      {item.image ? (
                        <Image
                          source={{ uri: AWS_PATH + item.image }}
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 50,
                          }}
                        />
                      ) : (
                        <Image
                          source={images.MEAL}
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 50,
                          }}
                        />
                      )}

                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 10,
                          flexWrap: "wrap",
                          color: LightTheme.colors.black,
                          fontFamily: LightTheme.fontFamily.semiBold,
                        }}
                      >
                        {item.englishTitle}
                      </Text>
                    </View>
                  )}
                />
              </View>
              <View style={{ marginVertical: 4 }}>
                <Text
                  style={{
                    color: LightTheme.colors.black,
                    fontFamily: LightTheme.fontFamily.bold,
                  }}
                >
                  Steps
                </Text>
                <Text style={{ color: "#737373", lineHeight: 20 }}>
                  {data?.englishDescription}
                </Text>
              </View>
              {data?.youTubeLink && data?.youTubeLink?.length > 0 && (
                <View style={{ marginTop: 20, borderTopWidth: 1 }}>
                  <Text
                    style={{
                      color: LightTheme.colors.black,
                      fontFamily: LightTheme.fontFamily.bold,
                    }}
                  >
                    Popular Recipes on You Tube
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <YoutubeVideo videoUrl={data?.youTubeLink} />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/img/loader.gif")}
               resizeMode="contain"
              style={{
                width: 130,
                height: 130,
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Recepies;

const styles = StyleSheet.create({
  calender: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    // backgroundColor:"red"
  },
  calenderWrap: {
    width: "100%",
    alignItems: "center",
    marginVertical: 25,
  },
  monthWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  monthText: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    lineHeight: 21,
    color: LightTheme.colors.primary_btn,
    marginHorizontal: 8,
  },
  dayText: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 14,
    color: LightTheme.colors.black,
    // marginBottom: 5,
  },
  daystrText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 21,
    color: LightTheme.colors.black,
  },
  dayWrap: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
    ...global.flexCenter,
    marginRight: 10,
  },
  eventBtns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: hp(3),
  },
  eventBtnWrap: {
    width: 107,
    height: 40,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
  },
  eventBtnTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
  },

  mealTypesWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
  },

  mealType: {},
  mealTypeTxt: {
    fontSize: 9,
    fontFamily: LightTheme.fontFamily.semiBold,
    marginTop: 5,
    color: LightTheme.colors.headerTextColor_2,
  },

  mealPic: {
    width: "100%",
    height: hp(23),
    borderRadius: 12,
  },

  mealNameWrap: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  mealName: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
  },

  mealStep: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
  },
  mealStep1: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
  },
  mealStepItem: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    marginBottom: 8,
  },
  box: {
    flex: 1, // Each box takes equal space
    backgroundColor: LightTheme.colors.green_6,
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  title: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.bold,
    color: LightTheme.colors.white,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.white,
  },
  container: {
    flexDirection: "row", // Arrange boxes horizontally
    justifyContent: "space-around", // Space evenly between boxes
    alignItems: "center", // Center items verticall // Background color of container
    padding: 10,
  },
});
