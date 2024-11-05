import { View, Text } from "react-native";
import React from "react";

import IconButton from "./IconButton";
import { Entypo } from "@expo/vector-icons";

const ExitButton = ({ toggleDisplay, cleanUpFunctions }) => {
  return (
    <IconButton
      containerStyles="h-[50px] w-[50px] bg-white opacity-100 absolute left-4 top-10  bg-white shadow-sm"
      handlePress={() => {
        toggleDisplay(false);

        if (cleanUpFunctions) {
          cleanUpFunctions();
        }
      }}
      icon={<Entypo name="cross" size={34} color="black" />}
    ></IconButton>
  );
};

export default ExitButton;
