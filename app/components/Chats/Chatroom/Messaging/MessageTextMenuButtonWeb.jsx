import { TouchableOpacity, View, Text } from "react-native";
import React, { useState } from "react";
import FadeInView from "@/app/components/Effects/FadeInView";
import Ionicons from "@expo/vector-icons/Ionicons";
// import ActionButton from "../MessageSelected/MessageSelectedModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";

const MessageTextMenuButtonWeb = ({
  displayMessageSelectedMenu,
  setDisplayMessageSelectedMenu,
}) => {
  return (
    <FadeInView
      duration={100}
      containerStyles="absolute shadow top-1 right-1 p-1 w-[18px] h-[20px] rounded-2xl bg-white  flex justify-center items-center"
    >
      <TouchableOpacity
        className=""
        onPress={() => {
          setDisplayMessageSelectedMenu(!displayMessageSelectedMenu);
        }}
      >
        <View className="rotate-[-90deg]">
          {" "}
          <Ionicons name="chevron-back" size={10} color="grey" />
        </View>
      </TouchableOpacity>
    </FadeInView>
  );
};

export default MessageTextMenuButtonWeb;
