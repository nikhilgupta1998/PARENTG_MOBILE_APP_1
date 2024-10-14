import {
  KeyboardTypeAndroid,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { LightTheme } from "../utils/theme";
import EyeOpen from "../assets/icons/eye-open.svg";
import EyeClose from "../assets/icons/eye-close.svg";

interface AuthInputProps {
  inputProps: TextInputProps;
  isPass: boolean;
  icon: any;
  style: any;
  wrapstyle: any;
}

const AuthInput = ({
  isPass,
  icon,
  inputProps,
  style,
  wrapstyle,
}: AuthInputProps) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <View style={[styles.inputWrap, wrapstyle]}>
      {icon && icon}
      <TextInput
        // numeric
        textAlignVertical="center"
        style={[styles.input, style]}
        {...inputProps}
        
        secureTextEntry={!showPass && isPass}
        placeholderTextColor={LightTheme.colors.input_placeholder_color}
      />
      {isPass && showPass ? (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <EyeClose />
        </TouchableOpacity>
      ) : (
        isPass && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <EyeOpen />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

AuthInput.defaultProps = {
  isPass: false,
  style: {},
  wrapstyle: {},
  icon: undefined,
  keyboardType: "default",
};

export default AuthInput;

const styles = StyleSheet.create({
  inputWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 51,
  },

  input: {
    flex: 1,
    fontSize: 13,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.black,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
});
