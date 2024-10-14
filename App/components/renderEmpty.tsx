import React from "react";
import { Image, Text, View } from "react-native";
import { LightTheme } from "utils/theme";

export const renderEmpty = (loader: boolean , message:string) => {
  
  
  return (
    <View
    style={{
      flex: 1,
      height:300,
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      alignItems: "center",
    }}
    >
      {loader ? (
        <Image
          source={require("../assets/img/loader.gif")}
          resizeMode="contain"
          style={{
            width: 130,
            height:130
          }}
          
        />
      ) : (
        <Text
          style={{
            color: LightTheme.colors.black,
            textAlign: "center",
            fontSize:15,
            fontFamily: LightTheme.fontFamily.semiBold,
          }}
        >
          {message}
        </Text>
      )}
    </View>
  );
};
