import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomModal from "components/Modal";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";

interface modalProps {
  open: boolean;
  setOpen: any;
}

const SelectLanguage = ({ setOpen, open }: modalProps) => {
  return (
    <CustomModal
      modalizeRef={null}
      open={open}
      onBackdropPress={() => {
        setOpen(false);
      }}
    >
      <View style={global.modalWrap}>
        <TouchableOpacity style={styles.switchWrap}>
          <Text style={styles.txt1}>hindi</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  txt1: {
    fontSize: 28,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
  switchWrap: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
});
