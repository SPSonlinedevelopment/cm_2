import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ChatPreview from "./components/Chats/ChatPreview";
import { ChatContextProvider, useChat } from "./context/chatContext";

const Chats = () => {



  return <ChatPreview />;
};

export default Chats;
