import { View, Text } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

interface CelebrationProps {
  size: number;
  loop: boolean;
}
const CelebrationAnimation: React.FC<CelebrationProps> = ({ size, loop }) => {
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
        source={require("../../../assets/celebrationAnimation.json")}
        style={{ flex: 1 }}
        autoPlay
        loop={loop}
      ></AnimatedLottieView>
    </View>
  );
};

export default CelebrationAnimation;
