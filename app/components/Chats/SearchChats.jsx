import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import FadeInView from "../Effects/FadeInView";

const SearchChats = ({ setSearchInput, searchInput }) => {
  const [showCancelBtn, setShowCancelBtn] = useState(false);

  // }
  const displayCancelSearch = searchInput.length > 0;

  return (
    <View className=" w-full px-0 mb-4 flex-row justify-center items-center h-[45px] ">
      <View
        className={`${
          displayCancelSearch ? "w-[290px]" : "w-[330px]"
        } px-4 flex-row  pl-4 m-1 h-full border-none rounded-full bg-neutral-100 flex items-center  justify-between shadow fixed  transition ease-in-out`}
      >
        <FontAwesome name="search" size={15} color="black" />
        <TextInput
          placeholderTextColor={"lightgrey"}
          value={searchInput}
          onFocus={setShowCancelBtn}
          placeholder="Search chats"
          className="  w-full  justify-center text-base ml-2 items-center"
          onChangeText={setSearchInput}
        ></TextInput>
      </View>

      {displayCancelSearch && (
        <FadeInView containerStyles={""}>
          <TouchableOpacity
            className="h-[40px] w-[60px] bg-neutral-100 shadow rounded-full  items-center flex justify-center"
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
