import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import Book from "assets/icons/book.svg";
import { LightTheme } from "../../utils/theme";
import EachProgress from "components/EachProgress";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Milestone/slice";
import {
  selectCurrentPage,
  selectLoader,
  selectMeta,
  selectMoreLoading,
  selectProgressBar,
} from "../../Redux/Milestone/selector";
import { SCREENS } from "../../constants/var";
import { useFocusEffect } from "@react-navigation/native";
import Lock from "assets/svg/lock.svg";
import { selectPlan } from "../../Redux/Auth/selector";
import { renderEmpty } from "components/renderEmpty";
import { height } from "../../constants/Dimenstions";
import { getMyStringValue } from "utils/local-storage";
import { PlAN_PATH } from "utils/constrats";

const OverlayScreen = ({ visible, onClose, goBack }: any) => {
  const gobackfun = () => {
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
      <View style={[styles.overlay]}>
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
          goback={gobackfun}
          style={{
            top: (Platform.OS == "ios" ? 50 : 0) + 30,
          }}
          rightIconOnPress={undefined}
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

const Progress = (props: any) => {
  const { t } = useTranslation();
  const [isPopupShow, setIsPopupShow] = useState(false);
  const data = [
    { title: "Comparative Analysis" },
    { title: "Monthly Activity Trend" },
    { title: "Growth" },
    { title: "Sleep" },
    { title: "Feeding" },
  ];
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      setIsPopupShow(true);
      const unsubscribe = onLoad();
      return () => {
        setIsPopupShow(false);
        unsubscribe;
      };
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetProgressBarList({
        callback() {},
      })
    );
  };
  const currentPage = useSelector(selectCurrentPage);
  useEffect(() => {
    dispatch(
      actions.doGetProgressBarList({
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
  const Data = useSelector(selectProgressBar);
  const goBack = () => {
    props.navigation.goBack();
  };
  const goNewPage = (urlnew: string) => {
    if (urlnew == "Comparative Analysis") {
      props.navigation.navigate(SCREENS.COMPARISONOFMILESTONE);
    } else if (urlnew == "Monthly Activity Trend") {
      props.navigation.navigate(SCREENS.ACTIVITYINMONTH);
    } else if (urlnew == "Growth") {
      props.navigation.navigate(SCREENS.GROWTHANALYTICS);
    } else if (urlnew == "Sleep") {
      props.navigation.navigate(SCREENS.SLEEPGRAPH);
    } else if (urlnew == "Feeding") {
      props.navigation.navigate(SCREENS.FEEDINGCHART);
    }
  };

  const loader = useSelector(selectLoader);
  const meta = useSelector(selectMeta);
  const moreLoading = useSelector(selectMoreLoading);
  const hasMoreItems = currentPage < meta?.totalPages;
  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const handleSwitch = () => {
    props.navigation.navigate(SCREENS.ASSESSMENT);
  };
  const CanAccess: any = useSelector(selectPlan);

  const returnVisible = () => {
    if (activeTab == 0) {
      return CanAccess.milestone;
    } else {
      return CanAccess.tracker;
    }
  };

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
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30, flex: 1 }]}>
        <BackHeader
          iconStyle={undefined}
          title={"Category"}
          RightIcon={<Book />}
          goback={goBack}
          rightIconOnPress={() => handleSwitch()}
        />
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />
        <ImageBackground
          style={[
            styles.container,
            {
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 10,
            },
          ]}
          resizeMode="contain"
          source={images.SELECTOROUTSIDE}
        >
          <TouchableOpacity
            style={styles.activityImg}
            onPress={() => {
              setActiveTab(0);
            }}
          >
            {activeTab == 0 ? (
              <ImageBackground
                style={styles.activityImg}
                source={images.SELECTOR}
                resizeMode="contain"
              >
                <Text style={styles.imgTopText}>Category </Text>
              </ImageBackground>
            ) : (
              <Text style={styles.imgTopText}>Category</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.activityImg}
            onPress={() => {
              setActiveTab(1);
            }}
          >
            {activeTab == 1 ? (
              <ImageBackground
                style={styles.activityImg}
                source={images.SELECTOR}
                resizeMode="contain"
              >
                <Text style={styles.imgTopText}>Tracking </Text>
              </ImageBackground>
            ) : (
              <Text style={styles.imgTopText}>Tracking</Text>
            )}
          </TouchableOpacity>
        </ImageBackground>
        {loader ? (
          renderEmpty(true, "")
        ) : activeTab == 1 ? (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 15 }}
              contentContainerStyle={{ paddingBottom: 40 }}
              data={data}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => goNewPage(item?.title)}
                >
                  <ImageBackground
                    style={[
                      styles.container,
                      { height: 80, paddingLeft: 20, paddingRight: 20 },
                    ]}
                    source={images.SELECTOROUTSIDE}
                    resizeMode="stretch"
                  >
                    <Text style={styles.txt}>{item.title}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 15, marginBottom: 30 }}
              data={Data}
              renderItem={({ item, index }) => (
                <EachProgress
                  title={item?.title}
                  data={item}
                  navigation={props.navigation}
                />
              )}
            />
          </>
        )}
        <OverlayScreen
          visible={returnVisible()}
          onClose={close}
          goBack={props}
        />
      </View>
    </SafeAreaView>
  );
};

export default Progress;

const styles = StyleSheet.create({
  card: {
    // height: 200,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    elevation: 1,
    borderWidth: 2,
    borderColor: LightTheme.colors.yellow_3,
    backgroundColor: LightTheme.colors.background,
    padding: 12,
    marginBottom: 20,
  },

  txt: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activityImg: {
    width: 120,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  grediant: {
    height: 44,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  imgTopText: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
    lineHeight: 21,
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
