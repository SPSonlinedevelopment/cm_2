import { View, Text } from "react-native";
import React from "react";

const createBlob = async (image) => {
  const response = await fetch(image);
  const blob = await response.blob();

  return blob;
};

export default createBlob;
