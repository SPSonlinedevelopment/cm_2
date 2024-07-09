import { View, Text } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { useAuth } from "@/app/context/authContext";
import ProgressBar from "./ProgressBar";
import Statistics from "./Statistics";

const Header = () => {
  const { user } = useAuth();

  console.log(user.email);

  return (
    <View className="w-[90%] bg-white flex flex-col items-center justify-center">
      <Avatar />

      <Text className="text-lg font-semibold">{user.name} name</Text>
      <Text className="text-sm text-neutral-400 font-medium">{user.email}</Text>
      <ProgressBar />
      <Statistics />
    </View>
  );
};

export default Header;
