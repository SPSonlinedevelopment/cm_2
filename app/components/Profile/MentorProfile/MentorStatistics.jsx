import { View, Text } from "react-native";
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
  console.log(" userDetails?.mentorStatistics", userDetails?.mentorStatistics);

  console.log("starsAvg", starsAvg);
  console.log("🚀 ~ MentorStatistics ~ complementsCount:", complementsCount);

  return (
    <View className=" mt-5 w-[100%] ">
      <Text className="text-lg ml-3 font-bold "> Statistics</Text>

      <View className="flex flex-row justify-between">
        <Card
          text={` ${Math.ceil(userDetails?.mentorStatistics?.time)} Total Mins`}
          icon={<IconGeneral size="35" source={Clock} />}
        />
        <Card
          text={` ${userDetails?.mentorStatistics?.questions} Questions`}
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
