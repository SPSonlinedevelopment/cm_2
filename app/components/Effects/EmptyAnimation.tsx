import { View, Text } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

interface EmptyAnimationProps {
  size: number;
  loop: boolean;
}
const EmptyAnimation: React.FC<EmptyAnimationProps> = ({ size, loop }) => {
  return (
    <View
      style={{
        flex: 1,
        // width: "100%",
        height: size,
        aspectRatio: 1,
        zIndex: 100,
        position: "absolute",
        top: 0,
      }}
    >
      <AnimatedLottieView
        source={require("../../../assets/emptyAnimation.json")}
        style={{ flex: 1 }}
        autoPlay
        loop={loop}
      ></AnimatedLottieView>
    </View>
  );
};

export default EmptyAnimation;
