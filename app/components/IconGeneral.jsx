import { Image } from "react-native";
import React from "react";

const IconGeneral = ({ source, size }) => {
  return (
    <Image
      style={{ pointerEvents: "none" }}
      className={`h-[${size}px]`}
      resizeMode="contain"
      source={source}
    />
  );
};

export default IconGeneral;
