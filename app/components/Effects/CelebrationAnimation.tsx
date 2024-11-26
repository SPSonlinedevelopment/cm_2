import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

interface CelebrationProps {
  size: number;
  loop: any;
  position: string;
}
const CelebrationAnimation: React.FC<CelebrationProps> = ({
  position,
  size,
  loop,
}) => {
  let assignPos: object = { bottom: "20%" };
  if (position === "top") {
    assignPos = { top: "20%" };
  }

  return (
    <View
      testID="celebration_animation"
      style={{
        flex: 1,
        width: "100%",
        height: size,
        aspectRatio: 1,
        zIndex: 100,
        position: "absolute",
        ...assignPos,
        pointerEvents: "none",
      }}
    >
      <LottieView
        // testID="lottie_view"
        source={require("../../../assets/celebrationAnimation.json")}
        style={{ flex: 1 }}
        autoPlay
        loop={loop}
      ></LottieView>
    </View>
  );
};

export default CelebrationAnimation;
