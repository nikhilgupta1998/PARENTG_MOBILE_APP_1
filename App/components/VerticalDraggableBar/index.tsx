import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import Page from "./Page";


interface RangeSliderProps {

  onChange: (value:number)=>void;
}

const titles = ["", ""];

type ContextType = {
  x: number;
};
const MAX_TRANSLATE_X = -290 * (titles.length - 1);
const VerticalDraggableRangeSlider = (props:RangeSliderProps) => {
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(-10);
    const [valueCheck, setValueCheck] = useState(0)
  

    const clampedTranslateX = useDerivedValue(() => {
      return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
    });
    
    useDerivedValue(() => {
        runOnJS(setValueCheck)(clampedTranslateX.value+290)
    }, []); 

    useEffect(() => {
        props.onChange(valueCheck)
   
      return () => {};
    }, [valueCheck]);

    const panGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      ContextType
    >({
      onStart: (_, context) => {
        context.x = clampedTranslateX.value;
        cancelAnimation(translateX);
      },
      onActive: (event, context) => {
        translateX.value = event.translationY + context.x;
      },
      onEnd: (event) => {
        translateX.value = withDecay({ velocity: event.velocityY });
        translateY.value=withDecay({ velocity: event.velocityY });
      
      },
    });

  return (
    <GestureHandlerRootView style={{ height: 300, width: "100%" }}>
       <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={{
              height: 290,
              width: 137,
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: 5,
            }}
          >
            {titles.map((title, index) => {
              return (
                <Page
                  key={index.toString()}
                  translateX={clampedTranslateX}
                  index={index}
                  title={title}
                />
              );
            })}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  rangeBar: {
    width: 50,
    height: 300,
    backgroundColor: "lightgray",
    position: "relative",
  },
  range: {
    backgroundColor: "blue",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  handle: {
    width: 50,
    height: 10,
    backgroundColor: "red",
    position: "absolute",
  },
});

export default VerticalDraggableRangeSlider;
