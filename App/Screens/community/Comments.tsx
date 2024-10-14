import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import analytics from "@react-native-firebase/analytics";
import React, { useEffect } from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Send from "assets/icons/send.svg";
import { useTranslation } from "react-i18next";
import { SCREENS } from "../../constants/var";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCommentCurrentPage,
  selectCommentMeta,
  selectCommentMoreLoading,
  selectLoadingComment,
  selectPostCommnetsForm,
  selectPostCommnetsList,
} from "../../Redux/Community/redux/selectors";
import { actions } from "../../Redux/Community/redux/slice";
import { useFocusEffect } from "@react-navigation/native";
import { AWS_PATH, PASSETS_PATH } from "utils/constrats";
import { lightColors } from "@rneui/base";
import { renderEmpty } from "components/renderEmpty";

const Comments = (props: any) => {
  const { t } = useTranslation();
  const goBack = () => {
    dispatch(actions.setPostCommnets());
    dispatch(actions.setCommentCurrentPage(1));
    dispatch(actions.setLoadingComment(true));
    props.navigation.goBack();
  };
  useEffect(() => {
    dispatch(
      actions.doGetComment({
        id: props.route.params.id,
        callback() {},
      })
    );
    return () => {};
  }, [props.route.params.id]);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetComment({
        id: props.route.params.id,
        callback() {},
      })
    );
  };

  const dispatch = useDispatch();
  const form = useSelector(selectPostCommnetsForm);
  const loading = useSelector(selectLoadingComment);

  const doAddComments = async () => {
    console.log(props.route.params, "props.route.params");
    dispatch(
      actions.doPostComment({
        id: props.route.params.id,
        like: props.route.params.like + 1,
        index: props.route.params.index,
        callback() {},
      })
    );
    dispatch(
      actions.doAddComments({
        callback() {
          dispatch(actions.clearCommentFrom());
          dispatch(
            actions.doGetComment({
              id: props.route.params.id,
              callback() {},
            })
          );
        },
      })
    );

    await analytics().logEvent("commentOnPost", {});
  };
  const commentList = useSelector(selectPostCommnetsList);

  useEffect(() => {
    dispatch(
      actions.doUpdateCommentForm({
        name: "postId",
        value: props.route.params.id,
      })
    );

    return () => {};
  }, [props.route.params.id, form.postId]);
  const handleChange = (evt: any) => {
    dispatch(
      actions.doUpdateCommentForm({
        name: "comment",
        value: evt.nativeEvent.text,
      })
    );
  };
  const meta = useSelector(selectCommentMeta);
  const moreLoading = useSelector(selectCommentMoreLoading);

  const renderFooter = () => (
    <View>{moreLoading && <ActivityIndicator />}</View>
  );
  const currentPage = useSelector(selectCommentCurrentPage);
  const hasMoreItems = currentPage < meta?.totalPages;
  useEffect(() => {
    dispatch(
      actions.doGetComment({
        id: props.route.params.id,
        callback() {},
      })
    );

    return () => {};
  }, [currentPage]);

  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCommentCurrentPage(currentPage + 1));
    }
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <KeyboardAvoidingView
        style={[
          global.wrap,
          {
            flex: 1,
          },
        ]}
      >
        <View
          style={{
            flex: 9,
          }}
        >
          <View
            style={{
              padding: 30,
            }}
          >
            <BackHeader
              iconStyle={undefined}
              title={t("COMMENTS")}
              goback={goBack}
              titleStyle={{ fontSize: 25 }}
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
          </View>
          <FlatList
            style={{
              backgroundColor: "transparent",
              marginHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            inverted
            data={commentList}
            renderItem={({ item }) => (
              <View style={styles.chatWrapLeft} key={item?._id}>
                <>
                  <Image
                    source={{ uri: AWS_PATH + item?.profilepic }}
                    style={styles.avatar}
                    resizeMode="contain"
                  />

                  <View
                    style={[
                      styles.msgWrap,
                      {
                        flexDirection: "column",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 9,
                        fontFamily: LightTheme.fontFamily.semiBold,
                        color: LightTheme.colors.black,
                      }}
                    >
                      {item?.userName}
                    </Text>
                    <Text style={styles.msgTxt}>{item?.comment}</Text>
                  </View>
                </>
              </View>
            )}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty(loading, "Data not available")}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        </View>
        {!loading && (
          <View
            style={{
              flex: 1,
              backgroundColor: LightTheme.colors.background,
              padding: 20,
            }}
          >
            <View style={[styles.inputWrap]}>
              <TextInput
                placeholder={t("TYPE_YOUR_COMMENT")}
                onChange={handleChange}
                value={form.comment}
                style={styles.input}
              />

              <TouchableOpacity onPress={() => doAddComments()}>
                {form.comment.length !== 0 && <Send />}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Comments;

const styles = StyleSheet.create({
  chatWrapLeft: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
  },
  chatWrapRight: {
    width: "100%",
    flexDirection: "row-reverse",
    marginVertical: 10,
  },

  chat: {
    flexDirection: "row-reverse",
    width: "100%",
    marginVertical: 10,
  },
  msgWrap: {
    maxWidth: "80%",
    minWidth: "12%",
    textAlign: "left",
    backgroundColor: LightTheme.colors.white,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginHorizontal: 12,
    justifyContent: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  msgTxt: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
  },
  tmcWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tmcText1: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.regular,
    textAlign: "center",
    color: LightTheme.colors.textColor1,
    lineHeight: 16,
  },
  tmcText2: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.semiBold,
    textAlign: "center",
    color: LightTheme.colors.primary_btn,
    lineHeight: 16,
  },
  inputWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LightTheme.colors.background,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
  },

  input: {
    flex: 1,
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
    height: 50,
    alignSelf: "center",
  },
});
