import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BookMark from "assets/icons/bookmark.svg";
import FilterIcon from "assets/icons/filter.svg";
import React, { useEffect, useState } from "react";
import { height, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import { images } from "../../constants/img";
import BackHeader from "components/BackHeader";
import global from "../../styles/global";
import NoBookMark from "assets/icons/bookwithoutmark.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Toys/slice";
import { actions as actionsCategory } from "../../Redux/Blog/slice";
import {
  selectAgeFilter,
  selectBookmark,
  selectCategory,
  selectCurrentPage,
  selectList,
  selectLoading,
  selectMeta,
  selectMoreLoading,
  selectRandomData,
  selectSearchText,
} from "../../Redux/Toys/selectors.";
import { selectCategoryList } from "../../Redux/Blog/selectors.";
import { AWS_PATH, PlAN_PATH } from "utils/constrats";
import { BookmarkEnum } from "../../Redux/Toys/types";
import { SCREENS } from "../../constants/var";
import { selectPlan } from "../../Redux/Auth/selector";
import Lock from "assets/svg/lock.svg";
import analytics from "@react-native-firebase/analytics";
import { renderEmpty } from "components/renderEmpty";
import { useFocusEffect } from "@react-navigation/native";
import { getMyStringValue } from "utils/local-storage";
const OverlayScreen = ({ visible, onClose, goBack }: any) => {
  const gobackFun = () => {
    goBack.navigation?.goBack();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={
        goBack.navigation.isFocused() ? (visible == 0 ? true : false) : false
      }
    >
      {/* <View style={[styles.overlay , {
        padding:30
      }]}> */}
      <View style={[global.wrap, styles.overlay, { padding: 30 }]}>
        <BackHeader
          iconStyle={{
            height: 50,
            width: 50,
            borderWidth: 1.5,
            borderColor: "#7fd4d3",
            borderRadius: 30,
            ...global.flexCenter,
            backgroundColor: "#fff",
          }}
          title={""}
          RightIcon={undefined}
          goback={gobackFun}
          rightIconOnPress={undefined}
          style={{
            top: Platform.OS == "ios" ? 50 : 0,
          }}
        />
        <View style={styles.overlayBoxContent}>
          <View>
            <Lock />
          </View>
        </View>
        <View
          style={[
            styles.overlayContent,
            {
              backgroundColor: "#7fd4d3",
              borderWidth: 3,
              borderColor: "#fff",
            },
          ]}
        >
          <TouchableOpacity onPress={onClose}>
            <Text
              style={[
                styles.closeButton,
                {
                  color: "#fff",
                  textAlign: "center",
                },
              ]}
            >
              {Platform.OS == "android"
                ? "Press to Upgrade"
                : "Not Supported get more info Press this button"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const Toys = (props: any) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const categoryList = useSelector(selectCategoryList);
  const loading = useSelector(selectLoading);
  const Data = useSelector(selectList);

  useEffect(() => {
    dispatch(
      actionsCategory.doGetCategoryList({
        callback() {
          dispatch(
            actions.doGetRandomList({
              callback() {
                dispatch(
                  actions.doGetList({
                    callback() {},
                  })
                );
              },
            })
          );
        },
      })
    );
    dispatch(
      actions.doGetToyCategoryList({
        callback() {},
      })
    );

    return () => {
      dispatch(actions.setLoading(true));
      dispatch(actions.setList([]));
      // dispatch(actions.setRandomData([]));
    };
  }, []);
  const category = useSelector(selectCategory);
  useEffect(() => {
    dispatch(
      actions.doGetRandomList({
        callback() {
          dispatch(
            actions.doGetList({
              callback() {},
            })
          );
        },
      })
    );

    return () => {
      dispatch(actions.setLoading(true));
      dispatch(actions.setList([]));
    };
  }, [category]);
  const doAddBookmark = async (id: string, bookmark: number, index: number) => {
    const indexData = Data.findIndex((x: any) => x._id === id);
    const indexDataRandom = randomData
      .filter((x) => x.id === category)[0]
      .item.findIndex((x) => x._id == id);
    if (indexData != -1) {
      dispatch(
        actions.doAddBookmarkManually({
          id: id,
          bookmark: bookmark == 1 ? 0 : 1,
          index: indexData,
        })
      );
    }

    if (indexDataRandom != -1) {
      dispatch(
        actions.doAddRandomBookmarkManual({
          bookmark: bookmark == 1 ? 0 : 1,
          index: indexDataRandom,
        })
      );
    }
    dispatch(
      actions.doAddBookmark({
        id: id,
        bookmark: bookmark == 1 ? 0 : 1,
        callback() {},
      })
    );

    await analytics().logEvent("toyBookmarked", {});
  };
  const openTab = async (url: any) => {
    await analytics().logEvent("toyPurchase", {});
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    }
  };

  const setCategory = (id: string) => {
    dispatch(actions.setLoading(true));
    // dispatch(actions.setRandomData([]));
    dispatch(actions.setList([]));
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setCategory(id));
  };
  const goOnFIlter = () => {
    props.navigation.navigate(SCREENS.TOY_FILTER);
  };
  const data = useSelector(selectAgeFilter);
  console.log(data, "data");

  const bookmark = useSelector(selectBookmark);
  const doFilterBookmark = (bookmark: number) => {
    setpageFind(bookmark);
    dispatch(actions.setLoading(true));
    dispatch(actions.setList([]));
    dispatch(actions.setCategory(""));
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setbookmark(bookmark));
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
  };
  const meta = useSelector(selectMeta);
  const moreLoading = useSelector(selectMoreLoading);

  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;

  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };
  const CanAccess: any = useSelector(selectPlan);
  const search = useSelector(selectSearchText);
  useEffect(() => {
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );

    return () => {};
  }, [currentPage]);
  useEffect(() => {
    dispatch(actions.setCurrentPage(1));
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    return () => {};
  }, [search]);
  const close = async () => {
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
  };
  useEffect(() => {
    console.log("CanAccess", CanAccess);

    return () => {};
  }, [CanAccess]);

  const returnVisible = () => {
    return CanAccess.toy;
  };
  const randomData = useSelector(selectRandomData);

  const renderRandom = () => {
    return randomData.findIndex((x) => x.id == category) !== -1
      ? randomData[randomData.findIndex((x) => x.id == category)].item
      : [];
  };
  useEffect(() => {
    console.log("category", randomData);

    return () => {};
  }, [randomData]);

  const [pageFind, setpageFind] = useState(0);
  const isSelectionModeEnabled = () => {
    return true; // Example implementation
  };
  const disableSelectionMode = () => {
    if (pageFind == 0) {
      props.navigation.goBack();
    }
    setpageFind(0);
    dispatch(actions.setRandomData([]));
    dispatch(actions.setList([]));
    dispatch(actions.setLoading(true));
    dispatch(actions.setCategory(""));
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setbookmark(0));
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSelectionModeEnabled()) {
          disableSelectionMode();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [isSelectionModeEnabled, disableSelectionMode])
  );
  console.log(pageFind, "pageFind");
  const goBack = () => {
    if (pageFind == 0) {
      props.navigation.goBack();
    }
    setpageFind(0);
    dispatch(actions.setList([]));
    dispatch(actions.setCategory(""));
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setbookmark(0));
    dispatch(actions.setLoading(true));
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={bookmark == BookmarkEnum.YES ? "Favorite Toys" : t("TOYS")}
          goback={goBack}
          titleStyle={{
            fontSize: 26,
          }}
          rightIconOnPress={() => doFilterBookmark(bookmark == 1 ? 0 : 1)}
          RightIcon={
            CanAccess.toy ? (
              bookmark == BookmarkEnum.YES ? (
                <BookMark />
              ) : (
                <NoBookMark />
              )
            ) : undefined
          }
        />
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />
        {categoryList.length !== 0 && (
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={goOnFIlter}
              style={{
                alignItems: "flex-start",
                marginHorizontal: 10,
                marginBottom: 15,
              }}
            >
              <FilterIcon />
            </TouchableOpacity>
            <FlatList
              data={[
                { _id: "", englishTitle: "All" },
                {
                  _id: "1",
                  englishTitle: "Trending",
                  colorCode: LightTheme.colors.green_6,
                },
                ...categoryList,
              ]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  onPress={() => {
                    setCategory(item?._id);
                    dispatch(actions.setList([]));
                  }}
                  style={{
                    paddingBottom: 20,
                    paddingTop: 20,
                    marginRight: 10,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <View
                      style={[
                        styles.eventBtnWrap,
                        {
                          backgroundColor: LightTheme.colors.white,
                          borderColor: item?.colorCode
                            ? item?.colorCode
                            : LightTheme.colors.black,
                        },
                      ]}
                    >
                      <View>
                        <Text
                          style={[
                            styles.eventBtnTxt,
                            {
                              color: item?.colorCode
                                ? item?.colorCode
                                : LightTheme.colors.black,
                            },
                          ]}
                        >
                          {item?.englishTitle}
                        </Text>
                      </View>
                    </View>
                    {category == item?._id && (
                      <View
                        style={[
                          styles.eventDotActive,
                          {
                            backgroundColor: item?.colorCode
                              ? item?.colorCode
                              : LightTheme.colors.black,
                          },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <TextInput
          textAlignVertical="center"
          style={[styles.input]}
          value={search}
          onChangeText={(text) => dispatch(actions.setSearch(text))}
          placeholder="Search"
          placeholderTextColor={LightTheme.colors.input_placeholder_color}
        />

        <>
          <FlatList
            data={
              search.length > 0 || bookmark == BookmarkEnum.YES
                ? Data
                : renderRandom().concat(Data)
            }
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10, height: "80%" }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginVertical: 5,
            }}
            renderItem={({ item, index }) => (
              <ImageBackground
                key={item?._id}
                style={[
                  styles.container,
                  styles.list,
                  {
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  },
                ]}
                source={images.TOYSREACT}
                resizeMode="stretch"
              >
                <TouchableOpacity
                  style={styles.cardWrap}
                  onPress={() => {
                    props.navigation.navigate(SCREENS.TOYDETAIL, {
                      id: item?._id,
                    });
                  }}
                >
                  <Image
                    source={{ uri: AWS_PATH + item?.image }}
                    style={styles.cardImg}
                  />
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item?.englishTitle}
                  </Text>
                  <Text style={styles.cardCaption} numberOfLines={2}>
                    {item?.englishDescription}
                  </Text>
                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => openTab(item?.productLink)}
                    >
                      <Text style={styles.btnTxt}>{t("EXPLORE.BUY_NOW")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bookMarkWrap}
                      onPress={() =>
                        doAddBookmark(item?._id, item?.bookmark, index)
                      }
                    >
                      {item?.bookmark == BookmarkEnum.YES ? (
                        <BookMark />
                      ) : (
                        <NoBookMark />
                      )}
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            )}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty(loading, "Data not available")}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        </>
        <OverlayScreen
          visible={returnVisible()}
          onClose={close}
          goBack={props}
        />
      </View>
    </SafeAreaView>
  );
};

export default Toys;

const styles = StyleSheet.create({
  cardWrap: {
    height: 230,
    width: width / 2 - 70,
  },
  cardImg: {
    width: "100%",
    height: 125,
  },
  cardInfo: {
    marginVertical: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
    marginTop: 8,
  },
  list: {
    padding: 5,
    marginBottom: 0,
    alignItems: "flex-start",
  },

  cardCaption: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
    // lineHeight: 15,
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,

    flex: 1,
  },
  btnTxt: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.white,
  },

  btn: {
    height: 32,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: LightTheme.colors.primary_btn,
  },

  input: {
    width: "100%",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 45,
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
  },
  container: {
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bookMarkWrap: {
    height: 35,
    width: 35,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  eventBtns: {
    // paddingHorizontal: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  eventBtnWrap: {
    width: "100%",
    paddingHorizontal: 25,
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
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
  },
  overlay: {
    height: height,
    paddingHorizontal: 30,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
  },
  overlayContent: {
    flex: 1,
    alignContent: "center",
    borderColor: LightTheme.colors.primary_btn,
    borderWidth: 2,
    backgroundColor: "white",
    position: "absolute",
    top: "80%",
    paddingVertical: 15,
    width: "80%",
    borderRadius: 50,
    alignItems: "center",
  },
  overlayBoxContent: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 150,
    alignItems: "center",
    height: 150,
    width: 150,
    top: "25%",
    borderWidth: 3,
    borderColor: "#7fd4d3",
  },
  overlayText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    color: LightTheme.colors.black,
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.bold,
  },
});
