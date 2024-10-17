import { View, Text } from "react-native";
import React from "react";
import Avatar from "./EditProfile/Avatar/Avatar";
import { useAuth } from "@/app/context/authContext";
import ProgressBar from "./ProgressBar";
import Statistics from "./MenteeProfile/MenteeStatistics";

import Entypo from "@expo/vector-icons/Entypo";
import CheckEmailVerification from "./CheckEmailVerification";

const Header = () => {
  const { userDetails, user } = useAuth();
  console.log("🚀 ~ Header ~ user:", user);

  if (user) {
    return (
      <View className="w-full mt-3 ml-6 relative bg-white flex flex-row items-center  justify-between">
        {/* {!user.emailVerified && <CheckEmailVerification />} */}
        <View className="  flex flex-col justify-start items-start">
          <Avatar avatarName={userDetails.avatarName} />
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
      </View>
    );
  }
};

export default Header;
