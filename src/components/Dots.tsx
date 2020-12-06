import React from "react";
import { View } from "react-native";
import Dot, { DotProps } from "./Dot";

interface DotsProps {
  dotProps: DotProps;
  numberOfDots: number;
}
const Dots = ({ numberOfDots, dotProps }: DotsProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {[...new Array(numberOfDots).fill(0)].map((_) => (
        <Dot {...dotProps} />
      ))}
    </View>
  );
};

export default Dots;
