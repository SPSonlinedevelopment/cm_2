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

export const Card = ({ icon, text }) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{ height: 85 }}
      className={` min-w-[150px] rounded-2xl m-2 items-center justify-center bg-white  shadow-sm ${
        Platform.OS === "web" ? "w-[20%]" : "w-[40%]"
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

  return (
    <View className={`  w-full rounded-2xl shadow bg-white p-2  my-3 `}>
      <Text className="text-lg font-bold "> Statistics</Text>

      <View className="flex-wrap flex-row justify-center">
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
    </View>
  );
};

export default MenteeStatistics;
