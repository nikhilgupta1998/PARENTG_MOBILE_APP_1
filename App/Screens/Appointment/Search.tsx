import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { images } from "../../constants/img";
import global from "../../styles/global";
import AuthInput from "components/AuthInput";
import { LightTheme } from "../../utils/theme";
import { useTranslation } from "react-i18next";

const Search = () => {
  const { t } = useTranslation();
  const data = ["kormangla 4th Bangalore", "HSR Layout, Bangalore Karnataka"];
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />

      <AuthInput
        inputProps={{
          placeholder: t("SEARCH"),
        }}
        wrapstyle={{
          borderColor: LightTheme.colors.primary_btn,
        }}
      />
      <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{ width: "80%", marginLeft: 10 }}>
            <Text style={styles.srchTxt}>kormangla 4th Bangalore</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  srchTxt: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.medium,
    marginVertical: 5,
    color: LightTheme.colors.black,
  },
});
