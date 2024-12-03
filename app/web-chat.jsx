import { View, Text } from "react-native";
import React, { useState } from "react";
import Chats from "./chats";
import ChatRoom from "./chat-room";
import NavHeaderBar from "./components/Navigation/NavHeaderBar";

const WebChat = () => {
  const [roomIdWeb, setRoomIdWeb] = useState(false);

  const [completedSessionWeb, setCompletedSessionWeb] = useState(false);

  return (
    <View className="w-full">
      <NavHeaderBar />
      <View className="flex flex-row w-full">
        <View className="shadow-xl">
          <Chats
            setCompletedSessionWeb={setCompletedSessionWeb}
            setRoomIdWeb={setRoomIdWeb}
          />
        </View>

        <ChatRoom
          completedSessionWeb={completedSessionWeb}
          roomIdWeb={roomIdWeb}
        />
      </View>
    </View>
  );
};

export default WebChat;
