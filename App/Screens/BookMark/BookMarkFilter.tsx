import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomModal from "components/Modal";
import global from "../../styles/global";
import { LightTheme } from "../../utils/theme";

interface modalProps {
  open: boolean;
  setOpen: any;
  data: Array<any>;
  onPress: any;
}

const BookMarkFilter = ({ setOpen, open, data, onPress }: modalProps) => {
  return (
    <CustomModal
      modalizeRef={null}
      open={open}
      onBackdropPress={() => {
        setOpen(false);
      }}
    >
      <View style={[global.modalWrap, { paddingVertical: 20 }]}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              onPress(index);
              setOpen(false);
            }}
            key={index}
            style={styles.switchWrap}
          >
            <Text style={styles.txt1}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </CustomModal>
  );
};

export default BookMarkFilter;

const styles = StyleSheet.create({
  txt1: {
    fontSize: 28,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    textAlign: "center",
  },
  switchWrap: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
});
