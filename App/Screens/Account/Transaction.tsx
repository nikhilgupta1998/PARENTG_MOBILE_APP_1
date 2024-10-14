import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import global from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TranscationCard from "components/TranscationCard/TranscationCard";
import { LightTheme } from "utils/theme";
import { actions } from "../../Redux/Plan/redux/slice";
import { OrderData } from "../../Redux/Plan/types";
import {
  selectCurrentPage,
  selectMeta,
  selectMoreLoading,
  selectOrder,
  selectPlans,
  selectLoading,
} from "../../Redux/Plan/redux/selectors";
import { selectProfileForm } from "../../Redux/Auth/selector";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { renderEmpty } from "components/renderEmpty";
const AccountScreen = (props: any) => {
  const dispatch = useDispatch();
  const plans = useSelector(selectPlans);
  const orders: any = useSelector(selectOrder);
  const userData: any = useSelector(selectProfileForm);
  const loading: any = useSelector(selectLoading);

  // console.log(plans, "plans");

  const renderTranscation = ({
    item,
    index,
  }: {
    item: OrderData;
    index: number;
  }) => {
    return <TranscationCard item={item} />;
  };
  const GOBack = () => {
    props.navigation.goBack();
  };
  useEffect(() => {
    dispatch(actions.setLoading(true));
    dispatch(actions.doGetOrders());
    dispatch(actions.doGetPlans());
    return () => {};
  }, []);
  const meta = useSelector(selectMeta);
  const moreLoading = useSelector(selectMoreLoading);
  const { t } = useTranslation();
  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;
  useEffect(() => {
    dispatch(actions.doGetOrders());

    return () => {};
  }, [currentPage]);
  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };
  // console.log(userData, "userData");

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30, paddingBottom: 50 }]}>
        <StatusBar
          backgroundColor={LightTheme.colors.background}
          barStyle={"dark-content"}
        />
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />
        <BackHeader
          iconStyle={undefined}
          title={"Transaction"}
          goback={GOBack}
          titleStyle={{ fontSize: 22 }}
          rightIconOnPress={undefined}
        />
        <View style={styles.subContainer}>
          <View style={styles.alignContainer}>
            <Text style={styles.settingFontStyle}>{userData.name}</Text>
            <View>
              <View
                style={{
                  ...styles.btn,
                  borderColor: LightTheme.colors.green_6,
                  backgroundColor: "white",
                  borderWidth: 2,
                  width: 115,
                }}
              >
                <Text
                  style={{
                    backgroundColor: LightTheme.colors.white,
                    color: LightTheme.colors.green_6,
                  }}
                  numberOfLines={1}
                >
                  {userData?.plan.planEnglishTitle}
                </Text>
              </View>
              <Text style={styles.dateFontStyle}>
                Valid till {moment(userData?.endDate).format("MMM DD YYYY")}
              </Text>
            </View>
          </View>

          <FlatList
            data={orders}
            renderItem={renderTranscation}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 30,
            }}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty(loading, "Data not available")}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: LightTheme.colors.primary,
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    // backgroundColor: LightTheme.colors.white,
    marginTop: 35,
  },

  btn: {
    borderRadius: 5,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#29E33B",
  },
  completeFontStyle: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.white,
  },
  settingFontStyle: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.green_6,
    fontWeight: "700",
  },
  dateFontStyle: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: "#0000008C",
    fontWeight: "700",
    marginTop: 3,
    marginLeft: 5,
  },
  eventDotActive: {
    marginTop: 8,
    height: 10,
    width: 10,
    borderRadius: 50,
  },
  alignContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  changePlanFontStyle: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
    // marginLeft: 20,
  },
  subscribitonContainer: {
    // marginHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
  },
  subscriptionCardMainContainer: {},
  subscriptionCard: {
    height: 69,
    borderRadius: 10,
    backgroundColor: LightTheme.colors.green_6,
    alignItems: "center",
    justifyContent: "center",
  },
  subscriptionFontStyle: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.white,
  },
  transactionContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  eventBtnWrap: {
    width: "auto",
    height: 34,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
  },
  eventBtnTxt: {
    paddingRight: 7,
    paddingLeft: 5,
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
  },
});
