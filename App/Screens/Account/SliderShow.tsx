import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { width } from "../../constants/Dimenstions";
import { LightTheme } from "utils/theme";
import { images } from "../../constants/img";

const SlideShow = ({ selectedPlan }: any) => {
  // console.log(selectedPlan, "selectedPlanProps");

  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {
      text: "Community",
      isSHow: selectedPlan?.community,
      color: LightTheme.colors.violet_primary,
    },
    {
      text: "Milestone",
      isSHow: selectedPlan?.milestone,
      color: LightTheme.colors.green_5,
    },
    {
      text: "Blogs",
      isSHow: selectedPlan?.blogs,
      color: LightTheme.colors.yellow_primary,
    },
    {
      text: "Toy",
      isSHow: selectedPlan?.toy,
      color: LightTheme.colors.green_6,
    },
    {
      text: "Tracker",
      isSHow: selectedPlan?.tracker,
      color: LightTheme.colors.red_2,
    },
    {
      text: "Meal Chat",
      isSHow: selectedPlan?.mealChat,
      color: LightTheme.colors.textColor2,
    },
    {
      text: "Vaccination",
      isSHow: selectedPlan?.vaccination,
      color: LightTheme.colors.yellow_4,
    },
  ];
  const renderItem = ({ item, index }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 2,
        }}
      >
        <Text
          style={[
            styles.slideText,
            {
              color: LightTheme.colors.textColor2,
            },
          ]}
        >
          {item.text}
        </Text>
        <View>
          {item.isSHow == 1 ? (
            <Image source={images.COMPLETE} />
          ) : (
            <Image source={images.NOTCOMPLETE} />
          )}
        </View>
      </View>
    );
  };

  const keyExtractor = (_: any, index: any) => index.toString();

  const onEndReached = () => {
    // Handle the end of the slideshow (if needed)
    // For simplicity, this example loops back to the first slide.
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <FlatList
      data={data}
      style={{
        marginTop: 10,
        width: "80%",
      }}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      initialScrollIndex={currentIndex}
    />
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
  },
  slideText: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.semiBold,
  },
  eventDotActive: {
    marginTop: 8,
    height: 10,
    width: 10,
    borderRadius: 50,
  },
});

export default SlideShow;
