import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { getMyStringValue, removeValue } from "utils/local-storage";
import { SCREENS } from "../../constants/var";
import { useDispatch } from "react-redux";
import { actions } from "../../Redux/Auth/slice";
import LinearGradient from "react-native-linear-gradient";
import { images } from "../../constants/img";
const SplashScreen = (props: any) => {
  const dispatch = useDispatch();
  const opacity = React.useRef(new Animated.Value(1)).current;
  const resetStackAndGoToLogin = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.PHONENUMBER }],
  });
  const resetStackAndBottomTabs = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.CREATE_PARENT }],
  });
  const resetStackAndProfileCreate = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.HOME }],
  });
  const resetStackAndUserProfileCreate = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.CREATE_CHILD }],
  });
  const onLoad = async () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(async ({ finished }) => {
      if (finished) {
        let token = await getMyStringValue("@token");
        // console.log(token, "tokentoken");
        if (token) {
          dispatch(
            actions.getMeRequest({
              callback: async (
                check: boolean,
                profileCompleted: boolean,
                childAdded: boolean
              ) => {
                if (check) {
                  if (!profileCompleted) {
                    props.navigation.dispatch(resetStackAndBottomTabs);
                  } else if (!childAdded) {
                    props.navigation.dispatch(resetStackAndUserProfileCreate);
                  } else {
                    props.navigation.dispatch(resetStackAndProfileCreate);
                  }
                } else {
                  await removeValue("@token");
                  props.navigation.dispatch(resetStackAndGoToLogin);
                }
              },
            })
          );
        } else {
          props.navigation.dispatch(resetStackAndGoToLogin);
        }
      }
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onLoad();

      return () => unsubscribe;
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Black background */}
      <View style={styles.overlay} />

      {/* Image centered on the screen */}
      <View style={styles.imageContainer}>
        <Image source={images.LOGO} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.9)', // Adjust the opacity (last value) as needed
  },
  imageContainer: {
    width: "100%", // Adjust the width as per your design
    aspectRatio: 1, // Maintain aspect ratio
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%", // Optional: Add border-radius or other styling for the image
  },
});
