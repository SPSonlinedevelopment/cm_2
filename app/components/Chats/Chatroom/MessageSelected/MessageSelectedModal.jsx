import { View, Text, Modal, StyleSheet } from "react-native";
import React from "react";
import ExitButton from "../../../Buttons/ExitButton";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import ReportMessageModal from "./ReportMessageModal";

const MessageSelectedModal = ({
  displayMessageSelectedModal,
  setDisplayMessageSelectedModal,
  selectedMessage,
  setSelectedMessage,
}) => {
  console.log("🚀 ~ selectedMessage:", selectedMessage.current);

  const handleReply = () => {
    console.log("reply");
  };

  const handleReport = () => {
    console.log("report");
  };

  const handleCopy = () => {
    console.log("copyt");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const selectionButtons = [
    {
      title: "Reply",
      func: handleReply,
      icon: (
        <MaterialCommunityIcons name="reply-outline" size={24} color="black" />
      ),
    },
    {
      title: "Report",
      func: handleReport,
      icon: <Octicons name="report" size={24} color="black" />,
    },
    {
      title: "Copy",
      func: handleCopy,
      icon: <Ionicons name="copy-outline" size={24} color="black" />,
    },
    {
      title: "Delete",
      func: handleDelete,
      icon: <MaterialIcons name="delete-outline" size={24} color="red" />,
    },
  ];

  const { message, x, y, width, height, pageX, pageY, time, thisUsersMessage } =
    selectedMessage;

  console.log("typeofheight", typeof height);

  console.log("🚀 ~ message111:", message?.text);
  let menuXPosition;
  if (selectedMessage) {
    menuXPosition = y + height;

    console.log("typeofmenuXPosition", typeof menuXPosition);
  }

  return (
    displayMessageSelectedModal && (
      <BlurView
        intensity={60}
        tint="dark"
        className="w-full h-full absolute z-[200]  "
      >
        <ExitButton toggleDisplay={setDisplayMessageSelectedModal} />
        <ReportMessageModal />
        <View
          className={` ${
            thisUsersMessage ? "bg-orange-200  " : "bg-white"
          }   rounded-xl  opacity-100 p-3 shadow-lg `}
          style={{
            zIndex: 200,
            position: "absolute", // Use absolute positioning
            left: x,
            top: y,
            width: width,
            height: height,
          }}
        >
          <Text className=" text-base">{message?.text}</Text>
          {time && (
            <View className=" w-full  flex items-end mt-1 ">
              <Text className="text-xs ">{time}</Text>
            </View>
          )}
          <View
            className={`h-3 w-2   absolute    ${
              thisUsersMessage
                ? "bg-orange-200 bottom-0 rotate-[-30deg] right-[-2px]  rounded-bl-xl  "
                : "bg-white  bottom-0 rotate-[30deg] left-[-2px]  rounded-br-xl   "
            }`}
          />
        </View>

        <View
          className="mt-3 rounded-lg"
          style={{
            padding: 2,
            backgroundColor: "white",
            position: "absolute", // Use absolute positioning
            left: x,
            top: menuXPosition || 0,
          }}
        >
          {selectionButtons.map((button) => {
            return (
              <ActionButton
                handlePress={button.func}
                icon={button.icon}
                title={button.title}
              />
            );
          })}
        </View>
      </BlurView>
    )
  );
};

export default MessageSelectedModal;

const ActionButton = ({ handlePress, title, icon }) => {
  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      className="w-[130px] h-[40px] flex  justify-center items-start bg-white shadow-xl "
    >
      <View className="w-full flex flex-row justify-around">
        <Text className={`${title === "Delete" ? "text-red-500" : ""}`}>
          {title}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};
