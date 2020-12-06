import React from "react";
import { View, ViewProps } from "react-native";

export interface DotProps {
  size: number;
  backgroundColor: string;
  spacing: number;
}
const Dot = ({ size, backgroundColor, spacing }: DotProps) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        backgroundColor,
        borderRadius: size / 2,
        margin: spacing,
      }}
    />
  );
};

export default Dot;
