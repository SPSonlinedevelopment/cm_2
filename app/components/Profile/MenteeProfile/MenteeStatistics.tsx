import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ProgressBar from "../ProgressBar";

const StyledView = styled(View);
const StyledText = styled(Text);

interface CardProps {
  icon?: React.ReactNode;
  text: string;
}

export const Card: React.FC<CardProps> = ({ icon, text }) => {
  return (
    <View className="  w-[170px] h-[50px] mt-2 rounded-2xl flex flex-row  items-center justify-start  bg-white shadow-md  ">
      <View className="p-2">{icon}</View>

      <StyledView className="flex flex-col ">
        <Text>{text}</Text>
      </StyledView>
    </View>
  );
};

const Statistics = () => {
  return (
    <View className=" mt-5 w-[93%] ">
      <View className="flex flex-row">
        <Entypo name="trophy" size={24} color="black" />
        <Text className="text-lg font-bold "> Statistics</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Card
          text="Total Mins"
          icon={<AntDesign name="clockcircle" size={24} color="orange" />}
        />
        <Card
          text="Ninja Level"
          icon={<FontAwesome5 name="level-up-alt" size={24} color="orange" />}
        />
      </View>
      <View className="flex flex-row justify-between">
        <Card
          text="XP"
          icon={<AntDesign name="star" size={24} color="orange" />}
        />
        <Card
          text="Compliments"
          icon={<AntDesign name="heart" size={24} color="orange" />}
        />
      </View>

      <ProgressBar />
    </View>
  );
};

export default Statistics;
