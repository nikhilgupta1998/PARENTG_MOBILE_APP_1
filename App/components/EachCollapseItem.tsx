import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LightTheme } from "../utils/theme";
import global from "../styles/global";
import Arrow from "../assets/icons/play.svg";
import Mark from "../assets/icons/danger_mark.svg";
import { images } from "../constants/img";
import PendingCheck from "assets/icons/pending_check_red.svg";
import Check from "assets/icons/mark-enable.svg";
import { actions } from "../Redux/Milestone/slice";
import { useDispatch } from "react-redux";
import { SCREENS } from "../constants/var";

const EachCollapseItem = (props: any) => {
  

  const dispatch = useDispatch();

  const getMilestoneQuestion = (id: any) => {
    // console.log(props, "props");
    dispatch(actions.setCurrentPageMilestone(1));
    props.props.navigation.navigate(SCREENS.DEVELOPMENT_OF_SENSES, {
      id: id,
      isAssessment: true,
    });
  };
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity onPress={() => setOpen(!open)}>
      <ImageBackground
        style={[
          styles.container,
          {
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: open ? 40 : 5,
            height: !open ? 60 : undefined,
          },
        ]}
        source={open ? images.REACTPROGRESS : images.SELECTOROUTSIDE}
        resizeMode="stretch"
      >
        <View style={[styles.visibleItem, {}]}>
          <Text style={styles.txt}>{props.data?.englishTitle}</Text>
          <TouchableOpacity
            style={[styles.btn, {}]}
            onPress={() => setOpen(!open)}
          >
            <Image
              source={images.PLAY}
              resizeMode="contain"
              style={{
                width: 14,
                height: 14,
                transform: [{ rotate: open ? "180deg" : "0deg" }],
              }}
            />
          </TouchableOpacity>
        </View>
        {open && (
          <>
            {props.data?.milestone?.map((item: any, index: number) => (
              <>
                {item?.question !== 0 && (
                  <TouchableOpacity
                    style={
                      index == props.data?.milestone.length
                        ? styles.collapseItemWrapLast
                        : styles.collapseItemWrap
                    }
                    key={index}
                    onPress={() => getMilestoneQuestion(item?._id)}
                  >
                    <Text style={styles.collapseItemTxt}>
                      {item?.englishTitle}
                    </Text>
                    {item?.ans !== item?.question ? (
                      <PendingCheck />
                    ) : (
                      <Check />
                    )}
                  </TouchableOpacity>
                )}
              </>
            ))}
          </>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default EachCollapseItem;

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
    marginBottom: 20,
  },

  txt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
  visibleItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 58,
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  collapseItemWrap: {
    padding: 12,
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: LightTheme.colors.bookmark_border,
    justifyContent: "space-between",
    alignItems: "center",
  },
  collapseItemWrapLast: {
    padding: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collapseItemTxt: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor3,
    width: "70%",
    lineHeight: 20,
    textTransform:"capitalize"
  },
  btn: {
    height: 31,
    width: 31,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.primary_btn,
    borderRadius: 30,
    ...global.flexCenter,
    // position: "absolute",
  },
});
