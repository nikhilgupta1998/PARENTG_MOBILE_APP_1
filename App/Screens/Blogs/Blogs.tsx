import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
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
import React, { useEffect, useState } from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import BookMark from "assets/icons/bookmark.svg";
import NoBookMark from "assets/icons/bookwithoutmark.svg";
import { height, hp } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Blog/slice";
import {
  selectBookmark,
  selectCategory,
  selectCategoryList,
  selectCurrentPage,
  selectList,
  selectLoading,
  selectMeta,
  selectMoreLoading,
  selectRandomData,
  selectSearchText,
} from "../../Redux/Blog/selectors.";
import { SCREENS } from "../../constants/var";
import { BlogBookmarkEnum } from "../../Redux/Blog/types";
import { AWS_PATH, PlAN_PATH } from "utils/constrats";
import { selectPlan } from "../../Redux/Auth/selector";
import Lock from "assets/svg/lock.svg";
import { renderEmpty } from "components/renderEmpty";
import { useFocusEffect } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";
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
const Blogs = (props: any) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const categoryList = useSelector(selectCategoryList);
  const loading = useSelector(selectLoading);
  const meta = useSelector(selectMeta);
  const currentPage = useSelector(selectCurrentPage);

  const moreLoading = useSelector(selectMoreLoading);
  const Data = useSelector(selectList);

  const doBlogDetails = async (id: string) => {
    dispatch(
      actions.doGetDetails({
        id: id,
        callback() {
          props.navigation.navigate(SCREENS.BLOG_DETAIL_SCREEN);
        },
      })
    );
    await analytics().logEvent("blogDetailRetrieved", {});
  };
  const category = useSelector(selectCategory);
  const bookmark = useSelector(selectBookmark);

  const doFilterBookmark = (bookmark: number) => {
    setpageFind(bookmark);
    dispatch(actions.setList([]));
    dispatch(actions.setLoading(true));
    dispatch(actions.setCategory(""));
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setbookmark(bookmark));
  };
  useEffect(() => {
    dispatch(
      actions.doGetCategoryList({
        callback() {},
      })
    );

    return () => {
      dispatch(actions.setSearch(""));
    };
  }, []);

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

    return () => {};
  }, [category]);

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

    return () => {};
  }, []);

  useEffect(() => {
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );

    return () => {};
  }, [currentPage]);

  useEffect(() => {
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    return () => {};
  }, [bookmark]);

  const doAdd = (id: string, bookmark: number, index: number) => {
    const indexData = Data.findIndex((x: any) => x._id === id);
    const indexDataRandom = randomData
      .filter((x) => x.id === category)[0]
      .item.findIndex((x) => x._id == id);
    dispatch(actions.setCategory(""));

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
    if (indexDataRandom !== -1) {
      dispatch(
        actions.setDoBookmarkRandom({
          bookmark: toggleBookmark(bookmark),
          index,
        })
      );
    }
  };
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
  };

  const hasMoreItems = currentPage < meta.totalPages;
  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );

  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };
  const search = useSelector(selectSearchText);
  const CanAccess: any = useSelector(selectPlan);
  const randomData = useSelector(selectRandomData);
  useEffect(() => {
    dispatch(actions.setCurrentPage(1));
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    return () => {};
  }, [search]);
  useEffect(() => {
    return () => {
      dispatch(actions.setLoading(true));
      dispatch(actions.setCurrentPage(1));
      dispatch(actions.setSearch(""));
      dispatch(actions.setList([]));
    };
  }, []);
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

  const returnVisible = () => {
    return CanAccess.blogs;
  };

  const renderRandom = () => {
    return randomData.findIndex((x) => x.id == category) !== -1
      ? randomData[randomData.findIndex((x) => x.id == category)].item
      : [];
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={
            bookmark == BlogBookmarkEnum.YES
              ? "Favorite Blogs"
              : t("EXPLORE.BLOGS")
          }
          titleStyle={{ fontSize: 27 }}
          goback={goBack}
          RightIcon={
            bookmark == BlogBookmarkEnum.YES ? <BookMark /> : <NoBookMark />
          }
          rightIconOnPress={() => {
            doFilterBookmark(bookmark == 1 ? 0 : 1);
          }}
        />

        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />

        <>
          <TextInput
            textAlignVertical="center"
            style={[styles.input]}
            value={search}
            onChangeText={(text: any) => dispatch(actions.setSearch(text))}
            placeholder="Search"
            placeholderTextColor={LightTheme.colors.input_placeholder_color}
          />
          <FlatList
            data={[
              { _id: "", englishTitle: "All", colorCode: "black" },
              ...categoryList,
            ]}
            keyExtractor={(item, index) => item._id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginTop: 0,
            }}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(actions.setList([]));
                  dispatch(actions.setLoading(true));
                  dispatch(actions.setCurrentPage(1));
                  dispatch(actions.setCategory(item?._id));
                }}
                style={{
                  paddingBottom: 20,
                  paddingTop: 20,
                  marginRight: 10,
                  marginBottom: 20,
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
                          : LightTheme.colors.green_6,
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
                              : LightTheme.colors.green_6,
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
                            : LightTheme.colors.green_6,
                        },
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, marginTop: 10 }}
            data={
              search.length > 0 || bookmark == BlogBookmarkEnum.YES
                ? Data
                : renderRandom().concat(Data)
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ marginBottom: 20 }}>
                <TouchableOpacity onPress={() => doBlogDetails(item?._id)}>
                  <Image
                    source={{ uri: AWS_PATH + item?.image }}
                    style={styles.mealPic}
                  />
                  {/* <CachedImage
                    source={`${AWS_PATH}${item?.image}`} // Pass the URI directly as a string
                    style={styles.mealPic}
                    thumbnailSource="https://via.placeholder.com/350x150"
                  /> */}
                </TouchableOpacity>
                <View style={styles.postWrap}>
                  <View
                    style={[
                      styles.postWrap,
                      {
                        width: "95%",
                        flexDirection: "column",
                        padding: 0,
                        paddingHorizontal: 0,
                        marginTop: 0,
                      },
                    ]}
                  >
                    <Text style={styles.postInfo} numberOfLines={2}>
                      {item?.englishTitle}
                    </Text>
                    <Text style={styles.postCaption} numberOfLines={3}>
                      {item?.englishShortDescription}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => doAdd(item?._id, item?.bookmark, index)}
                    style={{ marginTop: 6 }}
                  >
                    {item?.bookmark == BlogBookmarkEnum.YES ? (
                      <BookMark />
                    ) : (
                      <NoBookMark />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
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

export default Blogs;

const styles = StyleSheet.create({
  mealTypeTxt: {
    fontSize: 9,
    fontFamily: LightTheme.fontFamily.semiBold,
    marginTop: 5,
    color: LightTheme.colors.headerTextColor_2,
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
  mealPic: {
    width: "100%",
    height: hp(23),
    borderRadius: 12,
  },

  postWrap: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginVertical: 12,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  postInfo: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
    // marginLeft: 8,
    width: "90%",
    // marginRight: 10,
  },
  input: {
    width: "100%",
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
  postCaption: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor1,
    lineHeight: 18,
  },
  filterWrap: {
    width: "105%",
    height: 48,
    paddingHorizontal: 15,
    paddingTop: 4,
  },

  filterValue: {
    fontFamily: LightTheme.fontFamily.medium,
    fontSize: 14,
    flexWrap: "wrap",
    color: LightTheme.colors.headerTextColor_2,
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
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
