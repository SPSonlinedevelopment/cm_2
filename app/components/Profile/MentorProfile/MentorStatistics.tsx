import { View, Text } from "react-native";
import React from "react";
import { Card } from "../MenteeProfile/MenteeStatistics";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const answers = 12;
const stars = 3;
const time = 14;
const compliments = 6;

const MentorStatistics = () => {
  return (
    <View className=" mt-5 w-[93%] ">
      <View className="flex flex-row">
        <Entypo name="trophy" size={24} color="black" />
        <Text className="text-lg font-bold "> Statistics</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Card
          text={` ${time} Total Mins`}
          icon={<AntDesign name="clockcircle" size={24} color="orange" />}
        />
        <Card
          text={` ${answers} Questions`}
          icon={<AntDesign name="clockcircle" size={24} color="orange" />}
        />
      </View>

      <View className="flex flex-row justify-between">
        <Card
          text={` ${stars} stars`}
          icon={<AntDesign name="star" size={24} color="orange" />}
        />
        <Card
          text={` ${compliments} Compliments`}
          icon={<AntDesign name="heart" size={24} color="orange" />}
        />
      </View>
    </View>
  );
};

export default MentorStatistics;
