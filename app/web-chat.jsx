import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Chats from "./chats";
import ChatRoom from "./chat-room";
import NavHeaderBar from "./components/Navigation/NavHeaderBar";

const WebChat = () => {
  const [roomIdWeb, setRoomIdWeb] = useState(false);
  const [completedSessionWeb, setCompletedSessionWeb] = useState(false);

  return (
    <View className="w-full bg-white  h-full flex flex-col justify-center items-center ">
      <View className="flex h-full w-full items-center ">
        <NavHeaderBar />

        <View className="flex bg-white  h-full flex-row justify-start  max-w-[1100px] w-full items-center   shadow-xl ">
          <Chats
            setCompletedSessionWeb={setCompletedSessionWeb}
            setRoomIdWeb={setRoomIdWeb}
          />

          <ChatRoom
            completedSessionWeb={completedSessionWeb}
            roomIdWeb={roomIdWeb}
          />
        </View>
      </View>
    </View>
  );
};

export default WebChat;
