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
import { images } from "../../constants/img";
import BackHeader from "components/BackHeader";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import PendingCheck from "assets/icons/pending_check.svg";
import Check from "assets/icons/mark-enable.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Milestone/slice";
import analytics from "@react-native-firebase/analytics";
import {
  selectLoaderQuestion,
  selectMetaQuestion,
  selectQuestion,
  selectQuestionCurrentPage,
  selectQuestionMoreLoading,
} from "../../Redux/Milestone/selector";
import { renderEmpty } from "components/renderEmpty";
const DevelopmentOFSenses = (props: any) => {
  const { t } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  };

  const onLoad = async () => {
    dispatch(actions.setLoaderQuestion(true));
    dispatch(
      actions.doGetMilestoneQuestionList({
        id: props.route.params.id,
        callback() {},
      })
    );
  };
  const data: any = useSelector(selectQuestion);
  const dispatch = useDispatch();
  const docompleteQuestion = async (
    index: number,
    id: any,
    isActive: any,
    milestoneId: any,
    categoryId: any,
    status: number
  ) => {
    dispatch(
      actions.setQuestionComplete({
        index: index,
        status: status,
      })
    );
    dispatch(
      actions.doCompleteQuestion({
        id: id,
        callback() {},
      })
    );
    await analytics().logEvent("questionCompleted", {});
  };
  const loader = useSelector(selectLoaderQuestion);
  const meta = useSelector(selectMetaQuestion);
  const moreLoading = useSelector(selectQuestionMoreLoading);
  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectQuestionCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;
  useEffect(() => {
    if (currentPage >= 2) {
      onLoad();
    }
    return () => {};
  }, [currentPage]);

  useEffect(() => {
    if (props.route.params.id.length > 0) {
      onLoad();
    }
    return () => {
      dispatch(actions.resetQuestionData());
    };
  }, [props.route.params.id]);
  useEffect(() => {
    return () => {
      dispatch(actions.resetQuestionData());
    };
  }, []);

  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPageQuestion(currentPage + 1));
    }
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={data?.milestone?.milestoneEnglishTitle}
          titleStyle={{ fontSize: 18 }}
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
          data={data?.data?.results ? data?.data?.results : []}
          style={{ marginTop: 20 ,marginBottom:Platform.OS == "android" ? 0 : 70 }}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ImageBackground
              style={[
                styles.container,
                styles.list,
                {
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingBottom: 20,
                },
              ]}
              source={images.QUESTIONRECT}
              resizeMode="stretch"
            >
              <View style={styles.item1}>
                <Text style={styles.item1Txt}>{item?.englishDescription}</Text>

                {item?.answer == 0 ? (
                  <TouchableOpacity
                    onPress={() =>
                      docompleteQuestion(
                        index,
                        item?._id,
                        item?.isActive,
                        item?.milestoneId,
                        item?.categoryId,
                        1
                      )
                    }
                  >
                    <PendingCheck />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      docompleteQuestion(
                        index,
                        item?._id,
                        item?.isActive,
                        item?.milestoneId,
                        item?.categoryId,
                        0
                      )
                    }
                  >
                    <Check />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.item2Txt}>
                {t("OTHER.USUALLY_ACHIEVED_BY")}: {item?.minAge}-{item?.maxAge}{" "}
                {t("OTHER.MONTHS")}
              </Text>
            </ImageBackground>
          )}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty(loader, "Data not available")}
          onEndReachedThreshold={0.1}
          onEndReached={fetchMoreData}
        />
      </View>
    </SafeAreaView>
  );
};

export default DevelopmentOFSenses;

const styles = StyleSheet.create({
  list: {
    padding: 15,
    marginBottom: 15,
    alignItems: "flex-start",
  },

  item1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  item1Txt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    width: "70%",
  },
  item2: {
    height: 36,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: LightTheme.colors.primary_btn,
    borderRadius: 8,
  },
  item2Txt: {
    fontSize: 9,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.primary_btn,
    backgroundColor: "#e5f6f6",
    padding: 8,
    borderRadius: 8,
  },
});
