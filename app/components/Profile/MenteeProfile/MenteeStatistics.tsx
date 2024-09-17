import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ProgressBar from "../ProgressBar";
import { useAuth } from "@/app/context/authContext";

interface CardProps {
  icon?: React.ReactNode;
  text: string;
}

export const Card: React.FC<CardProps> = ({ icon, text }) => {
  return (
    <View className="  w-[170px] h-[50px] mt-2 rounded-2xl flex flex-row  items-center justify-start  bg-white shadow-md  ">
      <View className="p-2">{icon}</View>

      <View className="flex flex-col ">
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const MenteeStatistics = () => {
  const { userDetails } = useAuth();

  const stats = userDetails?.menteeStatistics;

  return (
    <View className=" mt-5 w-[93%] ">
      <View className="flex flex-row">
        <Entypo name="trophy" size={24} color="black" />
        <Text className="text-lg font-bold ">Statistics</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Card
          text={` ${Math.ceil(stats?.time)} mins`}
          icon={<AntDesign name="clockcircle" size={24} color="orange" />}
        />
        <Card
          text={` ${stats?.ninjaLevel} ninja level`}
          icon={<FontAwesome5 name="level-up-alt" size={24} color="orange" />}
        />
      </View>
      <View className="flex flex-row justify-between">
        <Card
          text={` ${stats?.XP} XP`}
          icon={<AntDesign name="star" size={24} color="orange" />}
        />
        <Card
          text={` ${stats?.compliments} Compliments`}
          icon={<AntDesign name="heart" size={24} color="orange" />}
        />
      </View>

      <ProgressBar />
    </View>
  );
};

export default MenteeStatistics;
