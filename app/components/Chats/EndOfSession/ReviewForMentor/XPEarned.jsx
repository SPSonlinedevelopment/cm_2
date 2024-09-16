import { View, Text } from "react-native";
import React from "react";
import SuccessAnimation from "../../../Effects/SuccessAnimation";

const XPEarned = () => {
  return (
    <View className="flex items-center border-b-4 border-gray-200">
      <View className="m-3">
        <Text className="text-lg">Congratulations on your session!</Text>
      </View>

      <Text className="text-xl font-bold">
        You just earned <Text className="text-xl text-orange">3</Text> Xp
      </Text>
      <SuccessAnimation size={150} />
    </View>
  );
};

export default XPEarned;
