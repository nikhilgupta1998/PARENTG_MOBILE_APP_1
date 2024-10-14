import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface PageProps {
  index: number;
  title: string;
  translateX: Animated.SharedValue<number>;
}

const { width: PAGE_WIDTH ,height:PAGE_HEIGHT} = Dimensions.get('window');

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const pageOffset = 290 * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateX.value + pageOffset }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(0,209,207,${ index==0?'0.0':'1'})`,
          height:300,
        //   alignItems: 'center',
        //   justifyContent: 'center',
        },
        rStyle,
      ]}
    >
      
    </Animated.View>
  );
};

export { PAGE_WIDTH ,PAGE_HEIGHT};
export default Page;

const styles = StyleSheet.create({});