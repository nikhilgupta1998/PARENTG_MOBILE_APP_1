import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import BackHeader from "components/BackHeader";
import { images } from "../../constants/img";
import global from "../../styles/global";
import BookMarkComp from "components/BookMarkComp";
import { LightTheme } from "../../utils/theme";
import FilterIcon from "assets/icons/filter.svg";
import BookMarkFilter from "./BookMarkFilter";
import { useTranslation } from "react-i18next";

const BookMarks = () => {
  const filterData = ["DOCTORS", "NUTRIONIST", "TEACHERS", "MEALS", "TOYS"];
  const [filterValue, setFilterValue] = useState(0);
  const [open, setOpen] = useState(false);
  const data = [
    {
      name: "Dr. Angelia Jhonson",
      exp: "15 Years Experience",
      profession: "Cardiologist",
    },
    {
      name: "Dr. Angelia Jhonson",
      exp: "15 Years Experience",
      profession: "Cardiologist",
    },
    {
      name: "Dr. Angelia Jhonson",
      exp: "15 Years Experience",
      profession: "Cardiologist",
    },
  ];
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { paddingVertical: 30, paddingHorizontal: 25 }]}>
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <BackHeader  iconStyle={undefined}  title={t("BOOKMARKS")} goback={undefined} rightIconOnPress={undefined} />
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.filterWrap}
      >
        <Text style={styles.filterValue}>{filterData[filterValue] }</Text>
        
        <FilterIcon />
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <BookMarkComp
            key={index}
            name={item?.name}
            exp={item?.exp}
            profession={item?.profession}
          />
        )}
      />
      <BookMarkFilter
        open={open}
        setOpen={setOpen}
        data={filterData}
        onPress={(i: number) => setFilterValue(i)}
      />
    </View>
  );
};

export default BookMarks;

const styles = StyleSheet.create({
  filterWrap: {
    width: "100%",
    height: 59,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginVertical: 30,
    borderWidth: 2,
    borderColor: LightTheme.colors.yellow_3,
    backgroundColor: LightTheme.colors.background,
    borderRadius: 10,
    elevation: 10,
  },

  filterValue: {
    fontFamily: LightTheme.fontFamily.medium,
    fontSize: 17,
    color: LightTheme.colors.headerTextColor_2,
  },
});
