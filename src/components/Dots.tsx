import React, { createContext, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Dot, { DotStyles } from './Dot';
import Animated, { useDerivedValue, withTiming, withRepeat, useSharedValue } from 'react-native-reanimated';
import { DotsWrapper } from '.';

export type Variants =
  | 'upNDown'
  | 'default'
  | 'snake'
  | 'zoom'
  | 'frequency'
  | 'flip'
  | 'skeeze'
  | 'shrink'
  | 'shiftUp';

interface DotsContextProps {
  progress: Animated.SharedValue<number>;
  numberOfDots: number;
  variant: Variants;
  duration: number;
}

const DotsContext = createContext<DotsContextProps>({
  progress: undefined,
  numberOfDots: 0,
  variant: 'default',
  duration: 0,
});

export const useDotsContext = () => {
  const context = useContext(DotsContext);
  if (!context) {
    throw new Error('Dots Compound Component child should be in Dots Component');
  }
  return context;
};

interface DotsProps {
  styles: DotStyles;
  numberOfDots: number;
  isLoading: Animated.SharedValue<boolean>;
  variant?: Variants;
  reverse?: boolean;
  duration?: number;
}
const Dots = ({
  numberOfDots,
  styles,
  isLoading,
  variant = 'default',
  reverse = false,
  duration = 1000,
}: DotsProps) => {
  const progress = useDerivedValue(() => withRepeat(withTiming(isLoading.value ? 1 : 0, { duration }), -1));

  const value = { progress, numberOfDots, variant, duration };

  return (
    <DotsContext.Provider value={value}>
      <DotsWrapper styles={styles}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          {[...new Array(numberOfDots).fill(0)].map((_, idx) => (
            <Dot key={idx} index={idx} styles={styles} />
          ))}
        </View>
      </DotsWrapper>
    </DotsContext.Provider>
  );
};

export default Dots;
