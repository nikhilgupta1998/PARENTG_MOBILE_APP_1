import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import Arrow from "assets/icons/back_arrow.svg";
import { LightTheme } from "../../utils/theme";
import global from "../../styles/global";
import { useTranslation } from "react-i18next";
import BackHeader from "components/BackHeader";
import { SCREENS } from "../../constants/var";
import { actions } from "../../Redux/Notification/slice";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";
import {
  selectCurrentPage,
  selectList,
  selectLoading,
  selectMeta,
  selectMoreLoading,
} from "../../Redux/Notification/selectors.";
import { DateTime } from "luxon";
import { renderEmpty } from "components/renderEmpty";
import { NotificationTypeEnum } from "../../Redux/Notification/types";
import { getMyStringValue } from "utils/local-storage";
import { PlAN_PATH } from "utils/constrats";

const Notifications = (props: any) => {
  const { t } = useTranslation();
  const goBack = () => {
    props.navigation.goBack();
  };
  const loading = useSelector(selectLoading);
  const meta = useSelector(selectMeta);
  const currentPage = useSelector(selectCurrentPage);
  const moreLoading = useSelector(selectMoreLoading);
  const notifications = useSelector(selectList);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(actions.setLoading(true));
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
  };
  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const hasMoreItems = currentPage < meta.totalPages;

  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };

  const doDeleteAll = async () => {
    await analytics().logEvent("clearAllNotifications", {});
    dispatch(actions.setLoading(true));
    dispatch(
      actions.doDeleteAll({
        callback() {
          dispatch(actions.setCurrentPage(1));
          dispatch(
            actions.doGetList({
              callback() {},
            })
          );
        },
      })
    );
  };

  const doReadAll = async () => {
    await analytics().logEvent("readAllNotifications", {});
    dispatch(actions.setLoading(true));
    dispatch(
      actions.doReadAll({
        callback() {
          dispatch(actions.setCurrentPage(1));
          dispatch(
            actions.doGetList({
              callback() {},
            })
          );
        },
      })
    );
  };

  const doRead = async (id: string) => {
    await analytics().logEvent("readAllNotifications", {});
    dispatch(actions.setCurrentPage(1));
    dispatch(
      actions.doRead({
        id: id,
        callback() {
          dispatch(
            actions.doGetList({
              callback() {},
            })
          );
        },
      })
    );
  };
  const goToNotification = async (type: NotificationTypeEnum) => {
    switch (type) {
      case NotificationTypeEnum.ACTIVITY_DUE:
        props.navigation.navigate(SCREENS.ALL_ACTIVITY);
        break;
      case NotificationTypeEnum.FEED_ANALYTICS_DUE:
        props.navigation.navigate(SCREENS.FEEDING);
        break;
      case NotificationTypeEnum.GROWTH_ANALYTICS_DUE:
        props.navigation.navigate(SCREENS.GROWTH);
        break;
      case NotificationTypeEnum.NEW_MESSAGE:
        props.navigation.navigate(SCREENS.CHAT, {
          id: "",
        });
        break;
      case NotificationTypeEnum.PLAN_EXPIRE:
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
        break;
      case NotificationTypeEnum.SLEEP_ANALYTICS_DUE:
        props.navigation.navigate(SCREENS.SLEEP);
        break;
      case NotificationTypeEnum.USER_SIGNUP:
        break;
      case NotificationTypeEnum.VACCINATION_DUE:
        props.navigation.navigate(SCREENS.VACCINATION);
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("NOTIFICATIONS")}
          goback={goBack}
          rightIconOnPress={undefined}
          RightIcon={undefined}
        />
        {notifications.length !== 0 && (
          <View style={[styles.headwrap]}>
            <TouchableOpacity onPress={doDeleteAll}>
              <Text style={styles.deleteAll}>{t("DELETE_ALL")}</Text>
            </TouchableOpacity>
            <View style={styles.right}>
              <TouchableOpacity onPress={doReadAll}>
                <Text style={styles.readAll}>{t("READ_ALL")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, marginTop: 30 }}
          data={notifications}
          style={{ marginBottom: Platform.OS == "android" ? 0 : 50 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => goToNotification(item.type)}
              style={styles.wrap}
              key={index}
            >
              {item?.read_status == 1 ? (
                <View
                  style={[
                    styles.notiwrap,
                    { borderColor: LightTheme.colors.textColor7 },
                  ]}
                >
                  <Text style={[styles.notiTxt]}>
                    {item.englishVaccinationName} {item.englishTitle}{" "}
                    {item.englishVaccinationProtectionAgainst}
                  </Text>
                </View>
              ) : (
                <View style={styles.notiwrap}>
                  <TouchableOpacity onPress={() => doRead(item._id)}>
                    <Text style={styles.notiTxt}>
                      {item.englishVaccinationName} {item.englishTitle}{" "}
                      {item.englishVaccinationProtectionAgainst}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.notiTime}>
                {item?.createdAt.length > 0
                  ? DateTime.fromISO(item?.createdAt).toFormat("dd MMMM yyyy")
                  : ""}
              </Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty(loading, "Data not available")}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 5,
  },
  notiwrap: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(53, 53, 53, 1)",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    // flexWrap:"wrap"
    justifyContent: "center",
    marginBottom: 10,
  },

  notiTxt: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.medium,
    lineHeight: 19,
    color: LightTheme.colors.textColor7,
  },

  notiTime: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.regular,
    lineHeight: 21,
    color: LightTheme.colors.textColor3,
  },
  headwrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative",
    marginTop: 20,
  },
  btn: {
    height: 55,
    width: 55,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.primary_btn,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
  },
  right: {
    justifyContent: "center",
    alignItems: "center",
  },
  readAll: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.green_3,
  },
  deleteAll: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.red_1,
  },
  title: {
    fontSize: 30,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.headerTextColor_2,
  },
});
