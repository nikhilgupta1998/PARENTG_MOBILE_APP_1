import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { LightTheme } from "../utils/theme";
import Slider from "@react-native-community/slider";
import { images } from "../constants/img";

import { SCREENS } from "../constants/var";
import { useTranslation } from "react-i18next";
const EachProgress = (props: any) => {
  const [open, setOpen] = useState(false);
  const getMilestone = (id: any) => {
    // dispatch(actions.clearMilestonePage())
    props.navigation.navigate(SCREENS.PHYSICAL, {
      id: id,
    });
  };


  const handleSliderChange = (value: any) => {
   
  };
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={() => setOpen(!open)}>
      <ImageBackground
        style={[
          styles.container,
          { height: open ? 170 : 80, paddingLeft: 20, paddingRight: 20 },
        ]}
        source={open ? images.REACTPROGRESS : images.SELECTOROUTSIDE}
        resizeMode="stretch"
      >
        <Text style={styles.txt} numberOfLines={open ? undefined : 1}>
          {props.title}
        </Text>
        {open && (
          <>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: LightTheme.fontFamily.medium,
                  color: LightTheme.colors.headerTextColor_2,
                  textAlign: "center",
                }}
              >
                {props.data.answer}
              </Text>
              <Slider
                value={
                  props.data.answer
                }
                style={{ width: "100%", marginTop: 0 }}
                maximumValue={props.data.question}
                onValueChange={handleSliderChange}
                disabled={true}
                maximumTrackTintColor={LightTheme.colors.primary_btn}
                minimumTrackTintColor={LightTheme.colors.primary_btn}
                thumbImage={images.CHILD}
              />
              <View style={styles.valueWrap}>
                <Text style={styles.txt}>{0}</Text>
                <Text style={styles.txt}>{props.data.question}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => getMilestone(props.data._id)}>
              <Text
                style={[styles.txt, { color: LightTheme.colors.primary_btn }]}
              >
                {t("OTHER.VIEW_MORE")}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default EachProgress;

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
  valueWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 20,
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
