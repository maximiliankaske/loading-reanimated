import React, { createContext, useContext, useEffect } from "react";
import { View } from "react-native";
import Dot, { DotStyles } from "./Dot";
import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Variants = "upNDown" | "default";

interface DotsContextProps {
  progress: Animated.SharedValue<number>;
  numberOfDots: number;
  variant: Variants;
}

const DotsContext = createContext<DotsContextProps>({
  progress: undefined,
  numberOfDots: 0,
  variant: "default",
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
  styles: DotStyles;
  numberOfDots: number;
  isLoading: Animated.SharedValue<boolean>;
  variant?: Variants;
}
const Dots = ({
  numberOfDots,
  styles,
  isLoading,
  variant = "default",
}: DotsProps) => {
  const progress = useDerivedValue(() =>
    withTiming(isLoading.value ? 1 : 0, { duration: 1000 })
  );
  const value = { progress, numberOfDots, variant };

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
          <Dot key={idx} index={idx} styles={styles} />
        ))}
      </View>
    </DotsContext.Provider>
  );
};

export default Dots;
