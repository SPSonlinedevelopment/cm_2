import { View } from "react-native";
import React, { Children, useState } from "react";
import IconButton from "../Buttons/IconButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { pickImage } from "../../../utils/imagePicker";

import { useNavigation } from "@react-navigation/native";

export const ChatNavBtn = () => {
  const navigation = useNavigation();
  return (
    <IconButton
      title="Chat"
      icon={<Entypo name="chat" size={24} color="white" />}
      handlePress={() => {
        console.log("chat btn clicked");
        navigation.navigate("chats");
      }}
      containerStyles="h-[60] w-[60] bg-transparent m-3 "
    />
  );
};

export const AddMediaBtn = ({ setImage, setOpenDisplayImageModal }) => {
  return (
    <IconButton
      title="Images"
      icon={<MaterialIcons name="perm-media" size={24} color="white" />}
      handlePress={async () => {
        console.log("open media btn clicked");

        try {
          const imageSelected = await pickImage();
          if (imageSelected) {
            console.log("🚀 ~ handlePress={ ~ imageSelected:", imageSelected);

            setImage(imageSelected);
            setOpenDisplayImageModal(true);
          }
        } catch (error) {
          Alert.alert("Image could not be selected");
        }
      }}
      containerStyles="h-[60] w-[60] bg-transparent m-3"
    />
  );
};

export const ProfileNavBtn = () => {
  const navigation = useNavigation();
  return (
    <IconButton
      title="Profile"
      icon={<Entypo name="user" size={24} color="white" />}
      handlePress={() => {
        navigation.navigate("profile");
      }}
      containerStyles="h-[60] w-[60] bg-transparent m-3 "
    />
  );
};

export const ActivateCameraBtn = () => {
  const navigation = useNavigation();
  return (
    <IconButton
      title="Camera"
      icon={<AntDesign name="camera" size={35} color="white" />}
      handlePress={() => {
        console.log("user btn clicked");
        navigation.navigate("index");
      }}
      containerStyles="h-[60] w-[60] bg-transparent m-3 "
    />
  );
};

const HomeNavButtons = ({ setImage, setOpenDisplayImageModal }) => {
  return (
    <View>
      <View className="flex-row w-full justify-center items-center  ">
        <View className="h-[80px] w-[80px]"></View>
      </View>
      <View className="flex-row w-full justify-between pb-3  ">
        <ChatNavBtn />
        <AddMediaBtn
          setImage={setImage}
          setOpenDisplayImageModal={setOpenDisplayImageModal}
        />
        <ProfileNavBtn />
      </View>
    </View>
  );
};

export default HomeNavButtons;
