import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated";
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
  const { progress, variant } = useDotsContext();
  const inputRange = [0, 0.25, 0.5, 0.75, 1];
  const upNDown = [0, spacing, 0, -spacing, 0];
  const opacityRange = [1, 0.5, 0, 0.5, 1];

  const translateY = useDerivedValue(() =>
    interpolate(progress.value, inputRange, upNDown)
  );
  const opacity = useDerivedValue(() =>
    interpolate(progress.value, inputRange, opacityRange)
  );

  const defaultStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const upNDownStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  const style = variant === "default" ? defaultStyle : upNDownStyle;

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
