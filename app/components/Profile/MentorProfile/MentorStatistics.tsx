import { View, Text } from "react-native";
import React from "react";
import { Card } from "../MenteeProfile/MenteeStatistics";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "@/app/context/authContext";
import { convertRecurringDecimalToNumber } from "../../../../utils/common";
import { compliments } from "../../Chats/EndOfSession/ReviewForMentor/ComplementSelections";

const MentorStatistics = () => {
  const { userDetails } = useAuth();

  const stats = userDetails?.mentorStatistics;

  let starsCount = 0;
  let starsAvg = 0;

  if (stats?.stars?.length) {
    starsCount = stats.stars.reduce(
      (acc: number, star: number) => acc + star,
      0
    );
    starsAvg = Math.floor(starsCount / stats.stars.length);
  }

  return (
    <View className=" mt-5 w-[93%] ">
      <View className="flex flex-row">
        <Entypo name="trophy" size={24} color="black" />
        <Text className="text-lg font-bold "> Statistics</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Card
          text={` ${stats?.time} Total Mins`}
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
          text={` ${stats?.compliments} Compliments`}
          icon={<AntDesign name="heart" size={24} color="orange" />}
        />
      </View>
    </View>
  );
};

export default MentorStatistics;
