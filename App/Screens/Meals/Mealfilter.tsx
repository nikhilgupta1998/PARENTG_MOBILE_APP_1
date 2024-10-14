import React, { useEffect, useState } from "react";
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
import { actions } from "../../Redux/Meals/slice";

import {
  selecIngrident,
  selectCategoryList,
  selectIngridentList,
  selectfilterCategoryform,
} from "../../Redux/Meals/selectors.";
import { images } from "../../constants/img";
import BackHeader from "components/BackHeader";
import { SCREENS } from "../../constants/var";
import { Dropdown } from "react-native-element-dropdown";
import { LightTheme } from "utils/theme";
import Done from "assets/svg/done.svg";
import { useTranslation } from "react-i18next";

function Mealfilter(props: any) {
  const dispatch = useDispatch();

  const ingrident = useSelector(selectIngridentList);
  const category = useSelector(selectCategoryList);
  const goBack = () => {
    dispatch(actions.setIngrident([]));
    props.navigation.goBack();
  };
  const [selectIngrideint, setSelectIngrideint] = useState([]);
  const onSubmit = () => {
    dispatch(
      actions.doSendFilter({
        callback() {
          props.navigation.goBack();
        },
      })
    );
  };

  const onSelectedItemsIngreChange = (selectedItems: any) => {
    setSelectIngrideint(selectedItems);
    dispatch(actions.setIngrident(selectedItems));
  };
  const filter = useSelector(selectfilterCategoryform);
  const Ingridentselected = useSelector(selecIngrident);
  useEffect(() => {
    dispatch(
      actions.doGetFilterData({
        callback() {},
      })
    );

    return () => {};
  }, []);
  const { t } = useTranslation();
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
          <View>
            <View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 14, marginBottom: 0, color: "#00AAA8" }}
                >
                  {t("OTHER.NOT_INCLUDE")}
                </Text>
                <MultiSelect
                  items={ingrident}
                  uniqueKey="_id"
                  onSelectedItemsChange={onSelectedItemsIngreChange}
                  selectedItems={Ingridentselected}
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
                <View style={{ marginTop: 30 }}>
                  {Ingridentselected.map((item: any, index: any) => (
                    <Text key={index}>{item?.englishTitle}</Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View>
            <View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ fontSize: 14, marginBottom: 10, color: "#00AAA8" }}
                >
                  {t("OTHER.SELECT_BREAKFAST_CATEGORY")}
                </Text>
                <Dropdown
                  style={[styles.filterWrap]}
                  itemTextStyle={{ color: "black" }}
                  selectedTextStyle={styles.filterValue}
                  data={[...category, { _id: "", englishTitle: "All" }]}
                  placeholder={t("OTHER.SELECT_CATEGORY")}
                  searchPlaceholder={t("OTHER.SEARCH_ITEMS")}
                  value={filter.breakfast}
                  onChange={(item: any) => {
                    dispatch(
                      actions.updateFilterFormValue({
                        key: "breakfast",
                        value: item?._id,
                      })
                    );
                  }}
                  labelField="englishTitle"
                  valueField="_id"
                />
              </View>
            </View>
          </View>
          <View>
            <View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 14, marginBottom: 10, color: "#00AAA8" }}
                >
                  {t("OTHER.SELECT_LUNCH_CATEGORY")}
                </Text>
                <Dropdown
                  style={[styles.filterWrap]}
                  itemTextStyle={{ color: "black" }}
                  selectedTextStyle={styles.filterValue}
                  data={[...category, { _id: "", englishTitle: "All" }]}
                  placeholder={t("OTHER.SELECT_CATEGORY")}
                  searchPlaceholder={t("OTHER.SEARCH_ITEMS")}
                  value={filter.lunch}
                  onChange={(item: any) => {
                    dispatch(
                      actions.updateFilterFormValue({
                        key: "lunch",
                        value: item?._id,
                      })
                    );
                  }}
                  labelField="englishTitle"
                  valueField="_id"
                />
              </View>
            </View>
          </View>
          <View>
            <View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 14, marginBottom: 10, color: "#00AAA8" }}
                >
                  {t("OTHER.SELECT_SNACKS_CATEGORY")}
                </Text>
                <Dropdown
                  style={[styles.filterWrap]}
                  itemTextStyle={{ color: "black" }}
                  selectedTextStyle={styles.filterValue}
                  data={[...category, { _id: "", englishTitle: "All" }]}
                  placeholder={t("OTHER.SELECT_CATEGORY")}
                  searchPlaceholder={t("OTHER.SEARCH_ITEMS")}
                  value={filter.snack}
                  onChange={(item: any) => {
                    dispatch(
                      actions.updateFilterFormValue({
                        key: "snack",
                        value: item?._id,
                      })
                    );
                  }}
                  labelField="englishTitle"
                  valueField="_id"
                />
              </View>
            </View>
          </View>
          <View>
            <View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 14, marginBottom: 10, color: "#00AAA8" }}
                >
                  {t("OTHER.SELECT_DINNER_CATEGORY")}
                </Text>
                <Dropdown
                  style={[styles.filterWrap]}
                  itemTextStyle={{ color: "black" }}
                  selectedTextStyle={styles.filterValue}
                  data={[...category, { _id: "", englishTitle: "All" }]}
                  placeholder={t("OTHER.SELECT_CATEGORY")}
                  searchPlaceholder={t("OTHER.SEARCH_ITEMS")}
                  value={filter.dinner}
                  onChange={(item: any) => {
                    dispatch(
                      actions.updateFilterFormValue({
                        key: "dinner",
                        value: item?._id,
                      })
                    );
                  }}
                  labelField="englishTitle"
                  valueField="_id"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default Mealfilter;
const styles = StyleSheet.create({
  filterWrap: {
    width: "100%",
    height: 60,
    paddingHorizontal: 15,
    // marginVertical: 30,
    borderWidth: 2,
    borderColor: LightTheme.colors.yellow_3,
    backgroundColor: LightTheme.colors.background,
    borderRadius: 10,
    elevation: 3,
  },

  filterValue: {
    fontFamily: LightTheme.fontFamily.medium,
    fontSize: 14,
    flexWrap: "wrap",
    color: LightTheme.colors.headerTextColor_2,
  },
});
