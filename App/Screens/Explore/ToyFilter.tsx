import MultiSelectExample from "components/Multiselector";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "react-native-multiple-select";
import global from "../../styles/global";
import { actions } from "../../Redux/Toys/slice";
import { images } from "../../constants/img";
import BackHeader from "components/BackHeader";
import Done from "assets/svg/done.svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  selectAgeFilter,
  selectSelectedToyCategory,
  selectToyCategory,
} from "../../Redux/Toys/selectors.";
import { useTranslation } from "react-i18next";
import { LightTheme } from "utils/theme";
import { Dropdown } from "react-native-element-dropdown";

function Mealfilter(props: any) {
  const dispatch = useDispatch();
  const category = useSelector(selectToyCategory);

  const goBack = () => {
    dispatch(actions.setselectToyCategory([]));
    props.navigation.goBack();
  };
  const data = useSelector(selectAgeFilter);
  const [selectedPrevious, setSelectedPrevious] = useState(0);
  console.log(data, "data");

  const onSubmit = () => {
    dispatch(
      actions.changeFromValue({
        name: "id",
        value: selectedPrevious ? selectedPrevious : "",
      })
    );
    dispatch(actions.setLoading(true));
    dispatch(actions.setCurrentPage(1));
    dispatch(actions.setCategory(""));
    dispatch(actions.setRandomData([]));
    dispatch(actions.setList([]));
    dispatch(
      actions.doGetList({
        callback() {},
      })
    );
    dispatch(
      actions.doGetRandomList({
        callback() {},
      })
    );
    props.navigation.goBack();
  };
  const onSelectedItemsChange = (selectedItems: any) => {
    dispatch(actions.setselectToyCategory(selectedItems));
  };

  const categoryselected = useSelector(selectSelectedToyCategory);

  const { t } = useTranslation();
  const months = [
    { id: "1", title: "All", month: [0, 0] },
    { id: "2", title: "0 - 1 Year", month: [0, 12] },
    { id: "3", title: "1 - 2 Year", month: [12, 24] },
    { id: "4", title: "2 - 3 Year", month: [24, 36] },
    { id: "5", title: "3 - 4 Year", month: [36, 48] },
    { id: "6", title: "4 - 5 Year", month: [48, 60] },
  ];
  useEffect(() => {
    if (data.id) {
      setSelectedPrevious(Number(data.id));
    }

    return () => {};
  }, []);
  return (
    <SafeAreaView style={[global.wrap]}>
      <View style={[global.wrap, { padding: 30 }]}>
        <BackHeader
          iconStyle={undefined}
          title={""}
          titleStyle={{ fontSize: 27 }}
          RightIcon={<Done />}
          goback={goBack}
          rightIconOnPress={onSubmit}
        />
        <Image
          source={images.HEADER}
          resizeMode="stretch"
          style={[
            global.greenShder,
            { right: 0, transform: [{ rotateY: "180deg" }] },
          ]}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ padding: 16, top: 30 }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 10,
                color: "#00AAA8",
              }}
            >
              Select Age Range
            </Text>
            <View style={styles.container}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={{
                  color: LightTheme.colors.input_placeholder_color,
                  fontSize: 12,
                }}
                itemTextStyle={{ color: LightTheme.colors.black }}
                selectedTextStyle={styles.selectedTextStyle}
                data={months}
                maxHeight={300}
                labelField="title"
                valueField="id"
                placeholder={"Select Age Range"}
                searchPlaceholder={t("OTHER.SEARCH_ITEMS")}
                value={
                  selectedPrevious ? selectedPrevious.toString() : undefined
                }
                onChange={(item: any) => {
                  if (item.id == "1") {
                    dispatch(
                      actions.changeFromValue({
                        name: "isApplied",
                        value: false,
                      })
                    );
                  } else {
                    dispatch(
                      actions.changeFromValue({
                        name: "minAge",
                        value: item.month[0],
                      })
                    );
                    dispatch(
                      actions.changeFromValue({
                        name: "maxAge",
                        value: item.month[1],
                      })
                    );
                    dispatch(
                      actions.changeFromValue({
                        name: "isApplied",
                        value: true,
                      })
                    );
                  }
                  setSelectedPrevious(item.id);
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 10,
                color: "#00AAA8",
              }}
            >
              Select Toy Category
            </Text>
            <MultiSelect
              items={category}
              uniqueKey="_id"
              styleItemsContainer={{
                height: 300,
              }}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={categoryselected}
              searchInputPlaceholderText={t("EXPLORE.SEARCH_HERE")}
              tagRemoveIconColor="#00AAA8"
              tagBorderColor="#00AAA8"
              tagTextColor="#00AAA8"
              selectedItemTextColor="#00AAA8"
              selectedItemIconColor="#00AAA8"
              itemTextColor="black"
              displayKey="englishTitle"
              searchInputStyle={{ color: "#00AAA8" }}
              submitButtonColor="#00AAA8"
              submitButtonText={t("SUBMIT")}
            />
            <View style={{ marginTop: 20 }}>
              {categoryselected?.map((item: any, index: any) => (
                <Text key={index}>{item?.englishTitle}</Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Mealfilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "100%",
    height: 30,
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: LightTheme.colors.primary_btn,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbText: {
    color: "white",
  },
  dropdownButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  dropdownItemStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  rail: {
    flex: 1,
    height: 5,
    backgroundColor: LightTheme.colors.booking_border,
    borderRadius: 2.5,
  },
  railSelected: {
    height: 5,

    backgroundColor: LightTheme.colors.green_6,
    borderRadius: 2.5,
  },
  labelContainer: {
    position: "absolute",
    top: -20,
    paddingHorizontal: 5,
    backgroundColor: LightTheme.colors.booking_border,
  },

  labelText: {
    fontSize: 12,
    color: "black",
  },
  notch: {
    // width: 10,
    // height: 10,
    // backgroundColor: LightTheme.colors.booking_border,
    // borderRadius: 5,
  },
  dropdown: {
    width: "100%",
    marginBottom: 20,
    borderWidth: 1.5,
    color: LightTheme.colors.black,
    borderColor: LightTheme.colors.input_border_color,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 51,
  },

  selectedTextStyle: {
    fontSize: 15,
    color: "black",
  },
  icon: {
    marginRight: 5,
  },
});
