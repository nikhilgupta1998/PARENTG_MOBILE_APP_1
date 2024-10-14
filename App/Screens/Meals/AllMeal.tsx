import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import analytics from "@react-native-firebase/analytics";
import SwipeButton from "rn-swipe-button";
import React, { useEffect, useState } from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { height, hp, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Meals/slice";
import {
  selectAllMealsCurrentPage,
  selectAllMealList,
  selectLoading,
  selectAllMealsMeta,
  selectAllMealsMoreLoading,
  selectSearchText,
  selectPremiumMealLoader,
} from "../../Redux/Meals/selectors.";
import { AWS_PATH, PlAN_PATH } from "utils/constrats";
import { SCREENS } from "../../constants/var";
import { useFocusEffect } from "@react-navigation/native";
import { renderEmpty } from "components/renderEmpty";
import { selectPlan } from "../../Redux/Auth/selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getMyStringValue } from "utils/local-storage";
const MealPlanner = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => {
        unsubscribe;
      };
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetALlMealList({
        mealType: props.route.params.mealType,
        type: props.route.params.type,
        bookMark: bookmark,
        callback() {},
      })
    );
  };
  const data = useSelector(selectAllMealList);
  const loading = useSelector(selectPremiumMealLoader);
  const gotoDetailPage = (id: any) => {
    props.navigation.navigate(SCREENS.MEAL_DETAILS, {
      id: id,
    });
  };
  const GOBack = () => {
    dispatch(actions.setSearch(""));
    props.navigation.goBack();
  };
  const [bookmark, setBookmark] = useState(false);
  const capitalizeFirstLetter = (str: string): string => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };
  const meta = useSelector(selectAllMealsMeta);
  const moreLoading = useSelector(selectAllMealsMoreLoading);

  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectAllMealsCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;
  useEffect(() => {
    if (currentPage >= 2) {
      dispatch(
        actions.doGetALlMealList({
          mealType: props.route.params.mealType,
          type: props.route.params.type,
          bookMark: bookmark,
          callback() {},
        })
      );
    }
    return () => {};
  }, [currentPage]);
  useEffect(() => {
    return () => {
      dispatch(actions.resetData());
    };
  }, []);
  const search = useSelector(selectSearchText);
  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setAllMealsCurrentPage(currentPage + 1));
    }
  };
  useEffect(() => {
    // dispatch(actions.setPremiumMealLoader(true));
    dispatch(actions.setAllMealList([]));
    dispatch(actions.setAllMealsCurrentPage(1));
    dispatch(
      actions.doGetALlMealList({
        mealType: props.route.params.mealType,
        type: props.route.params.type,
        bookMark: bookmark,
        callback() {},
      })
    );
    return () => {};
  }, [search, bookmark]);

  const CanAccess: any = useSelector(selectPlan);
  let forceResetLastButton: any = null;
  const updateSwipeStatusMessage = async () => {
    if (Platform.OS == "android") {
      props.navigation.navigate(SCREENS.PLAN);
    } else {
      let token = await getMyStringValue("@token");
      const url = `${PlAN_PATH}?token=${token}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }

    forceResetLastButton && forceResetLastButton();
  };
  const doAdd = async (id: string, bookmark: number, index: number) => {
    const indexData = data.findIndex((x: any) => x._id === id);
    const toggleBookmark = (bookmark: number) => (bookmark === 1 ? 0 : 1);
    dispatch(
      actions.doAddBookmark({
        id,
        bookmark: toggleBookmark(bookmark),
        callback: () => {},
      })
    );

    if (indexData !== -1) {
      dispatch(
        actions.setDoBookmark({ bookmark: toggleBookmark(bookmark), index })
      );
    }
    await analytics().logEvent("mealLikeAction", {
      mealId: id,
    });
  };

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={"All Meal"}
          titleStyle={{ fontSize: 27 }}
          RightIcon={<Ionicons name={"heart"} size={24} color={"#7fd4d3"} />}
          goback={GOBack}
          rightIconOnPress={() => setBookmark(!bookmark)}
        />
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />
        <TextInput
          textAlignVertical="center"
          style={[styles.input]}
          value={search}
          onChangeText={(text) => dispatch(actions.setSearch(text))}
          placeholder="Search"
          placeholderTextColor={LightTheme.colors.input_placeholder_color}
        />
        {CanAccess.isDefault == 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ paddingBottom: 40, marginTop: 10, height: "50%" }}
            data={data}
            renderItem={({ item, index }: any) => (
              <TouchableOpacity onPress={() => gotoDetailPage(item?._id)}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: LightTheme.colors.border,
                  }}
                >
                  <Image
                    source={{ uri: AWS_PATH + item?.image }} // Replace with your image URL
                    style={styles.image}
                  />
                  <Text style={styles.mealName}>
                    {capitalizeFirstLetter(item?.englishName)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => doAdd(item?._id, item?.bookmark, index)}
                    style={styles.favoriteButton}
                  >
                    <Ionicons
                      name={item?.bookmark ? "heart" : "heart-outline"}
                      size={24}
                      color={item?.bookmark ? "#7fd4d3" : "black"}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty(
              loading,
              "Upcoming recipes on the way"
            )}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        ) : (
          <View>
            <Text
              style={{
                color: LightTheme.colors.black,
                textAlign: "center",
                fontSize: 17,
                fontFamily: LightTheme.fontFamily.semiBold,
                marginTop: height / 4,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Subscribe For more Meal
            </Text>
            <View
              style={{
                // position: "absolute",
                top: height / 3,
              }}
            >
              <View
                style={{
                  backgroundColor: "#00c4c1",
                  borderRadius: 50,
                }}
              >
                <SwipeButton
                  railBackgroundColor="#00c4c1"
                  railStyles={{
                    backgroundColor: "#00c4c1",
                    borderColor: "#00c4c1",
                  }}
                  containerStyles={{
                    borderWidth: 0,
                    borderTopColor: "#00c4c1",
                    borderLeftColor: "#00c4c1",
                    borderColor: "#00c4c1",
                    borderEndColor: "#00c4c1",
                    borderStartColor: "#00c4c1",
                    borderBottomColor: "#00c4c1",
                    borderRightColor: "#00c4c1",
                  }}
                  height={40}
                  thumbIconBorderColor="#FFFFFF"
                  thumbIconBackgroundColor="#FFFFFF"
                  title={` ${
                    Platform.OS == "android"
                      ? "Subscribe For more Meal"
                      : "Not Supported get more info please swipe"
                  }`}
                  titleColor="#FFFFFF"
                  titleStyles={{
                    fontFamily: LightTheme.fontFamily.semiBold,
                    fontSize: 15,
                  }}
                  forceReset={(reset: any) => {
                    forceResetLastButton = reset;
                  }}
                  onSwipeSuccess={() => updateSwipeStatusMessage()}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MealPlanner;

const styles = StyleSheet.create({
  calender: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    // backgroundColor:"red"
  },
  btnTxt: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.white,
  },
  container: {
    flex: 1,
  },
  image: {
    resizeMode: "cover",
    width: "25%",
    height: hp(10),
    borderRadius: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  btn: {
    height: 32,
    width: "auto",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: LightTheme.colors.primary_btn,
  },
  dayTextSelected: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 14,
    color: LightTheme.colors.white,
    // marginBottom: 5,
  },
  daystrTextSelected: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 21,
    color: LightTheme.colors.white,
  },
  dayWrapSelected: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: LightTheme.colors.white,
    backgroundColor: LightTheme.colors.primary_btn,
    ...global.flexCenter,
    marginRight: 10,
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
    // paddingHorizontal: 30,
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
    // marginTop: hp(3),
  },
  eventBtnWrap: {
    width: 107,
    height: 40,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
  },
  eventDotActive: {
    marginTop: 8,
    height: 10,
    width: 10,
    borderRadius: 50,
  },
  eventBtnTxt: {
    fontSize: 11,
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
    width: "25%",
    height: hp(10),
    borderRadius: 12,
  },

  mealNameWrap: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  mealName: {
    maxWidth: "55%",
    flexWrap: "wrap",
    marginLeft: 10,
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 45,
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
  },
});
