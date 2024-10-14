import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants/img";
import global from "../../styles/global";
import ProfileMenu from "components/ProfileMenu";
import { LightTheme } from "../../utils/theme";
import BackHeaderDoctor from "components/BackHeaderDoctor";
import Exit from "assets/icons/exit.svg";
import SelectLanguage from "../Profile/SelectLanguage";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <Image
        source={images.HEADER_2}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <BackHeader  iconStyle={undefined} Doctor title="" />
      <View style={styles.menuWrap}>
        <View style={styles.menu}>
          <ProfileMenu title={t("PROFILE")} onPress={() => {}} />
          <ProfileMenu title={t("SLOTS_EDIT")} onPress={() => {}} />
          <ProfileMenu title={t("EARNINGS")} onPress={() => {}} />
          <ProfileMenu title={t("REVIEWS")} onPress={() => {}} />
          <ProfileMenu
            title={t("LANGUAGE")}
            onPress={() => {
              setOpen(true);
            }}
          />
          <ProfileMenu title={t("SUPPORT")} onPress={() => {}} />
          <View style={{ marginTop: 50 }}>
            <ProfileMenu
              title={t("LOGOUT")}
              Icon={<Exit />}
              textStyle={{
                color: LightTheme.colors.red_2,
                fontSize: 23,
                marginLeft: 10,
              }}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <SelectLanguage open={open} setOpen={setOpen} />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuWrap: {
    flex: 0.85,
    justifyContent: "space-around",
  },
  menu: {},
});
