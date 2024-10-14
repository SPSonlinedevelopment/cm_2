import { View, Text, Image } from "react-native";
import React from "react";
import { mentorComplements } from "../../EndOfSession/ReviewForMentor/ComplementSelections";

const ComplementMessage = ({ message, mentorName, menteeName }) => {
  const filtered = mentorComplements.filter(
    (comp) => comp.title === message.text
  );
  console.log("🚀 ~ ComplementMessage ~ filtered:", filtered);

  return (
    <View className="justify-center items-center">
      <View className="w-[140px]  flex items-center m-2 rounded-xl p-2 bg-white shadow-2xl">
        <Text>Well done!!</Text>

        <Text className="text-purple font-bold text-base"> + 10 XP</Text>
        <Image
          className="h-20"
          resizeMode="contain"
          source={filtered[0].icon}
        ></Image>
        <Text className="text-purple font-bold text-center text-base">
          {filtered[0].title}
        </Text>
      </View>
    </View>
  );
};

export default ComplementMessage;
