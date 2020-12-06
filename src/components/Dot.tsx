import React from "react";
import { View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated";
import { useDotsContext } from "./Dots";

export interface DotProps {
  size: number;
  backgroundColor: string;
  spacing: number;
}
const Dot = ({ size, backgroundColor, spacing }: DotProps) => {
  const { progress } = useDotsContext();
  const inputRange = [0, 0.25, 0.5, 0.75, 1];
  const upNDown = [0, spacing, 0, -spacing, 0];
  const opacityRange = [1, 0.5, 0, 0.5, 1];

  const translateY = useDerivedValue(() =>
    interpolate(progress.value, inputRange, upNDown)
  );
  const opacity = useDerivedValue(() =>
    interpolate(progress.value, inputRange, opacityRange)
  );

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));
  return (
    <Animated.View
      style={[
        {
          height: size,
          width: size,
          backgroundColor,
          borderRadius: size / 2,
          margin: spacing,
        },
        style,
      ]}
    />
  );
};

export default Dot;
