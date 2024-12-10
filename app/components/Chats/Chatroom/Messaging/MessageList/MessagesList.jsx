import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import MessageItem from "../MessageItems/MessageItem";
import SessionSummary from "../../../EndOfSession/ReviewForMentor/SessionSummary";
import { storeObjectAsyncStorage } from "../../../../../../utils/common";
import CelebrationAnimation from "../../../../Effects/CelebrationAnimation";
import * as Haptics from "expo-haptics";
import { generateRandomId } from "../../../../../../utils/common";
import { useChatRoom } from "@/app/context/chatRoomContext";
import { useAuth } from "@/app/context/authContext";
import useMessagesListener from "../../../../../hooks/useMessagesListener";
import { Timestamp } from "firebase/firestore";
import { platformColor } from "nativewind";
import FadeInView from "@/app/components/Effects/FadeInView";

const MessagesList = ({
  scrollViewRef,
  scrollToEnd,
  replyState,
  setReplyMessageObj,
  setReplyState,
  setSelectedMessage,
  setDisplayMessageSelectedModal,
  isSendingImage,
  setDisplayReportMessageModal,
  setDisplayDeleteMessageModal,
}) => {
  const { chatRoomData } = useChatRoom();
  const { userDetails } = useAuth();

  const mode = userDetails?.mode;

  let connectedMessage = [];

  if (chatRoomData?.connectedMentor) {
    connectedMessage = [
      {
        messageType: "connected",
        senderName: "Collet owl",
        text: `You are now connected with your ${
          mode === "mentee" ? "mentor" : "mentee"
        } , their name is ${
          mode === "mentee"
            ? chatRoomData?.mentorName
            : chatRoomData?.menteeName
        }`,

        createdAt: Timestamp.fromDate(new Date()),
        messageId: generateRandomId(),
        senderAvatar: `${
          mode === "mentee"
            ? chatRoomData?.mentorAvatar
            : chatRoomData?.menteeAvatar
        }`,
      },
    ];
  }

  const initialMessage =
    mode === "mentee"
      ? [
          {
            text: chatRoomData?.initialMessage || "",
            imageUrl: chatRoomData?.initialImageUrl,
            userId: chatRoomData?.menteeId,
            senderName: chatRoomData?.menteeName,
            messageId: generateRandomId(),
          },
          {
            text: `Hey ${chatRoomData.menteeName} 👋. Thanks for your message!`,
            senderName: "Collet owl",
            messageId: generateRandomId(),
          },
          {
            text: "I'm connecting you with a mentor. Meanwhile, can you tell me more about your problem? ",
            senderName: "Collet owl",
            messageId: generateRandomId(),
          },
          {
            text: "Remember to use good English and be polite!",
            senderName: "Collet owl",
            messageId: generateRandomId(),
          },
          ...connectedMessage,
        ]
      : [
          {
            text: chatRoomData?.initialMessage || "",
            imageUrl: chatRoomData?.initialImageUrl,
            userId: chatRoomData?.menteeId,
            senderName: chatRoomData?.menteeName,
            messageId: generateRandomId(),
          },
          {
            text: `${chatRoomData.mentorName} please remember to use good English and be polite to your mentee!`,
            senderName: "Collet owl",
            messageId: generateRandomId(),
          },

          ...connectedMessage,
        ];

  const { messages, loading, error } = useMessagesListener(
    chatRoomData?.roomId,
    initialMessage,
    chatRoomData?.connectedMentor
  );

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    storeObjectAsyncStorage(
      chatRoomData?.roomId,
      lastMessage ? lastMessage?.text : ""
    );

    scrollToEnd();

    Platform.OS !== "web" &&
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [messages, chatRoomData.sessionCompleted]);

  if (loading) {
    return (
      <View
        testID="loading-messages-placeholder"
        className="flex justify-center items-center w-full h-full"
      >
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex justify-center items-center ">
        <Text className="text-base">
          Sorry: unable to find messages at this time!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={Platform.OS === "web" ? true : false}
      ref={scrollViewRef}
    >
      {messages?.map((message) => {
        return (
          <MessageItem
            setDisplayReportMessageModal={setDisplayReportMessageModal}
            setDisplayDeleteMessageModal={setDisplayDeleteMessageModal}
            setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
            setSelectedMessage={setSelectedMessage}
            setReplyMessageObj={setReplyMessageObj}
            replyState={replyState}
            setReplyState={setReplyState}
            message={message}
            key={message.messageId}
            userId={userDetails?.uid}
            scrollToEnd={scrollToEnd}
          />
        );
      })}

      {isSendingImage && (
        <LoadingImagePlaceholder
          isSendingImage={isSendingImage}
          scrollToEnd={scrollToEnd}
        />
      )}

      {chatRoomData.sessionCompleted && (
        <>
          <View className="w-full absolute  ">
            <CelebrationAnimation position="bottom" loop={false} size={500} />
          </View>
          <SessionSummary
            userDetails={userDetails}
            chatRoomData={chatRoomData}
          />
        </>
      )}
    </ScrollView>
  );
};

export default MessagesList;

const LoadingImagePlaceholder = ({ scrollToEnd }) => {
  useEffect(() => {
    scrollToEnd();
  }, []);
  return (
    <View
      testID="loading-image-placeholder"
      className="rounded-xl w-full  flex flex-row mb-1
        justify-end"
    >
      <View className=" h-[250px] w-[254px] rounded-xl shadow flex  p-[3px] flex-col justify-center items-center bg-orange-200  mr-2">
        <ActivityIndicator size="large" color="purple" />
      </View>
    </View>
  );
};
