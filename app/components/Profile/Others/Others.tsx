import { View, Text, Pressable } from "react-native";
import React from "react";
import IconButton from "../../Buttons/IconButton";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "@/app/context/authContext";
import OtherListItemComponent from "./OtherListItemComponent";
import BorderUnderline from "../BorderUnderline";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Others = () => {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await logOut();
      console.log("res", result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    try {
      console.log("delete btn clicked");
    } catch (error) {}
  };
  return (
    <View className="w-[93%]">
      <View className="flex flex-row items-center">
        <Entypo name="dots-three-horizontal" size={16} color="black" />
        <Text className="text-lg font-bold "> Others</Text>
      </View>

      <OtherListItemComponent
        icon={<FontAwesome name="share" size={20} color="white" />}
        handlePress={() => {}}
        iconColor="bg-orange"
        iconStyles=""
        text="Share with Friends"
      />

      <OtherListItemComponent
        icon={<MaterialIcons name="contact-support" size={20} color="white" />}
        handlePress={() => {}}
        iconColor="bg-orange"
        text="Contact us"
      />

      <OtherListItemComponent
        icon={<Entypo name="dots-three-horizontal" size={20} color="white" />}
        handlePress={() => {}}
        iconColor="bg-orange"
        text="I'm a mentor"
      />

      <OtherListItemComponent
        icon={<MaterialIcons name="delete" size={20} color="white" />}
        handlePress={handleDelete}
        iconColor="bg-red-500"
        text="Delete Account"
      />
      <OtherListItemComponent
        icon={<Entypo name="log-out" size={20} color="white" />}
        handlePress={handleLogout}
        iconColor="bg-red-500"
        iconStyles="rotate-180"
        text="Sign Out"
      />
    </View>
  );
};

export default Others;
