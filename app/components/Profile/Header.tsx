import { View, Text } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { useAuth } from "@/app/context/authContext";
import ProgressBar from "./ProgressBar";
import Statistics from "./MenteeProfile/MenteeStatistics";

import Entypo from "@expo/vector-icons/Entypo";
import CheckEmailVerification from "./CheckEmailVerification";

const Header = () => {
  const { userDetails } = useAuth();

  return (
    <View>
      <CheckEmailVerification />
      <View className="w-[90%] mt-3 relative bg-white flex flex-row items-center justify-between">
        <View className="  flex flex-col justify-start items-start">
          <Avatar />
          <Text className="text-lg font-semibold">
            {userDetails?.firstName}
          </Text>
          <Text className="text-sm text-neutral-400 font-medium">
            {userDetails?.email}
          </Text>
          <Text className="text-sm text-neutral-400 font-medium">
            {userDetails?.mode}
          </Text>
        </View>

        <View className="  h-full">
          <View className=" bg-white rounded-full  h-[36px] flex items-center justify-center  w-[36px]  shadow">
            <Entypo name="edit" size={20} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
