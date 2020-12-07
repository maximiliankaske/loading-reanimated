import Animated, { useSharedValue } from "react-native-reanimated";
import { View, Button, Dimensions } from "react-native";
import React from "react";
import { Dots } from "./src/components";

const { width } = Dimensions.get("window");

const defaultDotStyle = {
  backgroundColor: "white",
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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#565DF6",
      }}
    >
      <Dots isLoading={isLoading} numberOfDots={3} styles={defaultDotStyle} />
      <Dots
        isLoading={isLoading}
        numberOfDots={3}
        styles={defaultDotStyle}
        variant="upNDown"
      />
      <Dots
        isLoading={isLoading}
        numberOfDots={3}
        styles={defaultDotStyle}
        variant="snake"
      />
      <Dots
        isLoading={isLoading}
        numberOfDots={3}
        styles={defaultDotStyle}
        variant="zoom"
      />
      <Dots
        isLoading={isLoading}
        numberOfDots={3}
        styles={defaultDotStyle}
        variant="frequency"
      />
      <Dots
        isLoading={isLoading}
        numberOfDots={3}
        styles={defaultDotStyle}
        variant="flip"
      />
      <Button title="press me" onPress={handlePress} color="white" />
    </View>
  );
}
