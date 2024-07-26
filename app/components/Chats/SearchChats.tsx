import { View, Text, TextInput } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../Buttons/IconButton";
import { AntDesign } from "@expo/vector-icons";

const SearchChats = () => {
  return (
    <View className=" w-full h-[40px] px-0 flex flex-row justify-center items-center">
      <TextInput
        placeholderTextColor={"red"}
        placeholder="Search chats"
        className="w-[81%] pl-4 m-1 h-full border-none rounded-full bg-neutral-100 flex items-start  justify-center shadow "
      >
        <FontAwesome name="search" size={15} color="black" />
      </TextInput>
      <IconButton
        containerStyles={"h-[40px] w-[40px] m-1 bg-neutral-100 shadow "}
        handlePress={() => {}}
        icon={<AntDesign name="filter" size={14} color="black" />}
      ></IconButton>
    </View>
  );
};

export default SearchChats;
