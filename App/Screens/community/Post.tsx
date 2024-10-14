import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Lock from "assets/svg/lock.svg";
import analytics from "@react-native-firebase/analytics";
import React, { useEffect, useRef, useState } from "react";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import Plus from "assets/icons/plus.svg";
import { height, hp, width } from "../../constants/Dimenstions";
import { LightTheme } from "../../utils/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { images } from "../../constants/img";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Community/redux/slice";
import {
  selectCurrentPage,
  selectList,
  selectLoadingPostGet,
  selectMeta,
  selectMoreLoading,
} from "../../Redux/Community/redux/selectors";
import ActionSheet from "react-native-actionsheet";
import { SCREENS } from "../../constants/var";
import { AWS_PATH, PlAN_PATH } from "utils/constrats";
import moment from "moment";
import { selectPlan } from "../../Redux/Auth/selector";
import { renderEmpty } from "components/renderEmpty";
import { useIsFocused } from "@react-navigation/native";
import { getMyStringValue } from "utils/local-storage";
import { ActionType } from "../../Redux/Community/types/types";

const OverlayScreen = ({ visible, onClose, goBack }: any) => {
  const isFocused = useIsFocused();

  const gobackfun = () => {
    goBack.navigation?.goBack();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isFocused ? (visible == 0 ? true : false) : false}
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
          goback={gobackfun}
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

const CommunityPost = (props: any) => {
  let ActionSheets = useRef<ActionSheet>(null);
  const [postActionId, setPostActionId] = useState("");
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector(selectList);
  const loading = useSelector(selectLoadingPostGet);
  const doGoAdd = () => {
    props.navigation.navigate(SCREENS.COMMUNITY_POST_CREATE);
  };
  const goBack = () => {
    dispatch(actions.setLoadingPostGet(true));
    dispatch(actions.setPost([]));
    props.navigation.goBack();
  };
  const goComments = (index: number, like: any, id: string) => {
    dispatch(actions.setPostCommnets());
    dispatch(actions.setCommentCurrentPage(1));
    dispatch(actions.setLoadingComment(true));
    props.navigation.navigate(SCREENS.COMMUNITY_POST_COMMENTS, {
      id: id,
      index: index,
      like: like,
    });
  };
  const goDetails = (id: string) => {
    dispatch(actions.clearPostDetail());
    props.navigation.navigate(SCREENS.COMMUNITY_POST_DETAILS, {
      id: id,
    });
  };
  const doAddLike = async (index: any, like: any, id: string) => {
    dispatch(
      actions.doPostLikeManually({
        id: id,
        like: like,
        index: index,
        callback() {},
      })
    );
    dispatch(
      actions.doPostLike({
        id: id,
        like: like,
        index: index,
        callback() {},
      })
    );
    await analytics().logEvent("postLikeAction", {});
  };
  const meta = useSelector(selectMeta);
  const moreLoading = useSelector(selectMoreLoading);

  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;
  useEffect(() => {
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    return () => {};
  }, [currentPage]);

  useEffect(() => {
    dispatch(actions.setLoadingPostGet(true));
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    return () => {};
  }, []);

  const CanAccess: any = useSelector(selectPlan);
  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
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

  const postAction = (actionType: ActionType) => {
    dispatch(
      actions.doPostAction({
        id: postActionId,
        action: actionType,
        callback() {
          setPostActionId("");
          dispatch(actions.setLoadingPostGet(true));
          dispatch(
            actions.doGetList({
              callback() {},
            })
          );
        },
      })
    );
  };

  const returnVisible = () => {
    return CanAccess.community;
  };
  useEffect(() => {
    console.log("props", isFocused);

    return () => {};
  }, [isFocused]);

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap]}>
        <View style={{ padding: 30 }}>
          <BackHeader
            iconStyle={undefined}
            title={t("COMMUNITY")}
            titleStyle={{ fontSize: 27 }}
            RightIcon={<Plus />}
            goback={() => goBack()}
            rightIconOnPress={() => doGoAdd()}
          />
          <Image
            source={images.HEADER}
            resizeMode="stretch"
            style={[
              global.greenShder,
              { right: 0, transform: [{ rotateY: "180deg" }] },
            ]}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          data={data}
          style={{ marginBottom: Platform.OS == "android" ? 50 : 100 }}
          renderItem={({ item, index }) => (
            <View style={styles.container}>
              <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                  <View>
                    <Image
                      source={{ uri: AWS_PATH + item?.profilepic }}
                      style={styles.userImage}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <Text style={styles.userName}>{item?.userName}</Text>
                    <Text
                      style={{
                        fontSize: 9,
                        fontFamily: LightTheme.fontFamily.regular,
                        color: LightTheme.colors.black,
                      }}
                    >
                      {moment(item?.createdAt).startOf("hour").fromNow()}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.userOptionContainer}
                  onPress={() => {
                    setPostActionId(item._id);
                    setTimeout(() => {
                      ActionSheets.current?.show();
                    }, 500);
                  }}
                >
                  <FeatherIcon name="more-horizontal" size={25} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => goDetails(item?._id)}>
                <Image
                  source={{ uri: AWS_PATH + item?.images[0] }}
                  style={styles.postImage}
                />
              </TouchableOpacity>
              <View style={styles.likeCommentSection}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => doAddLike(index, item?.like, item?._id)}
                  >
                    {item?.like == 1 ? (
                      <Icon name="heart" size={25} color="#FF006B" />
                    ) : (
                      <Icon name="heart-o" size={25} color="#FF006B" />
                    )}
                  </TouchableOpacity>

                  <Text style={styles.postInfo}>
                    {item?.postlikes} {t("OTHER.LIKES")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      goComments(index, item?.totalComments, item?._id)
                    }
                  >
                    <Icon name="comment-o" size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      goComments(index, item?.totalComments, item?._id)
                    }
                    style={{ marginTop: 5 }}
                  >
                    <Text style={styles.postInfo}>
                      {item?.totalComments} {t("COMMENTS")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.userInfo,
                  {
                    alignItems: "flex-start",
                    flexDirection: "column",
                    paddingVertical: 0,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: LightTheme.fontFamily.semiBold,
                    color: LightTheme.colors.black,
                  }}
                  numberOfLines={2}
                >
                  {item.title.length > 100
                    ? item.title.substring(0, 100) + "..."
                    : item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: LightTheme.fontFamily.regular,
                    color: LightTheme.colors.black,
                  }}
                  numberOfLines={2}
                >
                  {item.description.length > 100
                    ? item.description.substring(0, 100) + "..."
                    : item.description}
                </Text>
              </View>
            </View>
          )}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty(loading, "Data not available")}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        />
        <ActionSheet
          ref={ActionSheets}
          title={t("PROFILEOBJ.WHICH_ONE_DO_YOU_LIKE") + "?"}
          options={["Report Post", "Block User", "Report User", "Cancel"]}
          cancelButtonIndex={3}
          destructiveButtonIndex={3}
          onPress={(index: any) => {
            switch (index) {
              case 0:
                postAction(ActionType.REPORT_POST);
                break;
              case 1:
                postAction(ActionType.BLOCK_USER);
                break;
              case 2:
                postAction(ActionType.REPORT_USER);
                break;
              default:
                return;
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CommunityPost;

const styles = StyleSheet.create({
  mealTypeTxt: {
    fontSize: 9,
    fontFamily: LightTheme.fontFamily.semiBold,
    marginTop: 5,
    color: LightTheme.colors.headerTextColor_2,
  },
  imageContainer: {
    height: 190,
  },
  mealPic: {
    width: "100%",
    height: hp(25),
    borderRadius: 12,
  },

  postWrap: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 12,
  },

  postInfo: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
    marginLeft: 8,
  },
  postInfoT: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor1,
    // marginLeft: 8,
  },
  postCaption: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor1,
    lineHeight: 18,
  },
  postCaptionT: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.light_blue_1,
    lineHeight: 18,
  },
  container: {
    marginBottom: 16,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  userOptionContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
  },
  postImage: {
    width: "100%",
    height: hp(35),
    resizeMode: "cover",
  },
  likeCommentSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
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
