import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import SwipeButton from "rn-swipe-button";
import analytics from "@react-native-firebase/analytics";
import global from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import RazorpayCheckout, { CheckoutOptions } from "react-native-razorpay";
import { LightTheme } from "utils/theme";
import { actions } from "../../Redux/Plan/redux/slice";
import { actions as actionAuth } from "../../Redux/Auth/slice";
import {
  selectCouponResponse,
  selectPlans,
} from "../../Redux/Plan/redux/selectors";
import { selectProfileForm } from "../../Redux/Auth/selector";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import SliderShow from "./SliderShow";
import showToast from "utils/toast";
import { SCREENS } from "../../constants/var";
import { height, width } from "../../constants/Dimenstions";
const AccountScreen = (props: any) => {
  const dispatch = useDispatch();
  const plans = useSelector(selectPlans);
  const userData: any = useSelector(selectProfileForm);
  const [selectedPackage, setSelectedPackage] = useState("");
  const proceedToPay = async (id: string, isDefault: number, order: number) => {
    if (userData?.plan?.order > order) {
      setSelectedPackage("");
      showToast("Can't purchase lower plan");
      return;
    }
    setSelectedPackage(id);
    if (isDefault !== 1) {
      dispatch(
        actions.doApplyCoupon({
          plan_id: id,
          couponCode: inputValue,
          callback() {},
        })
      );
      await analytics().logEvent("planSelection", {
        plan_id: id,
        couponCode: inputValue,
      });
    }
  };

  const GOBack = () => {
    props.navigation.goBack();
  };
  useEffect(() => {
    dispatch(actions.doGetOrders());
    dispatch(actions.doGetPlans());
    return () => {};
  }, []);

  var userPurchasePlan: any = plans.filter(
    (item: any) => userData?.plan?.planId == item._id
  );
  let forceResetLastButton: any = null;
  var selectedPlan: any = plans.filter(
    (item: any) => selectedPackage == item._id
  );
  console.log(selectedPlan, "selectedPlan");
  const [inputValue, setInputValue] = useState("");
  const updateSwipeStatusMessage = (message: any) => {
    if (selectedPackage.length !== 0) {
      setIsApplied(true);
      dispatch(
        actions.doCreatePayment({
          plan_id: selectedPackage,
          couponCode: inputValue,
          callback: (data: {
            payment_id: string;
            payment_key: string;
            payment_amount: number;
          }) => {
            var options: CheckoutOptions = {
              description: "Credits towards subscription",
              image: "https://parentg.com/static/media/logo.b9b495ebbe2aee169e3f.png",
              currency: "INR",
              order_id: data.payment_id,
              key: data.payment_key, // Your api key
              amount: data.payment_amount,
              name: "ParentG",
              theme: { color: "#00c4c1" },
            };
            console.log("options",options,data);
            
            RazorpayCheckout.open(options)
              .then(async (data: any) => {
                setIsApplied(false);
                dispatch(
                  actions.doUpdatePayment({
                    data: {
                      code: "",
                      description: "",
                      order_id: data.razorpay_order_id,
                      payment_id: data.razorpay_payment_id,
                      reason: "",
                      source: "",
                      status: 1,
                      step: "",
                    },
                    callback: () => {},
                  })
                );
                await analytics().logEvent("purchaseTransactionSuccess", {
                  order_id: data.razorpay_order_id,
                  payment_id: data.razorpay_payment_id,
                  amount: data.payment_amount,
                });
                props.navigation.navigate(SCREENS.SUCCESS_SCREEN);
                dispatch(
                  actionAuth.getMeRequestSecond({
                    callback() {},
                  })
                );
                dispatch(
                  actionAuth.getMeRequest({
                    callback() {},
                  })
                );
              })
              .catch((error: any) => {
                console.log(error, "error");
                dispatch(
                  actions.doUpdatePayment({
                    data: {
                      code: error.error.code ? error.error.code : "",
                      description: error.error.description,
                      order_id:
                        error.error.metadata.order_id || data.payment_id,
                      payment_id: error.error.metadata.payment_id,
                      reason: error.error.reason,
                      source: error.error.source,
                      status: 0,
                      step: error.error.step,
                    },
                    callback: () => {
                      dispatch(
                        actionAuth.getMeRequestSecond({
                          callback() {},
                        })
                      );
                    },
                  })
                );
              });
            console.log(" call back data");
          },
        })
      );
      setIsApplied(false);
    } else {
      showToast("Please select package");
      forceResetLastButton && forceResetLastButton();
    }
  };

  const [isApplied, setIsApplied] = useState(false);
  const handleCouponApplied = async () => {
    if (selectedPackage.length !== 0) {
      if (inputValue.length !== 0) {
        setIsApplied(true);
        dispatch(
          actions.doApplyCoupon({
            plan_id: selectedPackage,
            couponCode: inputValue,
            callback() {
              setIsApplied(false);
            },
          })
        );
        await analytics().logEvent("couponCodeApplied", {
          plan_id: selectedPackage,
          couponCode: inputValue,
        });
      } else {
        showToast("Please enter coupon code");
      }
    } else {
      showToast("Please select plan");
    }
  };

  const coupon = useSelector(selectCouponResponse);
  console.log(plans, "plans");

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
          title={"Subscription"}
          goback={GOBack}
          titleStyle={{ fontSize: 22 }}
          rightIconOnPress={undefined}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Carousel
            loop
            width={width - 50}
            height={height / 2}
            autoPlay={true}
            data={plans}
            style={{
              alignItems: "center",
              marginLeft: "5%",
            }}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item, index }: any) => (
              <View
                style={{
                  marginHorizontal: 0,
                  width: width - 90,
                }}
                key={index}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor:
                      selectedPackage == item?._id
                        ? LightTheme.colors.primary_btn
                        : "transparent",
                    alignSelf: "center",
                    top: 30,
                    zIndex: 99,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 65,
                      height: 65,
                      backgroundColor: LightTheme.colors.primary_btn,
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: LightTheme.colors.primary_btn,
                      alignSelf: "center",
                      zIndex: 99,
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Image
                      source={images.VECTOR}
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    proceedToPay(item?._id, item.isDefault, item.order);
                  }}
                >
                  <ImageBackground
                    style={[
                      styles.container,
                      {
                        height: height / 2.6,
                      },
                    ]}
                    source={images.RANCTANGLE}
                    resizeMode="stretch"
                  >
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.settingFontStyle,
                        {
                          textAlign: "center",
                          fontFamily: LightTheme.fontFamily.bold,
                          marginBottom: 5,
                          marginTop: 35,
                        },
                      ]}
                    >
                      {item?.englishTitle}
                    </Text>
                    <SliderShow selectedPlan={item} />
                    <Text
                      style={[
                        styles.settingFontStyle,
                        {
                          textAlign: "center",
                          fontFamily: LightTheme.fontFamily.bold,
                          color: LightTheme.colors.primary_btn,
                        },
                      ]}
                    >
                      {item?.androidAmount.toFixed(2)} INR /{" "}
                      {item?.androidAmount > 0 && item.ructingType == 0
                        ? "Monthly"
                        : item?.androidAmount > 0 && item.ructingType == 1
                        ? "quarterly"
                        : item?.androidAmount > 0 && item.ructingType == 2
                        ? "Yearly"
                        : "Free"}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                {userData?.plan?.planId == item?._id && (
                  <View
                    style={[
                      styles.eventDotActive,
                      {
                        backgroundColor: LightTheme.colors.primary_btn,
                        alignSelf: "center",
                      },
                    ]}
                  />
                )}
              </View>
            )}
          />

          {selectedPlan && selectedPlan[0]?.isDefault !== 1 && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  backgroundColor: "#F8F8F8",
                  borderRadius: 15,
                  marginTop: 40,
                }}
              >
                <TextInput
                  style={[
                    styles.settingFontStyle,
                    {
                      color: LightTheme.colors.black,
                      width: "70%",height:50
                    },
                  ]}
                  autoCapitalize={"characters"}
                  placeholderTextColor={"black"}
                  placeholder="Coupon Code..."
                  value={inputValue}
                  onChangeText={(text) => {
                    console.log(text);

                    setInputValue(text);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleCouponApplied();
                  }}
                >
                  <Text style={styles.buttonText}>APPLY</Text>
                </TouchableOpacity>
              </View>
              {coupon.discount > 0 && (
                <Text
                  style={{
                    fontFamily: LightTheme.fontFamily.regular,
                    color: LightTheme.colors.black,
                    fontSize: 10,
                    marginVertical: 10,
                  }}
                >
                  *Discount of INR {coupon.discount.toFixed(2)} is applied
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 5,
                  marginTop: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: LightTheme.fontFamily.regular,
                      color: LightTheme.colors.black,
                      fontSize: 12,
                    }}
                  >
                    Premium{" "}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        fontFamily: LightTheme.fontFamily.semiBold,
                      },
                    ]}
                  >
                    RS {coupon.price.toFixed(2)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 5,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: LightTheme.fontFamily.regular,
                      color: LightTheme.colors.black,
                      fontSize: 12,
                    }}
                  >
                    Discount{" "}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        fontFamily: LightTheme.fontFamily.semiBold,
                      },
                    ]}
                  >
                    RS {coupon.discount.toFixed(2)}
                  </Text>
                </View>
              </View>
            </>
          )}
        </KeyboardAvoidingView>
        <View
          style={{
            position: "absolute",
            bottom: Platform.OS == "android" ? 50 : 100,
            left: 10,
            right: 10,
          }}
        >
          {selectedPlan && selectedPlan[0]?.isDefault !== 1 && !isApplied && (
            <View
              style={{
                backgroundColor: "#00c4c1",
                borderRadius: 50,
              }}
            >
              <SwipeButton
                railBackgroundColor="#00c4c1"
                railStyles={{
                  backgroundColor: "#00c4c1",
                  borderColor: "#00c4c1",
                }}
                disabled={isApplied}
                containerStyles={{
                  borderWidth: 0,
                  borderTopColor: "#00c4c1",
                  borderLeftColor: "#00c4c1",
                  borderColor: "#00c4c1",
                  borderEndColor: "#00c4c1",
                  borderStartColor: "#00c4c1",
                  borderBottomColor: "#00c4c1",
                  borderRightColor: "#00c4c1",
                }}
                forceReset={(reset: any) => {
                  forceResetLastButton = reset;
                }}
                height={40}
                thumbIconBorderColor="#FFFFFF"
                thumbIconBackgroundColor="#FFFFFF"
                title={`Swipe to pay Rs ${coupon.totalAmount.toFixed(2)}`}
                titleColor="#FFFFFF"
                titleStyles={{
                  fontFamily: LightTheme.fontFamily.regular,
                  fontSize: 15,
                }}
                onSwipeSuccess={() =>
                  updateSwipeStatusMessage(
                    `Swipe to pay Rs ${coupon.totalAmount}`
                  )
                }
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: LightTheme.colors.primary_btn,
    fontFamily: LightTheme.fontFamily.bold,
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
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
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.primary_btn,
  },
  dateFontStyle: {
    fontSize: 10,
    fontFamily: LightTheme.fontFamily.regular,
    color: "#0000008C",
    marginTop: 3,
    marginLeft: 5,
  },
  eventDotActive: {
    marginTop: 0,
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
    backgroundColor: LightTheme.colors.primary_btn,
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
