import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Check from "assets/svg/cross.svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import analytics from "@react-native-firebase/analytics";
import { useDispatch, useSelector } from "react-redux";
import { MileStoneQuesiont } from "../../Redux/Home/Activitys/types";
import { LightTheme } from "utils/theme";
import { actions } from "../../Redux/Home/Activitys/slice";
import { actions as action } from "../../Redux/Milestone/slice";
import {
  selectQuestionList,
} from "../../Redux/Home/Activitys/selectors.";
import PrimaryButton from "components/PrimaryButton";

const MileStoneModal = ({
  visible,
  toggle,
  milestoneID,
}: {
  visible: boolean;
  toggle: any;
  milestoneID: string;
}) => {
  const dispatch = useDispatch();
  const onRequestClose = () => {
    // console.log("closed");
    toggle();
  };
  const mileStoneToggle = () => {
    toggle();
  };
  const doCompleteQuestion = async (id: any, answer: number, index: number) => {
    dispatch(
      actions.editCompleteQuestionList({
        index: index,
        answer: answer == 0 ? 1 : 0,
        id: id,
      })
    );

    await analytics().logEvent("questionCompleted", {});
  };
  const data = useSelector(selectQuestionList);
  // console.log(data, "data-Qustion");
  const handleSubmitQuestion = async () => {
    await analytics().logEvent("completeMultipleQuestions", {});
    dispatch(
      actions.submitQuestion({
        callback() {
          dispatch(
            actions.doGetQuestion({
              id: milestoneID,
              callback() {
              },
            })
          );
        },
      })
    );
    toggle();
  };
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      // onShow={null}
      onShow={undefined}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalSubContainer}>
          <View style={styles.mileStoneHeader}>
            <Text style={styles.mileStoneHeaderFontStyle}>Milestone</Text>
     
          </View>

          <View style={styles.subContainer}>
            <Text style={styles.instructionsFontStyle}>
              Which of the following can Ahem do now?
            </Text>
            <View style={{ marginTop: 30 }}>
              {data.map((data: any, index: any) => {
                return (
                  <TouchableOpacity
                    style={styles.checkListContainer}
                    key={index}
                    onPress={() =>
                      doCompleteQuestion(data?.questionId, data?.answer, index)
                    }
                  >
                    <AntDesign
                      size={26}
                      name="checkcircleo"
                      color={
                        data?.answer == 0
                          ? LightTheme.colors.black
                          : "#29E33BC4"
                      }
                    />
                    <View style={{ flex: 1, marginLeft: 10  }}>
                      <Text style={styles.checkListFontStyle}>
                        {data.englishDescription}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View
            style={{
              alignContent: "flex-end",
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={handleSubmitQuestion}
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
                Continue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={mileStoneToggle} style={{
              alignSelf:"center",
              marginTop:10,
              width: 100,
              borderRadius: 5,
              height: 35,
              // backgroundColor: "#FFE053",
              // borderColor: LightTheme.colors.input_border_color,
              alignItems: "center",
              justifyContent: "center",
            }}>
                <Text
                style={[
                  styles.mileStoneHeaderFontStyle,
                  {
                    fontFamily: LightTheme.fontFamily.regular,
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

export default MileStoneModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modalSubContainer: {
    backgroundColor: LightTheme.colors.white,
    borderColor: LightTheme.colors.green_6,
    borderWidth: 3,
    marginHorizontal: 38,
    borderRadius: 14.5,
  },
  mileStoneHeader: {
    backgroundColor: LightTheme.colors.green_6,
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
  },
  mileStoneHeaderFontStyle: {
    fontSize: 18,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.black,
  },
  subContainer: {
    paddingHorizontal: 30,
  },
  instructionsFontStyle: {
    fontSize: 14,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: "#636363",
    textAlign: "center",
    marginTop: 19,
  },
  checkListContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  checkListFontStyle: {
    fontSize: 11.3,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: "#0000008C",
    // lineHeight:
  },
  continueBtn: {
    borderRadius: 5,
    height: 34,
    width: 103,
    marginTop: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LightTheme.colors.green_6,
    alignSelf: "center",
  },
  continueBtnText: {
    fontSize: 16,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
  },
  goBackFontStyle: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.regular,
    color: LightTheme.colors.black,
    marginTop: 12,
    marginBottom: 18,
    textAlign: "center",
  },
});
