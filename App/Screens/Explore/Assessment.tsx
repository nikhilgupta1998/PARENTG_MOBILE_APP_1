import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Lock from "assets/svg/lock.svg";
import React from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import EachCollapseItem from "components/EachCollapseItem";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Milestone/slice";
import {
  selectAssessmentData,
  selectLoader,
} from "../../Redux/Milestone/selector";
import { renderEmpty } from "components/renderEmpty";
import { selectPlan } from "../../Redux/Auth/selector";

const Assessment = (props: any) => {
  const goBack = () => {
    props.navigation.goBack();
  };
  const loading = useSelector(selectLoader);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetAssessmentList({
        callback() {},
      })
    );
  };
  const CanAccess: any = useSelector(selectPlan);
  const data = useSelector(selectAssessmentData);
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={t("ASSESSMENT")}
          titleStyle={{
            fontSize: 28,
          }}
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
        {!loading && (
          <View
            style={{
              marginTop: 20,
              marginBottom: 0,
              alignItems: "center",
              paddingVertical: 20,
              borderRadius: 10,
              backgroundColor: LightTheme.colors.white,
              borderColor: LightTheme.colors.green_6,
              borderWidth: 4,
              marginHorizontal: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "flex-end",
              elevation: 10,
            }}
          >
            <Image
              source={require("../../assets/img/mother.png")}
              resizeMode="stretch"
              style={{
                height: 120,
                width: 100,
                marginRight: 5,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 22,
                  textAlign: "center",
                  color: "#00AAA8",
                  fontFamily: LightTheme.fontFamily.bold,
                }}
              >
                Personalized
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "#899499",
                  fontFamily: LightTheme.fontFamily.bold,
                }}
              >
                My Plan
              </Text>
            </View>
          </View>
        )}

        {CanAccess.milestone ? (
          loading ? (
            renderEmpty(true, "")
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 15 ,marginBottom:Platform.OS == "android" ? 0 : 70}}
              contentContainerStyle={{ paddingBottom: 40 }}
              data={data.length > 0 ? data : []}
              renderItem={({ item, index }: any) => (
                <EachCollapseItem data={item} props={props} />
              )}
            />
          )
        ) : (
          <View
            style={{
              position: "absolute",
              top: "45%",
              left: "45%",
            }}
          >
            <Lock />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Assessment;

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
    padding: 12,
    marginBottom: 15,
  },

  txt: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
});
