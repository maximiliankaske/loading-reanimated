import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, withDelay, withSpring } from 'react-native-reanimated';
import { toRad } from 'react-native-redash';
import { useDotsContext } from './Dots';

const inputRange2 = [0, 1];
const inputRange3 = [0, 0.5, 1];
const inputRange5 = [0, 0.25, 0.5, 0.75, 1];
const defaultRange = [0, 1, 0];
const zoomRange = [1, 1.5, 1];
const flipRange = [0, 180];
const skeezeScaleRange = [1, 1.3, 1];
const shrinkScaleRange = [2, 1.75, 1.5, 1.25, 1];
const shrinkOpacityRange = [0, 0.25, 0.5, 0.75, 1];
const shrinkScaleRange2 = [1, 0.75, 0.5, 0.25, 0];
const shiftUpScaleRange = [1, 0];
const shiftUpScaleRange2 = [0, 1];
const snakeOpacityRange2 = [0, 1];

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
  const { progress, variant, numberOfDots, duration } = useDotsContext();
  const isFirst = index === 0;
  const isLast = index === numberOfDots - 1;
  const delay = (index / numberOfDots) * duration;

  const upNDownRange = [0, spacing * 2, 0, -spacing * 2, 0];
  const snakeTranslateRange = [0, spacing * 2 + size];
  const snakeOpacityRange = [1, isLast ? 0 : 1];
  const snakeTranslateRange2 = [-(spacing * 2 + size), 0];
  const frequencyRange = [size, size * 3, size];
  const skeezeTranslateRange = [0, ((numberOfDots - 1) / 2 - index) * (size + 2 * spacing), 0];
  const shiftUpTranslateRange = [0, -(size + spacing)];
  const shiftUpTranslateRange2 = [size + spacing, 0];

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
    opacity: interpolate(progress.value, inputRange2, snakeOpacityRange),
    transform: [
      {
        translateX: interpolate(progress.value, inputRange2, snakeTranslateRange),
      },
    ],
  }));

  const snakeStyle2 = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, inputRange2, snakeOpacityRange2),
    transform: [
      {
        translateX: interpolate(progress.value, inputRange2, snakeTranslateRange2),
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

  const skeezeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, inputRange3, skeezeTranslateRange) },
      { scale: interpolate(progress.value, inputRange3, skeezeScaleRange) },
    ],
  }));

  const shrinkStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, inputRange5, shrinkOpacityRange),
    transform: [{ scale: interpolate(progress.value, inputRange5, shrinkScaleRange) }],
  }));

  const shrinkStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, inputRange5, shrinkScaleRange2) }],
  }));

  const shiftUp = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, inputRange2, shiftUpTranslateRange) },
      { scale: interpolate(progress.value, inputRange2, shiftUpScaleRange) },
    ],
  }));

  const shiftUp2 = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, inputRange2, shiftUpTranslateRange2) },
      { scale: interpolate(progress.value, inputRange2, shiftUpScaleRange2) },
    ],
  }));

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
      : variant === 'skeeze'
      ? skeezeStyle
      : variant === 'shrink'
      ? shrinkStyle
      : variant === 'shiftUp'
      ? shiftUp
      : upNDownStyle;

  return (
    <View>
      {variant === 'default' ? <View style={[StyleSheet.absoluteFill, staticStyle(styles).border]} /> : null}
      {variant === 'shrink' ? (
        <Animated.View style={[StyleSheet.absoluteFill, staticStyle(styles).default, shrinkStyle2]} />
      ) : null}
      {variant === 'shiftUp' ? (
        <Animated.View style={[StyleSheet.absoluteFill, staticStyle(styles).default, shiftUp2]} />
      ) : null}
      {variant === 'snake' && isFirst ? (
        <Animated.View style={[StyleSheet.absoluteFill, staticStyle(styles).default, snakeStyle2]} />
      ) : null}
      <Animated.View style={[staticStyle(styles).default, style]} />
    </View>
  );
};

const staticStyle = ({ size, backgroundColor, spacing }: DotStyles) =>
  StyleSheet.create({
    default: {
      height: size,
      width: size,
      backgroundColor,
      borderColor: backgroundColor,
      borderRadius: size / 2,
      margin: spacing,
    },
    border: {
      height: size,
      width: size,
      borderWidth: 1,
      borderColor: backgroundColor,
      borderRadius: size / 2,
      margin: spacing,
    },
  });

export default Dot;
