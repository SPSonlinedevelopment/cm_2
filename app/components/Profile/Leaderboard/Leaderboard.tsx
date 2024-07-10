import { View, Text } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Leaderboard = () => {
  return (
    <View className=" mt-5 w-[93%] ">
      <View className="flex flex-row">
        <MaterialIcons name="leaderboard" size={24} color="black" />
        <Text className="text-lg font-bold "> Leaderboard</Text>
      </View>
    </View>
  );
};

export default Leaderboard;
