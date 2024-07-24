import { View } from "react-native";
import React, { Children, useState } from "react";
import IconButton from "../Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export const ChatNavBtn = () => {
  return (
    <IconButton
      title="Chat"
      icon={<Entypo name="chat" size={24} color="white" />}
      handlePress={() => {
        console.log("chat btn clicked");
        router.push("chats");
      }}
      containerStyles="h-[60] w-[60] bg-transparent m-3 "
    />
  );
};

export const AddMediaBtn = () => {
  return (
    <IconButton
      icon={<MaterialIcons name="perm-media" size={24} color="white" />}
      handlePress={() => {
        console.log("open media btn clicked");
      }}
      containerStyles="h-[60] w-[60] bg-transparent m-3"
    />
  );
};

export const ProfileNavBtn = () => {
  return (
    <IconButton
      title="Profile"
      icon={<Entypo name="user" size={24} color="white" />}
      handlePress={() => {
        router.push("profile");
      }}
      containerStyles="h-[60] w-[60] bg-transparent m-3 "
    />
  );
};

export const ActivateCameraBtn = () => {
  return (
    <IconButton
      title="Camera"
      icon={<AntDesign name="camera" size={35} color="white" />}
      handlePress={() => {
        console.log("user btn clicked");
        router.push("/");
      }}
      containerStyles="h-[60] w-[60] bg-transparent m-3 "
    />
  );
};

const HomeNavButtons = () => {
  return (
    <View>
      <View className="flex-row w-full justify-center items-center  ">
        <View className="h-[80px] w-[80px]"></View>
      </View>
      <View className="flex-row w-full justify-between pb-3  ">
        <ChatNavBtn />
        <AddMediaBtn />
        <ProfileNavBtn />
      </View>
    </View>
  );
};

export default HomeNavButtons;
