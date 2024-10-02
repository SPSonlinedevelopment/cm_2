import { View, Text } from "react-native";
import React from "react";
import * as Svg from "react-native-svg";

interface AchievementProps {
  percentageCompletion: Number;
}

const Achievement: React.FC<AchievementProps> = ({ percentageCompletion }) => {
  return (
    <View>
      <Text>Achievement</Text>
    </View>
  );
};

export default Achievement;
