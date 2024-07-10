import { View, Text } from "react-native";
import React from "react";

const BorderUnderline = () => {
  return (
    <View className="w-[90%] my-4">
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#DCDCDC",
        }}
      ></View>
    </View>
  );
};

export default BorderUnderline;
