import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import FadeInView from "@/app/components/Effects/FadeInView";
import Ionicons from "@expo/vector-icons/Ionicons";
import MessageTextMenuButtonWeb from "./MessageTextMenuButtonWeb";

// import ActionButton from "../MessageSelected/MessageSelectedModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useChatRoom } from "@/app/context/chatRoomContext";

const MessageText = ({
  text,
  thisUsersMessage,
  time,
  handleSelectedMessage,
  message,
  setReplyState,
  setReplyMessageObj,
  setDisplayReportMessageModal,
  setDisplayDeleteMessageModal,
}) => {
  const { chatRoomData } = useChatRoom();

  const messageRef = useRef(null);

  const [isMouseInside, setIsMouseInside] = useState(false);
  const [displayMessageSelectedMenu, setDisplayMessageSelectedMenu] =
    useState(false);

  const handleReplyWeb = () => {
    setDisplayMessageSelectedMenu(false);
    setReplyState((prevState) => ({
      ...prevState,
      displayShowReplyBar: true,
      replyMessage: text,
      replyRecipientName: message.userName,
      replyRecipientId: message.userId,
    }));
  };

  const handleReportWeb = async () => {
    setDisplayReportMessageModal(true);
    setReplyMessageObj({
      message: message,
      roomId: chatRoomData?.roomId,
    });
  };

  const handleDeleteWeb = () => {
    // should rename this obj as its used in delete function
    setReplyMessageObj({
      message: message,
      roomId: chatRoomData?.roomId,
    });
    setDisplayDeleteMessageModal(true);
  };

  const selectionButtons = [
    {
      title: "Reply",
      func: handleReplyWeb,
      icon: (
        <MaterialCommunityIcons name="reply-outline" size={24} color="black" />
      ),
    },
    {
      title: "Report",
      func: handleReportWeb,
      icon: <Octicons name="report" size={24} color="black" />,
    },

    {
      title: "Delete",
      func: handleDeleteWeb,
      icon: <MaterialIcons name="delete-outline" size={24} color="red" />,
    },
  ];

  const data = (
    <View
      className={`flex-row  mb-2 mt-2 w-full z-50  flex ${
        thisUsersMessage ? "justify-end" : "justify-start "
      } `}
    >
      <TouchableOpacity
        onMouseEnter={() => {
          setIsMouseInside(true);
        }}
        onMouseLeave={() => {
          setIsMouseInside(false);
        }}
        ref={messageRef}
        delayPressIn={400}
        onLongPress={() => {
          if (Platform.OS !== "web") {
            handleSelectedMessage(messageRef);

            Platform.OS !== "web" &&
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        }}
        className={` relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl  ${
          Platform.OS === "web" ? "max-w-[70%]" : "max-w-[320px]"
        } rounded-br-xl shadow   ${
          thisUsersMessage
            ? "bg-orange-200 self-end  mr-3  "
            : "bg-purple self-start  ml-3"
        }   `}
      >
        <Text className={` ${thisUsersMessage ? "" : "text-white"} text-base`}>
          {text}{" "}
        </Text>
        {displayMessageSelectedMenu && (
          <View className="w-full flex items-center mt-2">
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
        )}

        {time && (
          <View className="flex items-end mt-1">
            <Text
              className={`text-xs ${thisUsersMessage ? "" : "text-white"}  `}
            >
              {time}
            </Text>
          </View>
        )}

        <View
          className={`h-3 w-2   absolute    ${
            thisUsersMessage
              ? "bg-orange-200 bottom-0 rotate-[-30deg] right-[-2px]  rounded-bl-xl  "
              : "bg-purple   bottom-0 rotate-[30deg] left-[-2px]  rounded-br-xl   "
          }`}
        />

        {isMouseInside && Platform.OS === "web" && (
          <MessageTextMenuButtonWeb
            displayMessageSelectedMenu={displayMessageSelectedMenu}
            setDisplayMessageSelectedMenu={setDisplayMessageSelectedMenu}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  return data;
};

export default MessageText;

const ActionButton = ({ handlePress, title, icon }) => {
  const [isMouseInside, setIsMouseInside] = useState(false);

  return (
    <TouchableOpacity
      onMouseEnter={() => {
        setIsMouseInside(true);
        console.log("mouse insde");
      }}
      onMouseLeave={() => {
        setIsMouseInside(false);
      }}
      onPress={() => handlePress()}
      className={`w-full min-w-[100px] max-w-[200px]  p-2  h-[40px] flex  rounded ${
        isMouseInside ? " bg-[#F0F2F5]" : ""
      }  ${
        title !== "Delete" ? "border-b-[0.3px] border-gray-700" : ""
      }  justify-center items-start bg-white `}
    >
      <View className="w-full flex flex-row justify-between">
        <Text
          className={` text-sm ${title === "Delete" ? "text-red-500" : ""}`}
        >
          {title}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};
