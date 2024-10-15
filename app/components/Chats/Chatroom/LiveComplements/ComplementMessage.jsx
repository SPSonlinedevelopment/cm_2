import { View, Text, Image } from "react-native";
import React from "react";
import { mentorComplements } from "../../EndOfSession/ReviewForMentor/ComplementSelections";
import CelebrationAnimation from "@/app/components/Effects/CelebrationAnimation";
import SuccessAnimation from "@/app/components/Effects/SuccessAnimation";

const ComplementMessage = ({ message, mentorName, menteeName }) => {
  const filtered = mentorComplements.filter(
    (comp) => comp.title === message.text
  );

  return (
    <View className="justify-center items-center">
      <View className="w-[140px]  flex items-center m-2 rounded-xl p-2 bg-white shadow-2xl">
        <SuccessAnimation size={70} loop={true} />
        <Text className="text-base font-bold">Well done!!</Text>

        <CelebrationAnimation position="top" size={200} loop={false} />

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
