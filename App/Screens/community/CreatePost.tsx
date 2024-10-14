import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Close from "assets/icons/close.svg";
import analytics from "@react-native-firebase/analytics";
import React, { useRef } from "react";
import { LightTheme } from "../../utils/theme";
import Plus from "assets/icons/plus.svg";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import AuthInput from "components/AuthInput";
import PrimaryButton from "components/PrimaryButton";
import { images } from "../../constants/img";
import global from "../../styles/global";
import BackHeader from "components/BackHeader";
import { hp, width } from "../../constants/Dimenstions";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Community/redux/slice";
import { actions as action } from "../../Redux/Auth/slice";
import {
  selectLoadingPost,
  selectPostForm,
  selectLoading,
} from "../../Redux/Community/redux/selectors";
import { SCREENS } from "../../constants/var";
import { AWS_PATH } from "utils/constrats";
import ActionSheet from "react-native-actionsheet";

const CreatePost = (props: any) => {
  const mime = require("mime");
  const UploadFile = (res: ImageOrVideo) => {
    const getFile = {
      uri: res.path,
      name: res.path.split("/")[res.path.split("/").length - 1],
      type: res.mime,
      size: res.size,
    };
    const data = new FormData();
    data.append("file", getFile);

    dispatch(
      actions.doAddImages({
        data: getFile.name,
        callback: (signedUrl: any, fileNameWithPrefix: any) => {
          dispatch(
            action.UploadeImage({
              data: res.path,
              signedUrl: signedUrl,
              result: mime.getType(getFile.name),
              callback: () => {
                dispatch(actions.setLoadingPost(false));
                dispatch(actions.setAddImages(fileNameWithPrefix));
              },
            })
          );
        },
      })
    );
  };
  const openCamera = async () => {
    try {
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      }).then((res: ImageOrVideo) => {
        UploadFile(res);
      });
    } catch (error) {}
  };
  const openLibrary = async () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      }).then((res: ImageOrVideo) => {
        UploadFile(res);
      });
    } catch (error) {
      console.warn(error);
    }
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const form = useSelector(selectPostForm);
  const loading = useSelector(selectLoadingPost);
  const load = useSelector(selectLoading);
  const handleDoAdd = async () => {
    dispatch(
      actions.doAdd({
        callback() {
          dispatch(actions.clearFrom());
          dispatch(
            actions.doGetList({
              callback() {},
            })
          );
          props.navigation.navigate(SCREENS.COMMUNITY_POST_SCREEN);
        },
      })
    );
    await analytics().logEvent("newPostCreated", {});
  };
  const goBack = () => {
    props.navigation.goBack();
  };
  let ActionSheets: any = useRef(null);
  const fixedItem = [{ id: "fixed", type: "icon", icon: "your-icon-url" }];
  const combinedData: any = fixedItem?.concat(form.images);
  const handleDelete = (index: number) => {
    var indexNew = index - 1;
    dispatch(actions.DeleteList(indexNew));
  };
  const renderItem = ({ item, index }: any) => {
    if (item?.type === "icon") {
      return (
        <TouchableOpacity
          onPress={() => {
            ActionSheets.current.show();
          }}
        >
          <ImageBackground
            style={[styles.PictureContainer]}
            source={images.POSTRECT}
            resizeMode="stretch"
          >
            <Plus height={28} width={28} />
          </ImageBackground>
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={[
            {
              flexDirection: "column",
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: AWS_PATH + item }}
              style={{
                ...styles.AddWrap,
              }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <View style={styles.cutIcon}>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Close />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };
  const renderPostImage = () => {
    return (
      <>
        <FlatList
          data={combinedData}
          columnWrapperStyle={{
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          keyExtractor={(item) => item?.id}
          renderItem={renderItem}
        />
      </>
    );
  };
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30, paddingBottom: 70 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("CREATE_POST")}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            />
          ) : (
            renderPostImage()
          )}
        </View>

        <AuthInput
          inputProps={{
            placeholder: t("TITLE"),
            value: form.title,
            onChangeText(text) {
              dispatch(actions.changeFromValue({ name: "title", value: text }));
            },
          }}
          wrapstyle={{
            marginTop: 20,
            // borderWidth: 0,
          }}
        />
        <AuthInput
          inputProps={{
            placeholder: t("DESCRIPTION"),
            multiline: true,
            textAlignVertical: "top",
            numberOfLines: 5,
            value: form.description,
            onChangeText(text) {
              dispatch(
                actions.changeFromValue({ name: "description", value: text })
              );
            },
          }}
          wrapstyle={{
            marginTop: 20,
            height: 100,
            // borderWidth: 0,
          }}
        />

        <PrimaryButton
          title={t("CREATE_POST")}
          onPress={handleDoAdd}
          loading={undefined}
          disabled={load}
        />
        <ActionSheet
          ref={ActionSheets}
          title={t("PROFILEOBJ.WHICH_ONE_DO_YOU_LIKE") + "?"}
          options={[
            t("PROFILEOBJ.CAMERA"),
            t("PROFILEOBJ.PICK_FROM_PHONE"),
            t("PROFILEOBJ.CANCEL"),
          ]}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={(index: any) => {
            if (index == 0) {
              openCamera();
            } else if (index == 1) {
              openLibrary();
            } else return;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#CFCFCF",
    alignItems: "center",
    justifyContent: "center",
  },
  AddWrap: {
    height: width / 3 - 45,
    width: width / 3 - 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: LightTheme.colors.yellow_3,
    elevation: 1,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: LightTheme.colors.background,
    overflow: "hidden",
    // marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  cutIcon: {
    marginTop: 8,
    marginRight: 8,
    alignContent: "center",
    alignItems: "center",
  },
  PictureContainer: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    height: width / 3 - 45,
    width: width / 3 - 45,
    marginHorizontal: 5,
  },
});
