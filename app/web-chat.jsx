import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Chats from "./chats";
import ChatRoom from "./chat-room";
import NavHeaderBar from "./components/Navigation/NavHeaderBar";
import GradientNavigation from "./components/Profile/MenteeProfile/GradientNaviation/GradientNavigation";

const WebChat = () => {
  const [roomIdWeb, setRoomIdWeb] = useState("");
  const [completedSessionWeb, setCompletedSessionWeb] = useState(false);

  const { width } = Dimensions.get("window");

  return (
    <View className="h-full w-full bg-neutral-50">
      {width > 500 ? <NavHeaderBar /> : <GradientNavigation />}
      <View
        className={`w-full h-full flex flex-col justify-center items-center ${
          width > 500 ? "mt-[20px] rounded-2xl" : ""
        }`}
      >
        <View className="flex h-full w-full items-center   ">
          <View className="flex bg-neutral-50 h-full flex-row justify-start  max-w-[1000px] pb-[100px]  w-full items-center     rounded-2xl">
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
    </View>
  );
};

export default WebChat;
