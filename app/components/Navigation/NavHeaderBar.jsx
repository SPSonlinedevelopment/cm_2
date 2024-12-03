import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import React from "react";
import CMlogo from "../../../assets/images/CMlogo.png";
import { useAuth } from "@/app/context/authContext";
import { useNavigation } from "@react-navigation/native";

const NavHeaderBar = () => {
  const { userDetails } = useAuth();
  const navigation = useNavigation();
  const name = userDetails?.firstName;

  const navLinks = [
    {
      name: "Home",
      onPress: () => {
        navigation.navigate("profile");
      },
    },
    {
      name: "Chats",
      onPress: () => {
        navigation.navigate(Platform.OS === "web" ? "web-chat" : "chats");
      },
    },
    {
      name: name,
      onPress: () => {
        navigation.navigate("edit-profile");
      },
    },
  ];

  return (
    <View className="flex flex-row justify-between w-full items-center shadow-lg">
      <View className="flex  flex-row-reverse justify-center items-center ">
        <Text className="text-purple font-bold text-2xl ml-3">Collet</Text>
        <Image className="h-14 w-14 rounded-full shadow" source={CMlogo} />
      </View>

      <View>
        <View className="flex flex-row ">
          {navLinks.map((link) => {
            return (
              <TouchableOpacity className="m-5" onPress={link.onPress}>
                <Text className="text-base text-neutral-500  font-bold font-med">
                  {link.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default NavHeaderBar;
