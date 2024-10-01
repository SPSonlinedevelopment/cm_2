import { View, Text } from "react-native";
import React from "react";
import { Card } from "../MenteeProfile/MenteeStatistics";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "@/app/context/authContext";

const MentorStatistics = () => {
  const { userDetails } = useAuth();

  const stats = userDetails?.mentorStatistics;
  console.log("🚀 ~ MentorStatistics ~ stats:", stats);

  let starsCount = 0;
  let starsAvg = 0;

  if (stats?.stars?.length) {
    starsCount = stats.stars.reduce((acc, star) => acc + star, 0);
    starsAvg = Math.floor(starsCount / stats.stars.length);
  }

  let count = 0;
  const complimentsCount = Object.values(stats.compliments).reduce(
    (accumulator, item) => {
      return accumulator + item;
    },
    count
  );

  console.log(complimentsCount); // Outputs the total count of compliments

  return (
    <View className=" mt-5 w-[93%] ">
      <View className="flex flex-row">
        <Entypo name="trophy" size={24} color="black" />
        <Text className="text-lg font-bold "> Statistics</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Card
          text={` ${Math.ceil(stats?.time)} Total Mins`}
          icon={<AntDesign name="clockcircle" size={24} color="orange" />}
        />
        <Card
          text={` ${stats?.questions} Questions`}
          icon={<AntDesign name="clockcircle" size={24} color="orange" />}
        />
      </View>

      <View className="flex flex-row justify-between">
        <Card
          text={` ${starsAvg} stars`}
          icon={<AntDesign name="star" size={24} color="orange" />}
        />
        <Card
          text={` ${complimentsCount} Compliments`}
          icon={<AntDesign name="heart" size={24} color="orange" />}
        />
      </View>
    </View>
  );
};

export default MentorStatistics;
