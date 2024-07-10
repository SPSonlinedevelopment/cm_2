import { Text, View } from "react-native";
import React, { useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(20);

  const barStyle = {
    height: 25,
    width: `${progress}%`,
    borderRadius: 20,
    backgroundColor: "rgb(243, 112, 33)",
    transition: "0.8s",
    position: "absolute",
    left: 0,
  };

  return (
    <View className=" mt-3  ">
      <View
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 0,
          width: "100%",
          height: 25,
          borderRadius: 20,
          backgroundColor: "rgb(254, 226, 211)",
        }}
      >
        <View className=" w-full h-full flex flex-row items-center justify-center absolute z-10">
          <Text className=" ">2.0 %</Text>
        </View>
        <View style={barStyle}></View>
      </View>
    </View>
  );
};

export default ProgressBar;
