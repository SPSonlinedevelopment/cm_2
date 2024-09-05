import { View, Text } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

interface LoadingProps {
  size: number;
}
const LoadingDots: React.FC<LoadingProps> = ({ size }) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <AnimatedLottieView
        source={require("../../../assets/LoadingTextAnimation.json")}
        style={{ flex: 1 }}
        autoPlay
        loop
      ></AnimatedLottieView>
    </View>
  );
};

export default LoadingDots;
