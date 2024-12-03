import { View, Text, Platform, Dimensions } from "react-native";
import React from "react";
import { Card } from "../MenteeProfile/MenteeStatistics";
import { useAuth } from "@/app/context/authContext";

import IconGeneral from "../../IconGeneral";
import Crown from "../../../../assets/icons/Crown.png";
import Ambition from "../../../../assets/icons/Ambition.png";
import Love from "../../../../assets/icons/Love.png";
import Clock from "../../../../assets/icons/Clock.png";
import { useCalculateStarsOrComplements } from "../../Chats/Chatroom/Messaging/ConnectedMessage";

const MentorStatistics = () => {
  const { userDetails } = useAuth();

  const { starsAvg, complementsCount } = useCalculateStarsOrComplements(
    userDetails?.mentorStatistics
  );

  const isWeb = Platform.OS === "web";
  const { width, height } = Dimensions.get("window");

  const StatsCards = () => {
    return (
      <View className="flex flex-row flex-wrap   ">
        <Card
          text={`${Math.ceil(userDetails?.mentorStatistics?.time)} Total Mins`}
          icon={<IconGeneral size="35" source={Clock} />}
        />
        <Card
          text={`${userDetails?.mentorStatistics?.questions} Questions`}
          icon={<IconGeneral size="35" source={Crown} />}
        />
        <Card
          text={`${starsAvg} stars`}
          icon={<IconGeneral size="35" source={Ambition} />}
        />
        <Card
          text={`${complementsCount} Complements`}
          icon={<IconGeneral size="35" source={Love} />}
        />
      </View>
    );
  };

  return (
    <View className="w-full  rounded-2xl   ">
      <Text className="text-lg font-bold ml-3 "> Statistics</Text>
      <StatsCards />
    </View>
  );
};

export default MentorStatistics;
