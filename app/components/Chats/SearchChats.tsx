import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../Buttons/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { useChat } from "@/app/context/chatContext";

interface SearchChatsProps {
  completedChats: [];
  setDisplaySearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  displaySearchModal: boolean;
}

const SearchChats: React.FC<SearchChatsProps> = ({
  completedChats,
  displaySearchModal,
  setDisplaySearchModal,
}) => {
  console.log("🚀 ~ setDisplaySearchModal:", setDisplaySearchModal);
  const { questions, allChats } = useChat();

  const [searchInput, setSearchInput] = useState("");

  // const searchArr = [...completedChats, ...questions, ...allChats];

  return (
    <View className=" w-full h-[40px] px-0 flex flex-row justify-center items-center">
      <TextInput
        placeholderTextColor={"red"}
        placeholder="Search chats"
        className=" w-[60%] pl-4 m-1 h-full border-none rounded-full bg-neutral-100 flex items-start  justify-center shadow "
        onChangeText={setSearchInput}
      >
        <FontAwesome name="search" size={15} color="black" />
      </TextInput>
      <IconButton
        containerStyles={"h-[40px] w-[40px] m-1 bg-neutral-100 shadow "}
        handlePress={() => {}}
        icon={<AntDesign name="filter" size={14} color="black" />}
      ></IconButton>
      <Button title="Cancel" onPress={() => setDisplaySearchModal(false)} />
    </View>
  );
};

export default SearchChats;
