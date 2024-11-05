import { Text, View, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/context/authContext";

const ProgressBar = () => {
  // Initial progress percentage

  const { userDetails } = useAuth();
  console.log("🚀 ~ ProgressBar ~ userDetails232:", userDetails);

  // const questions = userDetails?.menteeStatistics.questions;
  const question = 100;

  const [progress] = useState(question);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the progress bar to the desired percentage
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 800, // Animation duration in milliseconds
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedStyle = {
    height: 20,
    width: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
    borderRadius: 20,
    backgroundColor: "rgb(243, 112, 33)",
    position: "absolute",
    left: 0,
  };

  return (
    <View style={{ marginTop: 12 }}>
      <View
        className="shadow"
        style={{
          position: "relative",
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "rgb(254, 226, 211)",
          overflow: "hidden",
        }}
      >
        {/* Animated progress bar */}
        <Animated.View style={animatedStyle} />

        {/* Percentage text */}
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Text>{`${progress}%`}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;
