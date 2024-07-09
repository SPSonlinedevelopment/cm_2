import { View, Text, Image } from "react-native";
import React from "react";

const Avatar = () => {
  return (
    <View>
      <Image
        className="   rounded-full h-[60px] w-[60px]"
        source={require("../../../assets/images/CMlogo.png")}
      />
    </View>
  );
};

export default Avatar;
