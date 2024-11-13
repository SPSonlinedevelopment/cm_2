import React from "react";
import IconButton from "./IconButton";
import * as Haptics from "expo-haptics";
import Entypo from "@expo/vector-icons/Entypo";

const ToggleScrollSelectionButton = ({
  display,
  setDisplay,
  icon,
  position,
}) => {
  return (
    <IconButton
      containerStyles={`bg-white w-[40px] w-[40px] p-2  bottom-[200px] absolute ${
        position === "left" ? " left-[10px]" : " right-[10px]"
      }  `}
      icon={display ? <Entypo name="cross" size={24} color="black" /> : icon}
      handlePress={() => {
        setDisplay((prev) => !prev);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    />
  );
};

export default ToggleScrollSelectionButton;
