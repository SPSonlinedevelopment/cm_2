import { View, Text, TextInput } from "react-native";
import React from "react";

const WrittenFeedback = () => {
  return (
    <View className="h-[80px] m-5 shadow-md rounded-full">
      <TextInput
        placeholder="Say something to make their day..."
        className="h-full bg-white p-3   rounded-xl"
      ></TextInput>
    </View>
  );
};

export default WrittenFeedback;
