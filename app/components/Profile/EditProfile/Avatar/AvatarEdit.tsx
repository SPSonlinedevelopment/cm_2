import { View } from "react-native";
import React, { useState } from "react";
import IconButton from "../../../Buttons/IconButton";
import { Entypo } from "@expo/vector-icons";
import Avatar from "./Avatar";
import SelectAvatarModal from "./SelectAvatarModal";

const AvatarEdit: React.FC<{ avatarName: string }> = ({ avatarName }) => {
  const [displaySelectAvatarModal, setDisplayAvatarModal] = useState(false);

  return (
    <View className=" w-full flex items-center justify-center mt-2">
      <Avatar size={100} avatarName={avatarName} />
      <SelectAvatarModal
        avatarName={avatarName}
        setDisplayModal={setDisplayAvatarModal}
        displayModal={displaySelectAvatarModal}
      />

      <IconButton
        icon={<Entypo name="edit" size={22} color="black" />}
        containerStyles="w-[35px] h-[35px] bg-white shadow-sm  relative bottom-[40px] left-[40px]"
        handlePress={() => {
          setDisplayAvatarModal(true);
        }}
      ></IconButton>
    </View>
  );
};

export default AvatarEdit;
