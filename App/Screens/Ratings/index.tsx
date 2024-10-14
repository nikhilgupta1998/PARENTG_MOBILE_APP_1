import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import global from "styles/global";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import { SCREENS } from "../../constants/var";
import InAppReview from "react-native-in-app-review";
const index = (props: any) => {
  const goBack = () => {
    props.navigation.goBack();
  };
  const requestInAppReview = async () => {
   
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={[global.wrap]}>
      <View style={[{ padding: 30 }]}>
        <BackHeader  iconStyle={undefined} 
          title={"Ratings"}
          RightIcon={undefined}
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
      </View>
      {/* <Image
        source={images.REVIEW}
        resizeMode="cover"
        style={{
          width: "100%",
          height:"100%"
        }}
      /> */}
      <Button title="Request In-App Review" onPress={requestInAppReview} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
