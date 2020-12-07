import React from "react";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { toRad } from "react-native-redash";
import { useDotsContext } from "./Dots";

export interface DotStyles {
  size: number;
  backgroundColor: string;
  spacing: number;
}
export interface DotProps {
  index: number;
  styles: DotStyles;
}
const Dot = ({ index, styles }: DotProps) => {
  const { size, backgroundColor, spacing } = styles;
  const { progress, variant, numberOfDots } = useDotsContext();
  const inputRange = [0, 0.25, 0.5, 0.75, 1];
  const upNDownRange = [0, spacing * 2, 0, -spacing * 2, 0];
  const snakeRange = [
    -(spacing + size) * 2,
    -(spacing + size) * 1.5,
    -(spacing + size),
    -(spacing + size) * 0.5,
    0,
  ];
  const opacityRange = [1, 0.5, 0, 0.5, 1];
  const zoomRange = [1, 1.2, 1.4, 1.2, 1];
  const frequencyRange = [size, size * 1.5, size * 2, size * 1.5, size];
  const flipRange = [0, 45, 90, 135, 180];

  const defaultStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, inputRange, opacityRange),
  }));

  const upNDownStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(progress.value, inputRange, upNDownRange),
      },
    ],
  }));

  const snakeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, inputRange, opacityRange),
    transform: [
      {
        translateX: interpolate(progress.value, inputRange, snakeRange),
      },
    ],
  }));

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, inputRange, zoomRange) }],
  }));

  const frequencyStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, inputRange, frequencyRange),
  }));

  const flipStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateX: toRad(interpolate(progress.value, inputRange, flipRange)) },
    ],
  }));

  const skeezeStyle = useAnimatedStyle(() => ({}));

  const style =
    variant === "default"
      ? defaultStyle
      : variant === "snake"
      ? snakeStyle
      : variant === "zoom"
      ? zoomStyle
      : variant === "frequency"
      ? frequencyStyle
      : variant === "flip"
      ? flipStyle
      : upNDownStyle;

  return (
    <Animated.View
      style={[
        {
          height: size,
          width: size,
          backgroundColor,
          borderColor: backgroundColor,
          borderRadius: size / 2,
          margin: spacing,
        },
        style,
      ]}
    ></Animated.View>
  );
};

export default Dot;
