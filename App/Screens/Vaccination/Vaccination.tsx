import {
  ActivityIndicator,
  Alert,
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
import Upload from "../../assets/svg/upload.svg";
import Lock from "assets/svg/lock.svg";
import React, { useCallback, useEffect, useState } from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import { height, hp } from "../../constants/Dimenstions";
import Vaccine from "assets/icons/vaccine.svg";
import Check from "assets/icons/pending_check.svg";
import DoneCheck from "assets/icons/done_check.svg";
import Calender from "assets/icons/calender.svg";
import PrimaryButton from "components/PrimaryButton";
import CustomModal from "components/Modal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Vaccination/slice";
import { OpenURLButton as SourceOpenURLButton} from "components/SourceofInfo";
import {
  selectCurrentPage,
  selectList,
  selectLoading,
  selectMeta,
  selectMonth,
  selectMoreLoading,
  selectStatusCount,
} from "../../Redux/Vaccination/selectors.";
import { SCREENS } from "../../constants/var";
import {
  selectChildList,
  selectPlan,
  selectProfileForm,
} from "../../Redux/Auth/selector";
import { DateTime } from "luxon";
import { renderEmpty } from "components/renderEmpty";
import { AWS_PATH, PlAN_PATH } from "utils/constrats";
import CustomModalNew from "components/CustomModel";
import moment from "moment";
import { getMyStringValue } from "utils/local-storage";

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
      {/* <View style={[styles.overlay , {
        padding:30
      }]}> */}
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

const Vaccination = (props: any) => {
  const [open, setOpen] = useState(false);
  const data = [
    { title: "Dose  1", data: "" },
    { title: "Dose 2", data: null },
  ];
  const numbers = Array.from({ length: 25 }, (_, index) => index);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const Data = useSelector(selectList);
  const loading = useSelector(selectLoading);
  const month = useSelector(selectMonth);
  const profileData: any = useSelector(selectProfileForm);
  const list = useSelector(selectChildList);

  var selectedChildDetail: any = list.filter(
    (item) => item?._id == profileData.selectedChild
  );

  const dataForShow = [
    { title: "Birth", data: "0" },
    { title: "6 Weeks", data: "1.5" },
    { title: "10 Weeks", data: "2.5" },
    { title: "14 Weeks", data: "3.5" },
    { title: "6 months", data: "6" },
    { title: "7 months", data: "7" },
    { title: "9 months", data: "9" },
    { title: "12 months", data: "12" },
    { title: "13 months", data: "13" },
    { title: "15 months", data: "15" },
    { title: "18 months", data: "18" },
    // { title: "24 months", data: "24" },
    // { title: "3 Year", data: "36" },
    // { title: "4 Year", data: "48" },
    // { title: "5 Year", data: "60" },
    // { title: "6 Year", data: "72" },
    // { title: "9 Year", data: "108" },
    // { title: "14 Year", data: "168" },
  ];
  const statusCount = useSelector(selectStatusCount);
  useEffect(() => {
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    dispatch(actions.setLoading(true));
    return () => {};
  }, [month]);
  useEffect(() => {
    dispatch(actions.setLoading(true));
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    return () => {
      setMonth(0);
      dispatch(actions.setLoading(true));
      dispatch(actions.setList([]));
    };
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const goBack = () => {
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setList([]));
    props.navigation.goBack();
  };
  const setMonth = (id: number) => {
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setLoading(true));
    dispatch(actions.setList([]));
    dispatch(actions.setMonths(id));

    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
  };
  const goAddVaccination = (id: string) => {
    props.navigation.navigate(SCREENS.CONFIRM_VACCINATION, {
      id: id,
      isImageEdit: false,
    });
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

  const capitalizeFirstLetter = (str: string): string => {
    return str?.length > 10 ? str.substring(0, 13) + "..." : str;
    //  str?.charAt(0).toUpperCase() + str?.slice(1);
  };
  const fetchMoreData = () => {
    if (hasMoreItems && !moreLoading) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };
  // console.log(loading, "loading-Vaccination");
  const [showFullText, setShowFullText] = useState("");

  const toggleShowMore = (itemId: any) => {
    setShowFullText(itemId);
  };
  const profile: any = useSelector(selectProfileForm);
  var selectedChildDetail: any = profile.childProfiles.filter(
    (item: any) => item?._id == profile.selectedChild
  );
  const checkIconStatus = () => {
    const dob = new Date(selectedChildDetail[0].dob);
    const currentDate = new Date();
    const monthsDiff =
      (currentDate.getFullYear() - dob.getFullYear()) * 12 +
      (currentDate.getMonth() - dob.getMonth());
    // console.log(monthsDiff, "monthsDiff");
    return monthsDiff;
  };
  type OpenURLButtonProps = {
    url: string;
    children: any;
  };

  useEffect(() => {
    checkIconStatus();
    return () => {};
  }, [selectedChildDetail]);
  const CanAccess: any = useSelector(selectPlan);
  const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>
    );
  };
  // console.log(Data, "Data");
  const [dataData, setdata] = useState<{
    heightFeet: string;
    heightInch: string;
    weight: string;
    dob: string;
    images: string[];
  }>({
    heightFeet: "",
    heightInch: "",
    weight: "",
    dob: "",
    images: [],
  });
  const updateData = (item: any) => {
    // console.log(item, "item");
    if (item != undefined) {
      setdata((prevData) => ({
        ...prevData,
        heightFeet: item?.heightFeet,
        heightInch: item?.heightInch,
        weight: item?.weight,
        dob: item?.date,
        images: item?.image == "" ? [] : item?.image,
      }));
    }
    return;
    // Update specific properties in the state object
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
  const returnVisible = () => {
    return CanAccess.vaccination;
  };
  console.log(Data, "Data");

  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("VACCINATION.VACCINATION")}
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

        {/* {CanAccess?.vaccination ? ( */}
        <>
          <View style={styles.tmcWrap}>
            <Text style={styles.tmcText1}>
              {t("VACCINATION.VACCINATION_TRACKER")}
            </Text>
            <Text style={styles.tmcText2}>{selectedChildDetail[0]?.name}</Text>
          </View>
          <SourceOpenURLButton url="https://www.iapindia.org" ></SourceOpenURLButton>
          <View style={styles.eventBtns}>
            <View style={{ alignItems: "center" }}>
              <View
                style={[
                  styles.eventBtnWrap2,
                  {
                    borderColor: LightTheme.colors.red_1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.eventBtnTxt,
                    {
                      color: LightTheme.colors.red_1,
                    },
                  ]}
                >
                  {statusCount?.overdue}
                </Text>
              </View>
              <Text
                style={[
                  styles.eventBtnTxt2,
                  {
                    color: LightTheme.colors.red_1,
                  },
                ]}
              >
                {t("VACCINATION.OVERDUE")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={[
                  styles.eventBtnWrap2,
                  {
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
                  {statusCount?.upcoming}
                </Text>
              </View>
              <Text
                style={[
                  styles.eventBtnTxt2,
                  { color: LightTheme.colors.yellow_primary },
                ]}
              >
                {t("VACCINATION.UPCOMMING")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={[
                  styles.eventBtnWrap2,
                  {
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
                  {statusCount?.completed}
                </Text>
              </View>
              <Text
                style={[
                  styles.eventBtnTxt2,
                  {
                    color: LightTheme.colors.green_7,
                  },
                ]}
              >
                {t("VACCINATION.DONE")}
              </Text>
            </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ paddingBottom: 40 }}
            data={dataForShow}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center", marginRight: 5 }}>
                <TouchableOpacity
                  style={[
                    Number(item.data) !== month
                      ? styles.eventBtnWrapSelected
                      : styles.eventBtnWrap,
                  ]}
                  onPress={() => setMonth(Number(item.data))}
                >
                  <Text
                    style={[
                      styles.eventBtnTxt,
                      {
                        color:
                          Number(item.data) !== month
                            ? LightTheme.colors.primary_btn
                            : LightTheme.colors.white,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 0 }}
            data={Data}
            style={{ marginBottom: Platform.OS == "android" ? 0 : 50 }}
            renderItem={({ item }: any) => (
              <View style={styles.wrap}>
                <View>
                  <View style={styles.top}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Vaccine />
                      <Text style={styles.totalVaccineTxt}>
                        {capitalizeFirstLetter(item?.englishName)} ({item?.dose}
                        /{item?.totalDose})
                      </Text>
                    </View>

                    <Text>
                      {checkIconStatus() >= month ? (
                        item?.status == 0 ? (
                          <TouchableOpacity
                            onPress={() => goAddVaccination(item?._id)}
                          >
                            <Check />
                          </TouchableOpacity>
                        ) : (
                          <DoneCheck />
                        )
                      ) : (
                        ""
                      )}
                    </Text>
                  </View>

                  <Text style={styles.vaccineTxt}>
                    {t("VACCINATION.DUE_ON")}:{" "}
                    {item?.dueDate?.length > 0
                      ? DateTime.fromISO(item?.dueDate).toFormat("dd MMM yyyy")
                      : ""}
                  </Text>
                  <Text style={styles.vaccineTxt}>
                    {t("VACCINATION.PROTECT_AGAINST")}:{" "}
                    {item?.englishProtectionAgainst}
                  </Text>
                  <Text style={styles.vaccineTxt}>
                    {t("VACCINATION.TO_BE_GIVEN")}: {item?.toBeGiven}
                  </Text>
                  <Text
                    style={styles.vaccineTxt}
                    numberOfLines={showFullText == item._id ? undefined : 2}
                  >
                    {t("VACCINATION.INSTRUCTIONS")}: {item?.englishInstructions}
                  </Text>

                  <TouchableOpacity onPress={() => toggleShowMore(item._id)}>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: LightTheme.fontFamily.semiBold,
                      }}
                    >
                      {showFullText == item._id ? "" : "Show more"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                  {item?.status !== 0 &&
                    Number(item.completedData?.heightFeet) > 0 && (
                      <PrimaryButton
                        disabled={false}
                        loading={false}
                        onPress={() => {
                          setModalVisible(true);
                          updateData(item.completedData);
                        }}
                        style={{
                          marginTop: 20,
                          width: "45%",
                          height: 35,
                          borderRadius: 8,
                        }}
                        title={"View Details"}
                      />
                    )}

                  {item?.status !== 0 &&
                    Number(item.completedData?.heightFeet) > 0 && (
                      <TouchableOpacity
                        style={{
                          marginTop: 20,
                        }}
                        onPress={() => {
                          dispatch(
                            actions.setDataVaccination({
                              item: item.completedData,
                            })
                          );
                          props.navigation.navigate(
                            SCREENS.CONFIRM_VACCINATION,
                            {
                              id: item._id,
                              isImageEdit: true,
                            }
                          );
                        }}
                      >
                        <Upload />
                      </TouchableOpacity>
                    )}
                </View>
              </View>
            )}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty(loading, "Data not available")}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        </>
        <OverlayScreen
          visible={returnVisible()}
          onClose={close}
          goBack={props}
        />
        <CustomModal
          modalizeRef={null}
          open={open}
          onBackdropPress={() => {
            setOpen(false);
          }}
        >
          <View style={[global.modalWrap, { paddingVertical: 20 }]}>
            {data.map((item, index) => (
              <View style={styles.switchWrap}>
                <Text style={styles.txt2}>{item?.title}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setOpen(false);
                  }}
                  key={index}
                  style={styles.switchWrap}
                >
                  <Calender />
                  <Text style={styles.txt1}>{item?.data}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </CustomModal>
        <CustomModalNew isVisible={modalVisible} onClose={handleCloseModal}>
          <View style={styles.container}>
            {/* First box */}
            <View style={styles.box}>
              <Text
                style={[
                  styles.totalVaccineTxt,
                  {
                    marginLeft: 0,
                  },
                ]}
              >
                Height :
              </Text>
              <Text
                style={[
                  styles.vaccineTxt,
                  {
                    marginVertical: 0,
                  },
                ]}
              >
                {Number(dataData?.heightFeet) > 0
                  ? `${dataData?.heightFeet} Feet ${dataData?.heightInch} Inch`
                  : "---"}
              </Text>
            </View>

            {/* Second box */}
            <View style={styles.box}>
              <Text
                style={[
                  styles.totalVaccineTxt,
                  {
                    marginLeft: 0,
                  },
                ]}
              >
                Weight :
              </Text>
              <Text
                style={[
                  styles.vaccineTxt,
                  {
                    marginVertical: 0,
                  },
                ]}
              >
                {Number(dataData?.weight) > 0
                  ? `${dataData?.weight}  KG`
                  : "---"}
              </Text>
            </View>

            {/* Third box */}
            <View style={styles.box}>
              <Text
                style={[
                  styles.totalVaccineTxt,
                  {
                    marginLeft: 0,
                  },
                ]}
              >
                Vaccination Date:
              </Text>
              <Text
                style={[
                  styles.vaccineTxt,
                  {
                    marginVertical: 0,
                  },
                ]}
              >
                {dataData.dob
                  ? moment(dataData.dob).format("DD-MM-YYYY")
                  : "----"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 15,
              marginTop: 10,
            }}
          >
            {dataData?.images.map((data) => (
              <OpenURLButton url={AWS_PATH + data}>
                <Image
                  source={{
                    uri: AWS_PATH + data,
                  }}
                  style={styles.mealPic}
                />
              </OpenURLButton>
            ))}
          </View>
        </CustomModalNew>
      </View>
    </SafeAreaView>
  );
};

export default Vaccination;

const styles = StyleSheet.create({
  tmcWrap: {
    marginTop: 20,
  },
  box: {
    paddingVertical: 1,
    flexDirection: "row",
    justifyContent: "space-between", // Arrange boxes horizontally
  },
  tmcText1: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
    // lineHeight: 16,
  },
  tmcText2: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.primary_btn,
    lineHeight: 22,
  },
  eventBtns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: hp(2),
    paddingHorizontal: 50,
  },
  eventBtnWrapSelected: {
    marginTop: 10,
    width: 103.5,
    height: 40,
    paddingTop: 4,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
    fontSize: 9,
    borderColor: LightTheme.colors.primary_btn,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.primary_btn,
    backgroundColor: "#e5f6f6",
  },
  eventBtnWrap: {
    marginTop: 10,
    width: 103.5,
    height: 40,
    paddingTop: 4,
    ...global.flexCenter,
    borderWidth: 1.5,
    borderRadius: 45,
    fontSize: 9,
    borderColor: "#e5f6f6",
    fontFamily: LightTheme.fontFamily.medium,
    color: "#e5f6f6",
    backgroundColor: LightTheme.colors.primary_btn,
  },
  eventBtnTxt: {
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
  },
  eventBtnWrap2: {
    width: 50,
    height: 50,
    ...global.flexCenter,
    borderWidth: 4,
    borderRadius: 45,
    backgroundColor: LightTheme.colors.background,
  },
  mealPic: {
    width: 55,
    height: 55,
    borderRadius: 10,
    margin: 2,
  },

  eventDotTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
  },
  eventBtnTxt2: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
  },
  wrap: {
    width: "100%",
    height: "auto",
    padding: 15,
    justifyContent: "space-around",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: LightTheme.colors.bookmark_border,
    marginTop: 20,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  vaccineTxt: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
    marginVertical: 8,
  },
  totalVaccineTxt: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    marginLeft: 10,
  },
  footerTxt: {
    fontSize: 11,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
    marginBottom: 12,
    fontStyle: "italic",
  },
  footer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  txt1: {
    fontSize: 20,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.textColor6,
    marginLeft: 6,
  },
  txt2: {
    fontSize: 20,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
  },
  switchWrap: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    flexDirection: "row",
    borderBottomColor: LightTheme.colors.booking_border,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: "column", // Arrange boxes horizontally// Center items verticall // Background color of container
    padding: 10,
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
