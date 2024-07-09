import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);

interface CardProps {
  icon?: React.ReactNode;
  text: string;
}

const Card: React.FC<CardProps> = ({ icon, text }) => {
  return (
    <View className="h-[60px] w-[120px] p-3 m-2   rounded-2xl flex flex-row  items-center content-between  border border-neutral-400 ">
      {icon}
      <StyledView className="flex flex-col m-2 ">
        <Text>10 </Text>
        <Text>{text}</Text>
      </StyledView>
    </View>
  );
};

const Statistics = () => {
  return (
    <View className="border">
      <View className="flex flex-row my-3">
        <Entypo name="trophy" size={24} color="black" />
        <Text className="text-lg font-bold "> Statistics</Text>
      </View>

      <View className="flex flex-wra w-full  border ">
        <Card
          text="Total Mins"
          icon={<AntDesign name="clockcircle" size={24} color="orange" />}
        />
        <Card
          text="Ninja Level"
          icon={<FontAwesome5 name="level-up-alt" size={24} color="orange" />}
        />
        <Card
          text="XP"
          icon={<AntDesign name="star" size={24} color="orange" />}
        />
        <Card
          text="Compliments"
          icon={<AntDesign name="heart" size={24} color="orange" />}
        />
      </View>
    </View>
  );
};

export default Statistics;
