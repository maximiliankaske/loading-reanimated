import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { DotStyles } from './Dot';
import { useDotsContext } from './Dots';

interface DotsWrapperProps {
  children: ReactNode;
  styles: DotStyles;
}
const DotsWrapper = ({ children, styles }: DotsWrapperProps) => {
  const { numberOfDots } = useDotsContext();
  const { size, spacing } = styles;
  const height = size * 3 + spacing * 2;
  const width = (size + spacing * 2) * (numberOfDots + 2);
  return (
    <View
      style={{
        width,
        height,
        margin: 2,
        borderRadius: height / 2,
        backgroundColor: '#696EF6',
      }}
    >
      {children}
    </View>
  );
};

export default DotsWrapper;
