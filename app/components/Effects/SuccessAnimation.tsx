import { View, Text } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

interface SuccessProps {
  size: number;
}
const SuccessAnimation: React.FC<SuccessProps> = ({ size }) => {
  return (
    <View
      style={{
        height: size,
        aspectRatio: 1,
        // zIndex: 100,
        // position: "absolute",
        // top: 0,
      }}
    >
      <AnimatedLottieView
        source={require("../../../assets/successAnimation.json")}
        style={{ flex: 1 }}
        autoPlay
        loop
      ></AnimatedLottieView>
    </View>
  );
};

export default SuccessAnimation;
