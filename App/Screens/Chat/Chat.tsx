import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import BackHeader from "components/BackHeader";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Send from "assets/icons/send.svg";
import analytics from "@react-native-firebase/analytics";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Meals/slice";
import {
  selectChatList,
  selectChatLoader,
  selectMessage,
} from "../../Redux/Meals/selectors.";
import { useFocusEffect } from "@react-navigation/native";
import { SCREENS } from "../../constants/var";
import { AWS_PATH } from "utils/constrats";
import { images } from "../../constants/img";

const Chat = (props: any) => {
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetChatList({
        id: props.route.params.id,
        callback() {},
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.route.params.id) {
      dispatch(
        actions.doGetChatList({
          id: props.route.params.id,
          callback() {},
        })
      );
    }

    return () => {};
  }, [props.route.params.id]);
  const sendMessage = async () => {
    dispatch(
      actions.doSendMessage({
        id: props.route.params.id,
        callback() {
          dispatch(actions.setChat(""));
          dispatch(
            actions.doGetChatList({
              id: props.route.params.id,
              callback() {},
            })
          );
        },
      })
    );
    await analytics().logEvent("messageSent", {});
  };
  const chatlist: any = useSelector(selectChatList);
  const loading = useSelector(selectChatLoader);
  const GOBack = () => {
    props.navigation.goBack();
  };
  const message = useSelector(selectMessage);
  const { t } = useTranslation();
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30, paddingBottom: 50 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("CHAT")}
          goback={GOBack}
          rightIconOnPress={undefined}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: Platform.OS === "ios"?0.90:1 }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={styles.tmcWrap}>
                <Text style={styles.tmcText1}>
                  {t("YOU_ARE_CONNECTED_WITH")}{" "}
                </Text>
                <Text style={styles.tmcText2}>Admin</Text>
              </View>
            )}
            style={{
              marginBottom: 15,
              backgroundColor: LightTheme.colors.background,
            }}
            contentContainerStyle={{}}
            inverted
            data={chatlist}
            renderItem={({ item, index }: any) => (
              <>
                <View style={styles.chatWrapRight} key={index}>
                  <>
                    {item?.sender == 2 && (
                      <>
                        <Image
                          source={{ uri: AWS_PATH + item?.profilePic }}
                          style={styles.avatar}
                          resizeMode="contain"
                        />
                        <View style={[styles.msgWrap, {}]}>
                          <Text style={styles.msgTxt}>{item?.message}</Text>
                        </View>
                      </>
                    )}
                  </>
                </View>
                <View style={styles.chatWrapLeft} key={index}>
                  <>
                    {item?.sender == 1 && (
                      // <View style={[styles.msgWrapAdmin, {}]}>
                      //   <Text style={styles.msgTxt}>{item?.message}</Text>
                      // </View>
                      <>
                        <Image
                          source={images.LOGO}
                          style={styles.avatar}
                          resizeMode="contain"
                        />
                        <View
                          style={[
                            styles.msgWrap,
                            {
                              borderTopLeftRadius: 0,
                              borderTopRightRadius: 15,
                            },
                          ]}
                        >
                          <Text style={styles.msgTxt}>{item?.message}</Text>
                        </View>
                      </>
                    )}
                  </>
                </View>
              </>
            )}
          />
          <View style={[styles.inputWrap]}>
            <TextInput
              placeholder={t("TYPE_A_MESSAGE")}
              style={styles.input}
              value={message}
              onChangeText={(text) => {
                dispatch(actions.setChat(text));
              }}
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity disabled={loading} onPress={sendMessage}>
                <Send />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

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
    maxWidth: "70%",
    minWidth: "12%",
    textAlign: "left",
    backgroundColor: LightTheme.colors.white,
    borderRadius: 15,
    // borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    overflow: "hidden",
  },
  msgWrapAdmin: {
    backgroundColor: LightTheme.colors.white,
    borderRadius: 15,
    borderTopRightRadius: 0,
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: LightTheme.colors.primary_btn,
  },
  msgTxt: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.textColor1,
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
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 51,
  },

  input: {
    flex: 1,
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    // color: LightTheme.colors.black
    paddingHorizontal: 10,
    alignSelf: "center",
    color: LightTheme.colors.textColor1,
  },
});
