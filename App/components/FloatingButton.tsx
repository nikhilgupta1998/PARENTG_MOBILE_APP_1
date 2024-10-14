import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import normalize from "react-native-normalize";
const FloatingButton = ({ handleClick }: any) => {
  return (
    <View style={styles.container}>
      {/* Floating button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleClick}>
        <Image
          source={require("../assets/img/analytics.gif")}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  mainContent: {
    flex: 1,
    // Add your styles for the main content here
  },
  floatingButton: {
    position: "absolute",
    bottom: normalize(Platform.OS == "android" ? 70 : 60), // Adjust the bottom value as needed
    right: 16, // Adjust the right value as needed
    backgroundColor: "white", // Change the color as needed
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10, // Add elevation for a shadow effect (Android)
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

export default FloatingButton;
