import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ExitButton from "../../../Buttons/ExitButton";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import MessageGeneralModal from "./MessageGeneralModal";
import { usePositioning } from "../../../../hooks/usePositioning";
import FadeInView from "@/app/components/Effects/FadeInView";

const MessageSelectedModal = ({
  displayMessageSelectedModal,
  setDisplayMessageSelectedModal,
  selectedMessage,
  setReplyState,
}) => {
  const { thisUsersMessage, message, width, height, time, roomId } =
    selectedMessage;
  const [messageObj, setMessageObj] = useState({});
  const [displayReportMessageModal, setDisplayReportMessageModal] =
    useState(false);
  const [displayDeleteMessageModal, setDisplayDeleteMessageModal] =
    useState(false);

  const { isOffViewport, position, isReady, setIsReady } =
    usePositioning(selectedMessage);

  console.log("isOffViewport", isOffViewport);

  const handleReply = () => {
    setDisplayMessageSelectedModal(false);
    setReplyState((prevState) => ({
      ...prevState,
      displayShowReplyBar: true,
      replyMessage: message?.text,
      replyRecipientName: message.userName,
      replyRecipientId: message.userId,
    }));
  };

  const handleReport = async () => {
    setDisplayReportMessageModal(true);
    setMessageObj({
      message: message,
      roomId,
    });
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
        <ExitButton
          toggleDisplay={() => {
            setDisplayMessageSelectedModal(false);
            setIsReady(false);
          }}
        />

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

        {isReady && selectedMessage && (
          <View
            style={{
              zIndex: 100,
              position: "absolute",
              left: position.x || null,
              top: position.y || null,
              display: "flex",
              alignItems: thisUsersMessage ? "flex-end" : "flex-start",
              width: width,
            }}
          >
            <View
              className={`  ${
                thisUsersMessage ? "bg-orange-200  " : "bg-purple"
              }   rounded-xl  opacity-100 p-3 shadow-lg `}
              style={{
                zIndex: 200,
                position: "relative",
                width: width,
                height: height,
              }}
            >
              <Text
                className={` ${thisUsersMessage ? "" : "text-white"} text-base`}
              >
                {message?.text}
              </Text>
              {time && (
                <View className=" w-full  flex items-end mt-1 ">
                  <Text
                    className={` ${
                      thisUsersMessage ? "" : "text-white"
                    } text-xs`}
                  >
                    {time}
                  </Text>
                </View>
              )}
              <View
                className={`h-3 w-2   absolute    ${
                  thisUsersMessage
                    ? "bg-orange-200 bottom-0 rotate-[-30deg] right-[-2px]  rounded-bl-xl  "
                    : "bg-purple  bottom-0 rotate-[30deg] left-[-2px]  rounded-br-xl   "
                }`}
              />
            </View>

            <View className={`mt-3 bg-white  rounded-xl  relative  `}>
              {selectionButtons.map((button) => {
                return (
                  <ActionButton
                    key={button.title}
                    handlePress={button.func}
                    icon={button.icon}
                    title={button.title}
                  />
                );
              })}
            </View>
          </View>
        )}
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
