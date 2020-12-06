import Animated, { useSharedValue } from "react-native-reanimated";
import { View, Button } from "react-native";
import React from "react";
import { Dots } from "./src/components";

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
      <Dots
        isLoading={isLoading}
        numberOfDots={3}
        dotProps={{
          backgroundColor: "red",
          size: 20,
          spacing: 5,
        }}
      />
      <View style={{ flex: 1 }}>
        <Button title="press me" onPress={handlePress} />
      </View>
    </View>
  );
}
