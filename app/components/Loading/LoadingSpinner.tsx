import { View, Text } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

interface LoadingProps {
  size: number;
}
const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <View
      testID="loading-spinner-indicator"
      style={{ height: size, aspectRatio: 1 }}
    >
      <AnimatedLottieView
        testID="lottie-view-test"
        source={require("../../../assets/loadingAnimation.json")}
        style={{ flex: 1 }}
        autoPlay
        loop
      ></AnimatedLottieView>
    </View>
  );
};

export default Loading;
