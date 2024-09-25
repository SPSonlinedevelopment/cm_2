import { View, Text } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

interface FindMentorProps {
  size: number;
  loop: boolean;
}
const FindingMentor: React.FC<FindMentorProps> = ({ size, loop }) => {
  return (
    <View
      style={{
        height: size,
        aspectRatio: 0,

        // zIndex: 100,
        // position: "absolute",
        // top: 0,
      }}
    >
      <AnimatedLottieView
        source={require("../../../assets/timerAnimation.json")}
        style={{ flex: 1 }}
        autoPlay
        loop
        // resizeMode="contain"
      ></AnimatedLottieView>
    </View>
  );
};

export default FindingMentor;
