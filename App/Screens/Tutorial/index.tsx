import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selecList,
  selectCurrentPage,
  selectLoading,
  selectMeta,
  selectMoreLoading,
} from "../../Redux/Faq/selectors.";
import { actions } from "../../Redux/Faq/slice";
import { SCREENS } from "../../constants/var";
import { useIsFocused } from "@react-navigation/native";
import { renderEmpty } from "components/renderEmpty";
import YoutubeVideo from "../Meals/Video";
const index = (props: any) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getMilestoneQuestion = (id: any) => {
    dispatch(actions.setCurrentPage(1));
    props.navigation.navigate(SCREENS.DEVELOPMENT_OF_SENSES, {
      id: id,
    });
  };
  const goBack = () => {
    props.navigation.goBack();
  };

  const onLoad = async () => {
    dispatch(actions.setLoading(true));
    dispatch(actions.doGetTutorialList());
  };

  const data: any = useSelector(selecList);
  console.log(data, "data");

  const { t } = useTranslation();
  const loader = useSelector(selectLoading);
  const meta = useSelector(selectMeta);
  const moreLoading = useSelector(selectMoreLoading);

  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;
  useEffect(() => {
    if (isFocused) {
      onLoad();
    }

    return () => {};
  }, [currentPage, isFocused]);

  useEffect(() => {
    dispatch(actions.setCurrentPage(1));
    onLoad();

    return () => {};
  }, []);

  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={"TUTORIAL"}
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
          data={data}
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 22 }}
          renderItem={({ item, index }: any) => (
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <YoutubeVideo videoUrl={item?.link} />

              <Text style={styles.imgTopText} lineBreakMode="middle">
                {item.englishTitle}
              </Text>
            </View>
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

export default index;

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
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
    lineHeight: 21,
    marginTop: 5,
    marginLeft: 10,
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
