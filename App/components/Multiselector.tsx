import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import MultiSelect from "react-native-multiple-select";
interface MultiselectorProps {
  items: any;
  setSelectedItems: any;
  selectedItems: any;
  title: any;
}
const MultiSelectExample = (props: any, propsSelector: any) => {
  const onSelectedItemsChange = (selectedItems: any) => {
    props.setSelectedItems(selectedItems);
  };
  const { t } = useTranslation();
  return (
    <View >
      <View style={{ padding: 16, top: 30 }}>
        <Text style={{ fontSize: 14, marginBottom: 10, color: "#00AAA8" }}>
          {props.title}
        </Text>
        <MultiSelect
          items={props.items}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={props.selectedItems}
          searchInputPlaceholderText={t("OTHER.SEARCH_ITEMS")}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#00AAA8"
          tagBorderColor="#00AAA8"
          tagTextColor="#00AAA8"
          selectedItemTextColor="#00AAA8"
          selectedItemIconColor="#00AAA8"
          itemTextColor="black"
          displayKey="name"
          searchInputStyle={{ color: "#00AAA8" }}
          submitButtonColor="#00AAA8"
          submitButtonText={t("SUBMIT")}
        />
        <View style={{ marginTop: 20 }}>
          {props.selectedItems.map((item: any, index: any) => (
            <Text key={index}>{item?.name}</Text>
          ))}
        </View>
      </View>
 </View>
  );
};

export default MultiSelectExample;
