import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import CMlogo from "../../../assets/images/CMlogo.png";
import { useAuth } from "@/app/context/authContext";

const NavHeaderBar = () => {
  const { userDetails } = useAuth();
  const name = userDetails?.firstName;

  const navLinks = [
    { name: "Home", onPress: () => {} },
    { name: "Chats", onPress: () => {} },
    { name: name, onPress: () => {} },
  ];

  return (
    <View className="flex flex-row justify-between w-full items-center">
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
