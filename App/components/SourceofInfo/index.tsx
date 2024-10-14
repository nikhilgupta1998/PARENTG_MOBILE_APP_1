import { useCallback } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { LightTheme } from "utils/theme";

type OpenURLButtonProps = {
  url: string;
};
export const OpenURLButton = ({ url }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
    }
  }, [url]);

  return (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
      <Text
        style={[
          styles.headTxt,
          { fontSize: 12, color: LightTheme.colors.textColor1 },
        ]}
      >
        If you want know source of into{" "}
      </Text>
      <Text onPress={handlePress} style={styles.sourceTxt}>
        Click here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headTxt: {
    fontSize: 15,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor7,
  },
  sourceTxt: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.light_blue_1,
  },
});
