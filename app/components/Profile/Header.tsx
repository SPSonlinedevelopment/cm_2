import { View, Text } from "react-native";
import React from "react";
import Avatar from "./EditProfile/Avatar/Avatar";
import { useAuth } from "@/app/context/authContext";

const Header = () => {
  const { userDetails, user } = useAuth();

  if (user) {
    return (
      <View className="w-full mt-3 ml-5 relative flex flex-row items-center  justify-between">
        {/* {!user.emailVerified && <CheckEmailVerification />} */}
        <View className="  flex flex-col justify-start items-start">
          <Avatar size={50} avatarName={userDetails.avatarName} />

          <Text className="text-lg font-semibold my-2">
            Welcome back, {userDetails?.firstName} 👋
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
