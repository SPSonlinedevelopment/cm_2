import { View, Text } from "react-native";
import React from "react";
import ProgressBar from "../ProgressBar";
import { useAuth } from "@/app/context/authContext";
import Clock from "../../../../assets/icons/Clock.png";
import StatsIcon from "./StatsIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import IconGeneral from "../../IconGeneral";
import Crown from "../../../../assets/icons/Crown.png";
import Love from "../../../../assets/icons/Love.png";
import Money from "../../../../assets/icons/Money.png";

// interface CardProps {
//   icon?: React.ReactNode;
//   text: string;
// }

export const Card = ({ icon, text }) => {
  return (
    <View
      style={{ width: wp(45), height: 65 }}
      className="   mt-2 rounded-2xl items-center justify-center bg-white shadow-sm   "
    >
      {icon}
      <Text className=" text-base  ">{text}</Text>
    </View>
  );
};

const MenteeStatistics = () => {
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

  return (
    <View className=" mt-5 w-[93%] ">
      <StatsIcon />
      <View className="flex flex-row justify-between">
        <Card
          text={` ${Math.ceil(stats?.time)} mins`}
          icon={<IconGeneral size="35" source={Clock} />}
        />
        <Card
          text={` ${stats?.ninjaLevel} ninja level`}
          icon={<IconGeneral size="35" source={Crown} />}
        />
      </View>
      <View className="flex flex-row justify-between">
        <Card
          text={` ${stats?.XP} XP`}
          icon={<IconGeneral size="35" source={Money} />}
        />
        <Card
          text={` ${complementsCount} Complements`}
          icon={<IconGeneral size="35" source={Love} />}
        />
      </View>

      <ProgressBar />
    </View>
  );
};

export default MenteeStatistics;
