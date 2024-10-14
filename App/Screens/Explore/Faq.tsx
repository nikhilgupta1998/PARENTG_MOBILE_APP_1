
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
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
import { SCREENS } from "../../constants/var";
import {
  selectAssessmentData,
  selectFaqList,
  selectLoader,
} from "../../Redux/Milestone/selector";
import EachFaq from "components/EachFaq";
import { renderEmpty } from "components/renderEmpty";

const Faq = (props: any) => {
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
      actions.doGetFaqList({
        callback() {},
      })
    );
  };
  const data = useSelector(selectFaqList);
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <BackHeader  iconStyle={undefined} 
        title={"FAQ's"}
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
     {loading ? (
        renderEmpty(true , "")
      ) : (
      <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
        style={{ marginTop: 30 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        data={data}
        renderItem={({ item, index }:any) => (
          <EachFaq
            data={item}
            props={props}
          />
        )}
      />)}
    </View>
  );
};

export default Faq;

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
