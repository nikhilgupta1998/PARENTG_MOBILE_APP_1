import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";
import Bottel from "assets/icons/baby-bottle.svg";
import Growth from "assets/icons/growth.svg";
import Sleep from "assets/icons/sleep-face.svg";

import { useTranslation } from "react-i18next";
import { SCREENS } from "../../constants/var";
import { hp } from "../../constants/Dimenstions";

const Analytics = (props: any) => {
  const GOBREAST_FEEDING = () => {
    props.navigation.navigate(SCREENS.FEEDING);
  };
  const GOGROWTH = () => {
    props.navigation.navigate(SCREENS.GROWTH);
  };
  const GOBack = () => {
    props.navigation.goBack();
  };
  const GOSLEEP = () => {
    props.navigation.navigate(SCREENS.SLEEP);
  };
  const { t } = useTranslation();
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { paddingHorizontal: 30 ,paddingBottom:Platform.OS == "android" ? 0 : 50,paddingTop:30}]}>
        <BackHeader
          iconStyle={undefined}
          title={t("ANALYTICS")}
          titleStyle={{ fontSize: 27 }}
          goback={GOBack}
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
        <View style={styles.wrap}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={GOBREAST_FEEDING}>
              <ImageBackground
                style={[styles.container]}
                source={images.SQUIRE}
                resizeMode="contain"
              >
                <Bottel />
              </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.txt}>{t("BREAST_FEEDING")}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={GOGROWTH}>
              <ImageBackground
                style={[styles.container]}
                source={images.SQUIRE}
                resizeMode="contain"
              >
                <Growth />
              </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.txt}>{t("GROWTH")}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={GOSLEEP}>
              <ImageBackground
                style={[styles.container]}
                source={images.SQUIRE}
                resizeMode="contain"
              >
                <Sleep />
              </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.txt}>{t("SLEEP")}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  wrap: {
    flex: 0.98,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 40
  },
  container: {
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 130,
    borderRadius: 12,
  },
  iconWrap: {
    width: 130,
    height: 130,
    borderRadius: 70,
    ...global.flexCenter,
    borderWidth: 5,
    borderColor: LightTheme.colors.yellow_3,
  },
  txt: {
    fontSize: 17,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.primary_btn,
    marginTop: 8,
  },
});
