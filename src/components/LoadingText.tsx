import React from 'react';
import { TextProps, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface LoadingTextProps extends TextProps {
  label: string[] | string;
  isLoading: Animated.SharedValue<boolean>;
}
const LoadingText = ({ label: defaultLabel, isLoading, style, ...props }: LoadingTextProps) => {
  const label = typeof defaultLabel === 'string' ? defaultLabel.split('') : defaultLabel;
  const progress = useDerivedValue(() => withTiming(isLoading.value ? 2 : 0, { duration: 1000 }));
  const inputRange = [0, 1, 2];
  const outputRange = [0, -20, 0];

  return (
    <View style={{ flexDirection: 'row' }}>
      {label.map((s, idx) => {
        const translateY = useDerivedValue(() => interpolate(progress.value, inputRange, outputRange));
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            {
              translateY: withSpring(translateY.value),
            },
          ],
        }));
        return (
          <Animated.Text key={idx} style={[style, animatedStyle]} {...props}>
            {s}
          </Animated.Text>
        );
      })}
    </View>
  );
};

export default LoadingText;
