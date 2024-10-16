import { View } from "react-native";
import React from "react";
import IconButton from "../../Buttons/IconButton";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "@/app/context/authContext";
import Avatar from "../Avatar";

const AvatarEdit: React.FC = () => {
  const { userDetails } = useAuth();

  return (
    <View className=" w-full flex items-center justify-center my-4">
      <Avatar size={100} avatarName={userDetails?.avatarName} />

      <IconButton
        icon={<Entypo name="edit" size={24} color="black" />}
        containerStyles="w-[30px] h-[30px] bg-white  relative bottom-[30px]"
        handlePress={() => {}}
      ></IconButton>
    </View>
  );
};

export default AvatarEdit;
