import Animated, { useSharedValue } from 'react-native-reanimated';
import { View, Button, Dimensions } from 'react-native';
import React from 'react';
import { Dots, DotsVariants, LoadingText } from './src/components';

const { width } = Dimensions.get('window');
const dots: DotsVariants[] = [
  'upNDown',
  'default',
  'snake',
  'zoom',
  'frequency',
  'flip',
  'skeeze',
  'shrink',
  'shiftUp',
];

const defaultDotStyle = {
  backgroundColor: 'white',
  size: 10,
  spacing: 5,
};

export default function AnimatedStyleUpdateExample(props) {
  const isLoading = useSharedValue<boolean>(false);
  const handlePress = () => {
    isLoading.value = !isLoading.value;
  };

  return (
    <View
      style={{
        padding: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#565DF6',
      }}
    >
      <LoadingText
        style={{ color: 'white', fontSize: 30 }}
        label={['L', 'o', 'a', 'd', 'i', 'n', 'g', '...']}
        isLoading={isLoading}
      />
      {dots.map((variant) => (
        <Dots key={variant} isLoading={isLoading} numberOfDots={3} styles={defaultDotStyle} variant={variant} />
      ))}
      <Button title="press me" onPress={handlePress} color="white" />
    </View>
  );
}
