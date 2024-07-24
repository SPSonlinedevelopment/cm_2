import { View, Text } from "react-native";
import React from "react";
import ChatPreview from "./components/Chats/ChatPreview";
import { ChatContextProvider } from "./context/chatContext";

const Chats = () => {
  return <ChatPreview />;
};

export default Chats;
