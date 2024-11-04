import React, { useEffect, useState } from "react";
import { View, Animated, Text, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";
import IconGeneral from "../../IconGeneral";
import Book from "../../../../assets/icons/Achievements/Book.png";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default AnimatedCircleComponent = ({
  size,
  strokeWidth,
  percentage,
  text,
  bgColor,
  value,
}) => {
  console.log("🚀 ~ value:", value);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View className="flex justify-center items-center  relative  h-full w-full">
      <Text className="text-2xl font-pextrabold text-white absolute z-30 ">
        {text}
      </Text>

      {!text && (
        <Image
          style={{ pointerEvents: "none" }}
          className={`h-[${50}px] absolute z-30`}
          resizeMode="contain"
          source={Book}
        />
      )}

      <View className="absolute">
        <Svg height={size} width={size}>
          {/* Background circle */}
          <Circle
            opacity={0.4}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="lightgray"
            strokeWidth={strokeWidth}
            fill={bgColor}
          />
          {/* Animated progress circle */}

          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="purple"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </View>
    </View>
  );
};
