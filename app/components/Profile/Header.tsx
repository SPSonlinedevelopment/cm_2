import { View, Text } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { useAuth } from "@/app/context/authContext";
import ProgressBar from "./ProgressBar";
import Statistics from "./Statistics";

import Entypo from "@expo/vector-icons/Entypo";

const Header = () => {
  const { user } = useAuth();

  console.log(user?.email);

  return (
    <View className="w-[90%] mt-3 relative bg-white flex flex-row items-center justify-between">
      <View className="  flex flex-col justify-start items-start">
        <Avatar />
        <Text className="text-lg font-semibold">{user?.name}name</Text>
        <Text className="text-sm text-neutral-400 font-medium">
          {user?.email}
        </Text>
      </View>

      <View className="  h-full">
        <View className=" bg-white rounded-full  h-[36px] flex items-center justify-center  w-[36px]  shadow">
          <Entypo name="edit" size={20} color="black" />
        </View>
      </View>
    </View>
  );
};

export default Header;
