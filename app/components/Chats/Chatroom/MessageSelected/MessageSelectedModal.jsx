import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ExitButton from "../../../Buttons/ExitButton";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import ReportMessageModal from "./ReportMessageModal";
import FadeInView from "@/app/components/Effects/FadeInView";
import { useChat } from "@/app/context/chatContext";
import MessageGeneralModal from "./MessageGeneralModal";

const MessageSelectedModal = ({
  displayMessageSelectedModal,
  setDisplayMessageSelectedModal,
  selectedMessage,
  setReplyRecipientName,
  setReplyMessage,
  setDisplayShowReplyBar,
}) => {
  const { message, x, y, width, height, time, thisUsersMessage, roomId } =
    selectedMessage;
  const [messageObj, setMessageObj] = useState({});
  const [displayReportMessageModal, setDisplayReportMessageModal] =
    useState(false);
  const [displayDeleteMessageModal, setDisplayDeleteMessageModal] =
    useState(false);
  const [newX, setNewX] = useState(false);
  const [position, setPosition] = useState({ x: x, y: y });

  const [isOffViewport, setIsOffViewport] = useState(false);

  useEffect(() => {
    if (selectedMessage) {
      setPosition({ x: selectedMessage.x || 0, y: selectedMessage.y || 0 });
    }
  }, [selectedMessage]);

  useEffect(() => {
    if (isOffViewport) {
      setPosition({ x: newX, y: 400 });
    }
  }, [isOffViewport, newX]);

  const handleLayout = (event) => {
    const { y, height } = event.nativeEvent.layout;
    const { width } = event.nativeEvent.layout;
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;

    const newX = screenWidth / 2 - width / 2;
    setNewX(newX);

    const offBottom = y + height > screenHeight;
    const offTop = y < 0;
    setIsOffViewport(offBottom || offTop);
  };

  const handleReply = () => {
    setReplyMessage(message?.text);
    setDisplayShowReplyBar(true);
    setReplyRecipientName(message.userName);
    setDisplayMessageSelectedModal(false);
  };

  const handleReport = async () => {
    setDisplayReportMessageModal(true);
    setMessageObj({
      message: message,
      roomId,
    });
  };

  const handleCopy = () => {
    console.log("copyt");
  };

  const handleDelete = () => {
    setMessageObj({
      message: message,
      roomId,
    });
    setDisplayDeleteMessageModal(true);
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
    // {
    //   title: "Copy",
    //   func: handleCopy,
    //   icon: <Ionicons name="copy-outline" size={24} color="black" />,
    // },
    {
      title: "Delete",
      func: handleDelete,
      icon: <MaterialIcons name="delete-outline" size={24} color="red" />,
    },
  ];

  return (
    displayMessageSelectedModal && (
      <BlurView
        intensity={60}
        tint="dark"
        className="w-full h-full absolute z-[200]  "
      >
        <ExitButton toggleDisplay={setDisplayMessageSelectedModal} />

        <MessageGeneralModal
          setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
          displayModal={displayReportMessageModal}
          setDisplayModal={setDisplayReportMessageModal}
          text={{
            headerText: "Report message",
            bodyText:
              " This message will be forwarded to the Collet Mentoring Team and investigated. The sender will not be notified.",
          }}
          messageObj={messageObj}
          type="report"
        />

        <MessageGeneralModal
          setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
          displayModal={displayDeleteMessageModal}
          setDisplayModal={setDisplayDeleteMessageModal}
          text={{
            headerText: "Delete message",
            bodyText: "This message will be deleted from the chat.",
          }}
          type="delete"
          messageObj={messageObj}
        />
        <FadeInView duration={300}>
          <View
            className="rounded-xl"
            onLayout={handleLayout}
            style={{
              zIndex: 100,
              position: "absolute",
              left: position.x,
              top: position.y,
              display: "flex",
              alignItems: thisUsersMessage ? "flex-end" : "flex-start",
              width: width,
            }}
          >
            <View
              className={`  ${
                thisUsersMessage ? "bg-orange-200  " : "bg-white"
              }   rounded-xl  opacity-100 p-3 shadow-lg `}
              style={{
                zIndex: 200,
                position: "relative",
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

            <View className={`mt-3 bg-white  rounded-xl  relative  `}>
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
          </View>
        </FadeInView>
      </BlurView>
    )
  );
};

export default MessageSelectedModal;

const ActionButton = ({ handlePress, title, icon }) => {
  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      className={`w-[200px] p-2 m-1 h-[40px] flex  rounded  ${
        title !== "Delete" ? "border-b-[0.3px] border-gray-700" : ""
      }  justify-center items-start bg-white `}
    >
      <View className="w-full flex flex-row justify-between">
        <Text
          className={` text-base ${title === "Delete" ? "text-red-500" : ""}`}
        >
          {title}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};
