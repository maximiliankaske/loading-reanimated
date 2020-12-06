import React, { createContext, useContext, useEffect } from "react";
import { View } from "react-native";
import Dot, { DotProps } from "./Dot";
import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface DotsContextProps {
  progress: Animated.SharedValue<number>;
  numberOfDots: number;
}

const DotsContext = createContext<DotsContextProps>({
  progress: undefined,
  numberOfDots: 0,
});

export const useDotsContext = () => {
  const context = useContext(DotsContext);
  if (!context) {
    throw new Error(
      "Dots Compound Component child should be in Dots Component"
    );
  }
  return context;
};

interface DotsProps {
  dotProps: DotProps;
  numberOfDots: number;
  isLoading: Animated.SharedValue<boolean>;
}
const Dots = ({ numberOfDots, dotProps, isLoading }: DotsProps) => {
  const progress = useDerivedValue(() =>
    withTiming(isLoading.value ? 1 : 0, { duration: 1000 })
  );
  const value = { progress, numberOfDots };

  return (
    <DotsContext.Provider value={value}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {[...new Array(numberOfDots).fill(0)].map((_, idx) => (
          <Dot key={idx} {...dotProps} />
        ))}
      </View>
    </DotsContext.Provider>
  );
};

export default Dots;
