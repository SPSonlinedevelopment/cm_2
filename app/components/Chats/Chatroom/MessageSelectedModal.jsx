import { View, Text, Modal, StyleSheet } from "react-native";
import React from "react";
import ExitButton from "../../Buttons/ExitButton";

const MessageSelectedModal = ({
  displayMessageSelectedModal,
  setDisplayMessageSelectedModal,
  selectedMessage,
  setSelectedMessage,
}) => {
  console.log("🚀 ~ selectedMessage:", selectedMessage.current);

  const { message, x, y, width, height, pageX, pageY } = selectedMessage;
  console.log("🚀 ~ pageY:", pageY);
  console.log("🚀 ~ pageX:", pageX);
  console.log("🚀 ~ height:", height);
  console.log("🚀 ~ width:", width);
  console.log("🚀 ~ y:", y);
  console.log("🚀 ~ x:", x);
  console.log("🚀 ~ message:", message);

  return (
    displayMessageSelectedModal && (
      <View className="w-full h-full bg-black-100 opacity-80 absolute z-[200]   ">
        <ExitButton toggleDisplay={setDisplayMessageSelectedModal} />
        <View
          className={`bg-white  rounded-xl `}
          style={[
            {
              position: "absolute", // Use absolute positioning
              left: x,
              top: y,
              width: width,
              height: height,
            },
          ]}
        ></View>
      </View>
    )
  );
};

export default MessageSelectedModal;
