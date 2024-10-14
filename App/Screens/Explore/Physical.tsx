import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import LinearGradient from "react-native-linear-gradient";
import { LightTheme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoader,
  selectLoadermilestone,
  selectMetaMilestone,
  selectMilestone,
  selectMilestoneCurrentPage,
  selectMilestoneMoreLoading,
} from "../../Redux/Milestone/selector";
import { AWS_PATH } from "utils/constrats";
import { actions } from "../../Redux/Milestone/slice";
import { SCREENS } from "../../constants/var";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { renderEmpty } from "components/renderEmpty";
const Physical = (props: any) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getMilestoneQuestion = (id: any) => {
    dispatch(actions.setCurrentPageMilestone(1));
    props.navigation.navigate(SCREENS.DEVELOPMENT_OF_SENSES, {
      id: id,
    });
  };
  const goBack = () => {
    props.navigation.goBack();
  };

  const onLoad = async () => {
    dispatch(actions.setLoadermilestone(true));
    dispatch(
      actions.doGetMilestoneList({
        id: props.route.params.id,
        callback() {},
      })
    );
  };

  const data: any = useSelector(selectMilestone);
  const { t } = useTranslation();
  const loader = useSelector(selectLoadermilestone);
  const meta = useSelector(selectMetaMilestone);
  const moreLoading = useSelector(selectMilestoneMoreLoading);

  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectMilestoneCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;
  useEffect(() => {
    if (isFocused) {
      onLoad();
    }

    return () => {};
  }, [currentPage, isFocused]);

  useEffect(() => {
    dispatch(actions.setCurrentPageMilestone(1));
    onLoad();

    return () => {
      dispatch(actions.resetMilestoneData());
    };
  }, [props.route.params.id]);

  useEffect(() => {
    return () => {
      dispatch(actions.resetMilestoneData());
    };
  }, []);

  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPageMilestone(currentPage + 1));
    }
  };
  const text = (text: any) => {
    const displayText = text.length > 20 ? text.substring(0, 22) + "..." : text;
    return displayText;
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={data?.category?.categoryEnglishTitle}
          titleStyle={{ fontSize: 27 }}
          goback={goBack}
          rightIconOnPress={undefined}
        />
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.data?.results ? data?.data?.results : []}
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 22,marginBottom:Platform.OS == "android" ? 10 : 50 }}
          renderItem={({ item, index }: any) => (
            <>
              {item?.question !== 0 && (
                <TouchableOpacity
                  onPress={() => getMilestoneQuestion(item?._id)}
                >
                  <View style={{ width: "100%" }}>
                    <ImageBackground
                      style={styles.activityImg}
                      source={
                        item?.image.length > 0
                          ? { uri: AWS_PATH + item?.image }
                          : images.BABY
                      }
                      key={index}
                    >
                      <LinearGradient
                        colors={["transparent", LightTheme.colors.img_bg_1]}
                        locations={[0.7, 1]}
                        style={styles.imgLayer}
                      >
                        <Text style={styles.imgTopText} lineBreakMode="middle">
                          {item?.englishTitle}{" "}
                          {`(${item?.answer}/${item?.question})`}{" "}
                        </Text>
                        <AnimatedCircularProgress
                          size={30}
                          width={5}
                          fill={100}
                          tintColor="#ffff"
                          backgroundColor="#3d5875"
                          padding={0}
                          arcSweepAngle={
                            (Number(
                              ((item?.answer * 100) / item?.question).toFixed(0)
                            ) /
                              100) *
                            360
                          }
                        />
                      </LinearGradient>
                    </ImageBackground>
                    {Number.isNaN(
                      parseInt(
                        ((item?.answer * 100) / item?.question).toFixed(0)
                      )
                    ) && (
                      <TouchableOpacity
                        style={[
                          styles.eventBtnWrap,
                          {
                            backgroundColor: LightTheme.colors.light_red,
                            borderColor: LightTheme.colors.red_2,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.eventBtnTxt,
                            {
                              color: LightTheme.colors.red_2,
                            },
                          ]}
                        >
                          {t("OTHER.NOT_STARTED")}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {parseInt(
                      ((item?.answer * 100) / item?.question).toFixed(0)
                    ) < 20 && (
                      <TouchableOpacity
                        style={[
                          styles.eventBtnWrap,
                          {
                            backgroundColor: LightTheme.colors.yellow_2,
                            borderColor: LightTheme.colors.yellow_primary,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.eventBtnTxt,
                            {
                              color: LightTheme.colors.yellow_primary,
                            },
                          ]}
                        >
                          {t("OTHER.PENDING")}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {parseInt(
                      ((item?.answer * 100) / item?.question).toFixed(0)
                    ) > 20 &&
                      parseInt(
                        ((item?.answer * 100) / item?.question).toFixed(0)
                      ) < 100 && (
                        <TouchableOpacity
                          style={[
                            styles.eventBtnWrap,
                            {
                              backgroundColor: LightTheme.colors.orange_2,
                              borderColor: LightTheme.colors.orange_1,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.eventBtnTxt,
                              {
                                color: LightTheme.colors.orange_1,
                              },
                            ]}
                          >
                            {t("OTHER.IN_PROGRESS")}
                          </Text>
                        </TouchableOpacity>
                      )}
                    {parseInt(
                      ((item?.answer * 100) / item?.question).toFixed(0)
                    ) == 100 && (
                      <TouchableOpacity
                        style={[
                          styles.eventBtnWrap,
                          {
                            backgroundColor: LightTheme.colors.green_4,
                            borderColor: LightTheme.colors.green_7,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.eventBtnTxt,
                            {
                              color: LightTheme.colors.green_7,
                            },
                          ]}
                        >
                          {t("OTHER.COMPLETED")}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty(loader, "Data not available")}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        />
      </View>
    </SafeAreaView>
  );
};

export default Physical;

const styles = StyleSheet.create({
  activityImg: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
  },
  imgLayer: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
    borderRadius: 16,
    flex: 1,
    flexDirection: "row",
  },

  imgTopText: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.white,
    lineHeight: 21,
  },
  imgText: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor3,
    marginTop: 8,
    marginLeft: 2,
  },
  eventBtnWrap: {
    width: 107,
    height: 40,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
    marginVertical: 20,
  },
  eventBtnTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
  },
});
