import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SelectEmojiButton = ({ setDisplayEmojiSelector }) => {
  return (
    <TouchableOpacity onPress={() => setDisplayEmojiSelector((prev) => !prev)}>
      <Text>😊</Text>
    </TouchableOpacity>
  );
};

export default SelectEmojiButton;
