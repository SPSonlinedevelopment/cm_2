import { View, ScrollView, Text, TouchableOpacity } from "react-native";

import React from "react";

const topEmojis = [
  "😀",
  "😂",
  "😍",
  "😢",
  "😎",
  "😡",
  "😱",
  "👍",
  "🎉",
  "❤️",
  "🥳",
  "😇",
  "🤔",
  "😴",
  "🤗",
  "💔",
  "🌟",
  "🔥",
  "💯",
  "🙌",
  "🐶",
];

const SelectEmoji = ({ displayEmojiSelector, setText }) => {
  const handlePress = (emoji) => {
    setText((prev) => prev + emoji);
  };

  return (
    displayEmojiSelector && (
      <View className="bg-transparent ">
        <ScrollView
          contentContainerStyle={{ backgroundColor: "transparent" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="bg-transparent"
        >
          <View className="flex flex-row bg-transparent ">
            {topEmojis.map((emoji, index) => {
              return (
                <TouchableOpacity
                  onPress={() => handlePress(emoji)}
                  key={index}
                  className=" m-2"
                >
                  <Text className="text-xl">{emoji}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    )
  );
};

export default SelectEmoji;
