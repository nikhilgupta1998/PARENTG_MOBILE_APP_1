import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import analytics from "@react-native-firebase/analytics";
import React, { useEffect } from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import Cook from "assets/icons/cook.svg";
import { height, hp, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Meals/slice";
import {
  selectCurrentPage,
  selectFunFoodMealsList,
  selectMeta,
  selectMoreLoading,
  selectRandomData,
  selectSearchText,
  selectFilterFoodType,
  selectFuFoodMealLoader,
} from "../../Redux/Meals/selectors.";
import { AWS_PATH } from "utils/constrats";
import { SCREENS } from "../../constants/var";
import { TypeEnum } from "../../Redux/Meals/types";
import { useFocusEffect } from "@react-navigation/native";
import { renderEmpty } from "components/renderEmpty";
const FunFoods = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => {
        unsubscribe;
        dispatch(actions.resetData());
      };
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetRandomList({
        callback() {
          dispatch(
            actions.doGetFunFoodList({
              callback() {},
            })
          );
        },
      })
    );
  };
  const filter = useSelector(selectFilterFoodType);
  const data = useSelector(selectFunFoodMealsList);
  const gotoDetailPage = (id: any) => {
    props.navigation.navigate(SCREENS.MEAL_FUN_FOOD_DETAILS, {
      id: id,
    });
  };
  const chooseMealType = async (type: any) => {
    await analytics().logEvent("mealLikeAction", {
      mealIdType: type,
    });
    dispatch(actions.setFunFoodMealsList([]));
    dispatch(actions.setRandomData([]));
    dispatch(actions.setFuFoodMealLoader(true));
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.filterFoodTypeValue(type));
  };
  useEffect(() => {
    dispatch(
      actions.doGetRandomList({
        callback() {
          dispatch(
            actions.doGetFunFoodList({
              callback() {},
            })
          );
        },
      })
    );
    return () => {};
  }, [filter]);
  const GOBack = () => {
    dispatch(actions.setSearch(""));
    props.navigation.goBack();
  };
  const FilterForChef = () => {
    dispatch(actions.setSearch(""));
    props.navigation.navigate(SCREENS.MEAL_LIST);
  };
  const meta = useSelector(selectMeta);
  console.log(meta, "meta");

  const moreLoading = useSelector(selectMoreLoading);
  const loading = useSelector(selectFuFoodMealLoader);
  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectCurrentPage);
  const hasMoreItems = meta?.totalPages > currentPage;
  useEffect(() => {
    dispatch(
      actions.doGetFunFoodList({
        callback() {},
      })
    );
    return () => {};
  }, [currentPage]);

  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };
  const search = useSelector(selectSearchText);
  const capitalizeFirstLetter = (str: string): string => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };
  useEffect(() => {
    dispatch(actions.setFunFoodMealsList([]));
    dispatch(actions.setFuFoodMealLoader(true));
    dispatch(actions.setCurrentPage(1));
    dispatch(
      actions.doGetFunFoodList({
        callback() {},
      })
    );
    return () => {};
  }, [search]);
  const randomData = useSelector(selectRandomData);
  const renderRandom = () => {
    return randomData.findIndex((x) => x.id == filter.toString()) !== -1
      ? randomData[randomData.findIndex((x) => x.id == filter.toString())].item
      : [];
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={"Fun Food"}
          titleStyle={{ fontSize: 27 }}
          RightIcon={<Cook />}
          goback={GOBack}
          rightIconOnPress={() => FilterForChef()}
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
        <View style={[styles.eventBtns]}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[
                styles.eventBtnWrap,
                {
                  backgroundColor: LightTheme.colors.green_4,
                  borderColor: LightTheme.colors.green_3,
                },
              ]}
              onPress={() => chooseMealType(TypeEnum.VEG)}
            >
              <Text
                style={[
                  styles.eventBtnTxt,
                  {
                    color: LightTheme.colors.green_3,
                  },
                ]}
              >
                {t("MEALSOBJ.VEG")}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.eventDotActive,
                filter == TypeEnum.VEG && {
                  backgroundColor: LightTheme.colors.green_3,
                  borderColor: LightTheme.colors.green_3,
                  borderRadius: 50,
                },
              ]}
            ></View>
          </View>
          <View style={{ alignItems: "center", marginHorizontal: 7 }}>
            <TouchableOpacity
              style={[
                styles.eventBtnWrap,
                {
                  backgroundColor: LightTheme.colors.light_red,
                  borderColor: LightTheme.colors.red_2,
                },
              ]}
              onPress={() => chooseMealType(TypeEnum.NONVEG)}
            >
              <Text
                style={[
                  styles.eventBtnTxt,
                  {
                    color: LightTheme.colors.red_2,
                  },
                ]}
              >
                {t("MEALSOBJ.NON_VEG")}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.eventDotActive,
                filter == TypeEnum.NONVEG && {
                  backgroundColor: LightTheme.colors.red_2,
                  borderColor: LightTheme.colors.red_2,
                  borderRadius: 50,
                },
              ]}
            ></View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[
                styles.eventBtnWrap,
                {
                  backgroundColor: LightTheme.colors.yellow_2,
                  borderColor: LightTheme.colors.yellow_primary,
                },
              ]}
              onPress={() => chooseMealType(TypeEnum.EGG)}
            >
              <Text
                style={[
                  styles.eventBtnTxt,
                  {
                    color: LightTheme.colors.yellow_primary,
                  },
                ]}
              >
                {t("MEALSOBJ.EGG_MEALS")}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.eventDotActive,
                filter == TypeEnum.EGG && {
                  backgroundColor: LightTheme.colors.yellow_primary,
                  borderColor: LightTheme.colors.yellow_primary,
                  borderRadius: 50,
                },
              ]}
            ></View>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          data={search.length > 0 ? data : renderRandom().concat(data)}
          style={{
            marginBottom: Platform.OS == "android" ? 0 : 50,
          }}
          renderItem={({ item, index }: any) => (
            <TouchableOpacity onPress={() => gotoDetailPage(item?._id)}>
              <View style={{ marginTop: 20 }}>
                <Image
                  source={{ uri: AWS_PATH + item?.image }}
                  style={styles.mealPic}
                  // resizeMode="contain"
                />
                <View style={styles.mealNameWrap}>
                  <Text style={styles.mealName} numberOfLines={2}>
                    {capitalizeFirstLetter(item?.englishName)}
                  </Text>
                </View>
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
      </View>
    </SafeAreaView>
  );
};

export default FunFoods;

const styles = StyleSheet.create({
  calender: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    // backgroundColor:"red"
  },
  dayTextSelected: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.semiBold,
    lineHeight: 14,
    color: LightTheme.colors.white,
    // marginBottom: 5,
  },
  input: {
    width: "100%",
    // marginBottom: 10,
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
    marginTop: 5,
  },

  mealName: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
  },
  eventBtns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(3),
  },
  eventBtnWrap: {
    width: 100,
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
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.semiBold,
  },
});
