import { View, Text, Platform } from "react-native";
import React, { useEffect } from "react";
import ChatPreview from "./components/Chats/ChatPreview";
import { ChatContextProvider, useChat } from "./context/chatContext";
import ChatRoom from "./chat-room";

const Chats = ({ setCompletedSessionWeb, setRoomIdWeb }) => {
  return (
    <ChatPreview
      setCompletedSessionWeb={setCompletedSessionWeb}
      setRoomIdWeb={setRoomIdWeb}
    />
  );
};

export default Chats;
