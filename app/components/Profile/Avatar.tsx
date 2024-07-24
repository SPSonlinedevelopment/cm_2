import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

type AvatarName = "Colin" | "Stuart" | "Ben" | "Janet";

interface AvatarProps {
  avatarName: AvatarName;
}

const Avatar: React.FC<AvatarProps> = ({ avatarName }) => {
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
    <View>
      <Image
        style={{ borderRadius: 30, width: 60, height: 60 }}
        source={avatarPath}
      />
    </View>
  );
};

export default Avatar;
