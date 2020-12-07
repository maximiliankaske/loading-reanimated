import React, { ReactNode } from "react";
import { View } from "react-native";

interface DotsWrapperProps {
  children: ReactNode;
}
const DotsWrapper = ({ children }: DotsWrapperProps) => {
  return (
    <View
      style={{
        width: 120,
        height: 40,
        margin: 10,
        borderRadius: 20,
        backgroundColor: "#696EF6",
      }}
    >
      {children}
    </View>
  );
};

export default DotsWrapper;
