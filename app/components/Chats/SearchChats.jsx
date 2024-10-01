import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../Buttons/IconButton";
import { AntDesign } from "@expo/vector-icons";
import ChatItem from "./ChatItem";

import FadeInView from "../Effects/FadeInView";

// interface SearchChatsProps {
//   searchArr: [];
//   setDisplaySearchModal: React.Dispatch<React.SetStateAction<boolean>>;
//   displaySearchModal: boolean;
// }

const SearchChats = ({ setSearchInput, searchInput }) => {
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  // // Assuming the type of elements in searchArr contains a property 'questionSubject'
  // interface SearchItem {
  //   questionSubject?: string; // Define the properties that are expected in the array elements
  //   // Add other properties if needed
  // }
  const displayCancelSearch = searchInput.length > 0;

  return (
    <View className=" w-full px-0 flex-row justify-center items-center h-[45px] ">
      <View
        className={`${
          displayCancelSearch ? "w-[290px]" : "w-[360px]"
        } px-0 flex-row  pl-4 m-1 h-full border-none rounded-full bg-neutral-100 flex items-center  justify-between shadow fixed  transition ease-in-out`}
      >
        <FontAwesome name="search" size={15} color="black" />
        <TextInput
          value={searchInput}
          onFocus={setShowCancelBtn}
          placeholder="Search chats"
          className="  w-full h-full justify-center text-med  ml-2 items-center"
          onChangeText={setSearchInput}
        ></TextInput>
      </View>

      {displayCancelSearch && (
        <FadeInView containerStyles={""}>
          <TouchableOpacity
            className="h-[40px] w-[70px] bg-neutral-100 shadow rounded-full  items-center flex justify-center"
            title="Cancel"
            onPress={() => {
              setSearchInput("");
              setShowCancelBtn(false);
            }}
          >
            <Text className="text-sm text-neutral-800">Cancel</Text>
          </TouchableOpacity>
        </FadeInView>
      )}
    </View>
  );
};

export default SearchChats;
