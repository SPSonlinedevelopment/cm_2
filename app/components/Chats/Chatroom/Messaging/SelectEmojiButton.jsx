import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SelectEmojiButton = ({ setDisplayEmojiSelector }) => {
  return (
    <TouchableOpacity
      className=""
      onPress={() => setDisplayEmojiSelector((prev) => !prev)}
    >
      <Text className="text-base">😊</Text>
    </TouchableOpacity>
  );
};

export default SelectEmojiButton;
