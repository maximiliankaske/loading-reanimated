import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button } from "react-native";
import React from "react";
import { Dots } from "./src/components";

export default function AnimatedStyleUpdateExample(props) {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Dots
        numberOfDots={3}
        dotProps={{
          backgroundColor: "red",
          size: 20,
          spacing: 5,
        }}
      />
    </View>
  );
}
