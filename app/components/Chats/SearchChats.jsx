import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import FadeInView from "../Effects/FadeInView";

const SearchChats = ({ setSearchInput, searchInput }) => {
  const [showCancelBtn, setShowCancelBtn] = useState(false);

  const displayCancelSearch = searchInput.length > 0;

  return (
    <View
      className={`w-full px-0 ${
        Platform.OS === "web" ? "mb-2" : "mb-1"
      } flex-row justify-center items-center h-[45px]`}
    >
      <View
        className={`${
          displayCancelSearch ? "w-[75%]" : "w-[95%]"
        }  px-4 flex-row  pl-4 m-1 h-full border-none rounded-full bg-[#F0F2F5] flex items-center  justify-start shadow fixed  transition ease-in-out`}
      >
        <FontAwesome name="search" size={15} color="black" />
        <TextInput
          style={{
            justifyContent: "center",
            borderWidth: 0,
            outline: "none",
          }}
          placeholderTextColor={"grey"}
          value={searchInput}
          onFocus={setShowCancelBtn}
          placeholder="Search chats"
          className=" border-none w-full  justify-center text-base ml-2  items-center"
          onChangeText={setSearchInput}
        ></TextInput>
      </View>

      {displayCancelSearch && (
        <TouchableOpacity
          className="h-[40px] w-[20%] bg-neutral-100 shadow rounded-full  items-center flex justify-center"
          title="Cancel"
          onPress={() => {
            setSearchInput("");
            setShowCancelBtn(false);
          }}
        >
          <Text className="text-sm text-neutral-800">Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchChats;
