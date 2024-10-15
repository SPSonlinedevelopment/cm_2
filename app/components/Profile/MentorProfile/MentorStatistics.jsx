import { View, Text } from "react-native";
import React from "react";
import { Card } from "../MenteeProfile/MenteeStatistics";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "@/app/context/authContext";
import StatsIcon from "../MenteeProfile/StatsIcon";
import IconGeneral from "../../IconGeneral";
import Crown from "../../../../assets/icons/Crown.png";
import Ambition from "../../../../assets/icons/Ambition.png";
import Love from "../../../../assets/icons/Love.png";
import Clock from "../../../../assets/icons/Clock.png";

const MentorStatistics = () => {
  const { userDetails } = useAuth();

  const stats = userDetails?.mentorStatistics;

  let starsCount = 0;
  let starsAvg = 0;

  if (stats?.stars?.length) {
    starsCount = stats.stars.reduce((acc, star) => acc + star, 0);
    starsAvg = Math.floor(starsCount / stats.stars.length);
  }

  let count = 0;
  const complementsCount = Object.values(stats.complements).reduce(
    (accumulator, item) => {
      return accumulator + item;
    },
    count
  );

  console.log(complementsCount);

  return (
    <View className=" mt-5 w-[93%] ">
      <StatsIcon />

      <View className="flex flex-row justify-between">
        <Card
          text={` ${Math.ceil(stats?.time)} Total Mins`}
          icon={<IconGeneral size="35" source={Clock} />}
        />
        <Card
          text={` ${stats?.questions} Questions`}
          icon={<IconGeneral size="35" source={Crown} />}
        />
      </View>

      <View className="flex flex-row justify-between">
        <Card
          text={` ${starsAvg} stars`}
          icon={<IconGeneral size="35" source={Ambition} />}
        />
        <Card
          text={` ${complementsCount} Complements`}
          icon={<IconGeneral size="35" source={Love} />}
        />
      </View>
    </View>
  );
};

export default MentorStatistics;
