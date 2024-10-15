import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

const avatarNameList = ["Colin", "Stuart", "Ben", "Janet"];

function getRandomNumber() {
  return Math.floor(Math.random() * 4) + 1;
}
export const selectRandomAvatar = () => {
  return avatarNameList[getRandomNumber()];
};

// Example usage:

type AvatarName = "Colin" | "Stuart" | "Ben" | "Janet";

interface AvatarProps {
  avatarName: AvatarName;
  size: number;
}

const Avatar: React.FC<AvatarProps> = ({ avatarName, size }) => {
  let avatarPath = require("../../../assets/images/CMlogo.png");

  if (avatarName === "Colin") {
    avatarPath = require("../../../assets/images/avatars/Colin.png");
  } else if (avatarName === "Ben") {
    avatarPath = require("../../../assets/images/avatars/Ben.png");
  } else if (avatarName === "Janet") {
    avatarPath = require("../../../assets/images/avatars/Janet.png");
  } else if (avatarName === "Stuart") {
    avatarPath = require("../../../assets/images/avatars/Stuart.png");
  }
  return (
    <Image
      style={{ borderRadius: 30, width: size || 50, height: size || 50 }}
      source={avatarPath}
    />
  );
};

export default Avatar;
