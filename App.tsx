import Animated, { useSharedValue } from "react-native-reanimated";
import { View, Button } from "react-native";
import React from "react";
import { Dots } from "./src/components";

const defaultDotStyle = {
  backgroundColor: "red",
  size: 20,
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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1 }}>
        <Dots isLoading={isLoading} numberOfDots={3} styles={defaultDotStyle} />
        <Dots
          isLoading={isLoading}
          numberOfDots={3}
          styles={defaultDotStyle}
          variant="upNDown"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button title="press me" onPress={handlePress} />
      </View>
    </View>
  );
}
