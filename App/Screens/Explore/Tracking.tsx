import {
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect } from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Redux/Milestone/slice";
import {
  selectCurrentPage,
  selectLoader,
  selectMeta,
  selectMoreLoading,
  selectProgressBar,
} from "../../Redux/Milestone/selector";
import { SCREENS } from "../../constants/var";
import { useFocusEffect } from "@react-navigation/native";
import { renderEmpty } from "components/renderEmpty";
const Progress = (props: any) => {
  const { t } = useTranslation();
  const data = [
    { title: "Comparison of milestones" },
    { title: "Activities in a month" },
    { title: "Growth" },
    { title: "Sleep" },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();
      return () => unsubscribe;
    }, [])
  );
  const onLoad = async () => {
    dispatch(
      actions.doGetProgressBarList({
        callback() {},
      })
    );
  };
  const currentPage = useSelector(selectCurrentPage);
  useEffect(() => {
    dispatch(
      actions.doGetProgressBarList({
        callback() {},
      })
    );

    return () => {};
  }, [currentPage]);
  const Data = useSelector(selectProgressBar);
  const goBack = () => {
    props.navigation.goBack();
  };
  const goNewPage = (urlnew: string) => {
    if (urlnew == "Comparison of milestones") {
      props.navigation.navigate(SCREENS.COMPARISONOFMILESTONE);
    } else if (urlnew == "Activities in a month") {
      props.navigation.navigate(SCREENS.ACTIVITYINMONTH);
    } else if (urlnew == "Growth") {
      props.navigation.navigate(SCREENS.GROWTHANALYTICS);
    } else if (urlnew == "Sleep") {
      props.navigation.navigate(SCREENS.SLEEPGRAPH);
    }
  };

  const loader = useSelector(selectLoader);
  const meta = useSelector(selectMeta);
  const moreLoading = useSelector(selectMoreLoading);
  const hasMoreItems = currentPage < meta?.totalPages;

  const handleSwitch = () => {
    props.navigation.navigate(SCREENS.ASSESSMENT);
  };
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <BackHeader  iconStyle={undefined} 
        title={"Tracking"}
        RightIcon={undefined}
        goback={goBack}
        rightIconOnPress={() => handleSwitch()}
      />
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      {loader ? (
         renderEmpty(true , "")
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
         
        </ScrollView>
      )}
    </View>
  );
};

export default Progress;

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
    backgroundColor: LightTheme.colors.background,
    padding: 12,
    marginBottom: 20,
  },

  txt: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
