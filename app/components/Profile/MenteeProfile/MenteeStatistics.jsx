import { View, Text, Platform, Dimensions } from "react-native";
import React from "react";
import { useAuth } from "@/app/context/authContext";
import Clock from "../../../../assets/icons/Clock.png";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import IconGeneral from "../../IconGeneral";
import Crown from "../../../../assets/icons/Crown.png";
import Love from "../../../../assets/icons/Love.png";
import Money from "../../../../assets/icons/Money.png";

export const Card = ({ icon, text, contentStyles }) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{ height: 85 }}
      className={`min-w-[140px] flex-1 my-2 rounded-2xl items-center justify-center bg-white  shadow  m-1 ${
        Platform.OS === "web" ? "" : ""
      }  `}
    >
      {icon}
      <Text className={` text-base text-center `}>{text}</Text>
    </View>
  );
};

const MenteeStatistics = () => {
  console.log("platform", Platform.OS);
  const { userDetails } = useAuth();

  const stats = userDetails?.menteeStatistics || {};
  let complementsCount;
  if (stats) {
    complementsCount = Object.values(stats?.complements).reduce(
      (accumulator, item) => {
        return accumulator + item;
      }
    );
  }

  const isWeb = Platform.OS === "web";
  console.log("🚀 ~ MenteeStatistics ~ isWeb:", Platform.OS);

  const StatsCards = () => {
    return (
      <View className="flex flex-row  flex-wrap ">
        <Card
          
          text={` ${Math.ceil(stats?.time)} mins`}
          icon={<IconGeneral size="35" source={Clock} />}
        />
        <Card
         
          text={` ${stats?.questions} questions`}
          icon={<IconGeneral size="35" source={Crown} />}
        />

        <Card
       
          text={` ${stats?.XP} XP`}
          icon={<IconGeneral size="35" source={Money} />}
        />
        <Card
         
          text={` ${complementsCount} Complements`}
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

export default MenteeStatistics;
