import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LightTheme } from "utils/theme";

const CustomModalNew = ({ isVisible, onClose, children }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close button */}

          {/* Modal content */}
          <View style={styles.contentContainer}>{children}</View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 100,
                borderRadius: 5,
                height: 35,
                backgroundColor: LightTheme.colors.green_6,
                borderColor: LightTheme.colors.input_border_color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.mileStoneHeaderFontStyle,
                  {
                    fontSize: 13,
                  },
                ]}
              >
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    color: "#0000ff", // Blue color for close button text
    fontWeight: "bold",
  },
  contentContainer: {
    marginTop: 10,
  },
  mileStoneHeaderFontStyle: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
  },
});

export default CustomModalNew;
