import { View, Text, ActivityIndicator, Vibration } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useAuth } from "@/app/context/authContext";
import { Image } from "expo-image";
import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";
import { convertFirebaseTimestampToDate } from "@/utils/common";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoadedImage from "./LoadedImage";
import { ScrollView } from "react-native-gesture-handler";
import ShowReplyBar from "./ShowReplyBar";
import MessageText from "./MessageText";
import ReplyMessage from "./ReplyMessage";
import FadeInView from "../../Effects/FadeInView";
import ConnectedMessage from "./ConnectedMessage";

const MessageItem = React.memo(
  ({
    message,
    userId,
    setDisplayShowReplyBar,
    setReplyMessage,
    setReplyRecipientName,
    mentorId,
  }) => {
    console.log("🚀 ~ message:", message);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [hapticFeedback, setHapticFeeback] = useState(false);
    const [ShowReply, setShowReply] = useState(false);

    const handleMessageReplyScroll = (event) => {
      setScrollPosition(event.nativeEvent.contentOffset.x);
    };

    useLayoutEffect(() => {
      if (scrollPosition < -50) {
        setShowReply(true);
        setReplyMessage(message?.text);
        setDisplayShowReplyBar(true);
        setReplyRecipientName(message.userName);
      } else {
        setShowReply(false);
      }
      setTimeout(() => {
        setHapticFeeback(false);
      }, 20);
    }, [scrollPosition]);

    let result;

    const thisUsersMessage = message?.userId === userId;

    let time;
    if (message?.createdAt) {
      time = convertFirebaseTimestampToDate(message?.createdAt);
    }

    if (message.isReply) {
      return (
        <ReplyMessage message={message} thisUsersMessage={thisUsersMessage} />
      );
    }

    if (message.imageUrl) {
      result = (
        <LoadedImage
          time={time}
          caption={message.text || ""}
          thisUsersMessage={thisUsersMessage}
          url={message.imageUrl}
        />
      );
    } else if (message.messageType === "connected") {
      return (
        <ConnectedMessage
          mentorId={mentorId}
          thisUsersMessage={thisUsersMessage}
          message={message}
        />
      );
    } else {
      result = (
        <MessageText
          time={time}
          thisUsersMessage={thisUsersMessage}
          text={message.text}
        />
      );
    }

    return (
      <ScrollView
        scrollEventThrottle={16}
        onMomentumScrollBegin={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
        onScroll={(event) => {
          handleMessageReplyScroll(event);
        }}
        contentContainerStyle={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        horizontal={true}
      >
        {ShowReply && (
          <View className="flex flex-row items-center justify-center bg-neutral-300 rounded-full h-[40px] w-[40px] ">
            <Entypo name="reply" size={24} color="white" />
          </View>
        )}
        <FadeInView>{result}</FadeInView>
      </ScrollView>
    );
  }
);

export default MessageItem;
