import React from "react";
import { Image } from "react-native";
import { ImageStyle, StyleProp } from "react-native";
import { ImageProps } from "react-native";

let avatars: string[] = [];

for (let i = 0; i <= 14; i++) {
  avatars[i] = `Avatar${i}`;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 14) + 1;
}
export const selectRandomAvatar = () => {
  return avatars[getRandomNumber()];
};

export const avatarPaths: { [key: string]: string } = {
  Avatar1: require("../../../../../assets/images/avatars/Avatar1.png"),
  Avatar2: require("../../../../../assets/images/avatars/Avatar2.png"),
  Avatar3: require("../../../../../assets/images/avatars/Avatar3.png"),
  Avatar4: require("../../../../../assets/images/avatars/Avatar4.png"),
  Avatar5: require("../../../../../assets/images/avatars/Avatar5.png"),
  Avatar6: require("../../../../../assets/images/avatars/Avatar6.png"),
  Avatar7: require("../../../../../assets/images/avatars/Avatar7.png"),
  Avatar8: require("../../../../../assets/images/avatars/Avatar8.png"),
  Avatar9: require("../../../../../assets/images/avatars/Avatar9.png"),
  Avatar10: require("../../../../../assets/images/avatars/Avatar10.png"),
  Avatar11: require("../../../../../assets/images/avatars/Avatar11.png"),
  Avatar12: require("../../../../../assets/images/avatars/Avatar12.png"),
  Avatar13: require("../../../../../assets/images/avatars/Avatar13.png"),
  Avatar14: require("../../../../../assets/images/avatars/Avatar14.png"),
  default: require("../../../../../assets/images/CMlogo.png"),
};

export const avatarArray = Object.entries(avatarPaths).map(([key, value]) => ({
  name: key,
  source: value,
}));

const getAvatarPath = (avatarName: string): string => {
  return avatarPaths[avatarName] || avatarPaths.default;
};

const Avatar: React.FC<{ avatarName: string; size: number }> = ({
  avatarName,
  size,
}) => {
  return (
    <Image
      className="rounded-full "
      style={{ width: size || 50, height: size || 50 }}
      source={getAvatarPath(avatarName)}
    />
  );
};

export default Avatar;
