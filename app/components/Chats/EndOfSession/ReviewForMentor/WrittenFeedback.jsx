import { View, Text, TextInput } from "react-native";
import React from "react";

const WrittenFeedback = ({ setFeedbackForm }) => {
  const handleChange = (text) => {
    setFeedbackForm((prev) => {
      return { ...prev, writtenFeedback: text };
    });
  };

  return (
    <View className="h-[120px] m-5 shadow-md rounded-full  flex  items-center justify-center">
      <Text className="text-base font-bold m-2"> Your comments</Text>
      <TextInput
        onChangeText={handleChange}
        placeholder="Say something to make their day..."
        className="h-[80px] w-full bg-white p-3   rounded-xl"
      ></TextInput>
    </View>
  );
};

export default WrittenFeedback;
