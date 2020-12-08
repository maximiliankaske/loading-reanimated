import React from 'react';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { toRad } from 'react-native-redash';
import { useDotsContext } from './Dots';

const inputRange2 = [0, 1];
const inputRange3 = [0, 0.5, 1];
const inputRange5 = [0, 0.25, 0.5, 0.75, 1];
const defaultRange = [1, 0, 1];
const zoomRange = [1, 1.4, 1];
const flipRange = [0, 180];
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
  const upNDownRange = [0, spacing * 2, 0, -spacing * 2, 0];
  const snakeRange = [-(spacing + size) * 2, 0];
  const frequencyRange = [size, size * 2, size];

  const defaultStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, inputRange3, defaultRange),
  }));

  const upNDownStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(progress.value, inputRange5, upNDownRange),
      },
    ],
  }));

  const snakeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, inputRange2, snakeRange),
      },
    ],
  }));

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, inputRange3, zoomRange) }],
  }));

  const frequencyStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, inputRange3, frequencyRange),
  }));

  const flipStyle = useAnimatedStyle(() => ({
    transform: [{ rotateX: toRad(interpolate(progress.value, inputRange2, flipRange)) }],
  }));

  const skeezeStyle = useAnimatedStyle(() => ({}));

  const style =
    variant === 'default'
      ? defaultStyle
      : variant === 'snake'
      ? snakeStyle
      : variant === 'zoom'
      ? zoomStyle
      : variant === 'frequency'
      ? frequencyStyle
      : variant === 'flip'
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
