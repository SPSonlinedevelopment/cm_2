import { View, Text } from "react-native";
import React from "react";

import IconButton from "./IconButton";
import { Entypo } from "@expo/vector-icons";

const ExitButton = ({ toggleDisplay }) => {
  return (
    <IconButton
      containerStyles="h-[50px] w-[50px] bg-white absolute left-4 top-10  shadow-sm"
      handlePress={() => {
        toggleDisplay(false);
        console.log("asjdhask");
      }}
      icon={<Entypo name="cross" size={34} color="black" />}
    ></IconButton>
  );
};

export default ExitButton;
