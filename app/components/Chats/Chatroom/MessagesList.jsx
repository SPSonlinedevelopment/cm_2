import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { Image } from "expo-image";
import IconButton from "../../Buttons/IconButton";
import SessionSummary from "../EndOfSession/ReviewForMentor/SessionSummary";
import {
  generateRandomId,
  storeObjectAsyncStorage,
} from "./../../../../utils/common";
import CelebrationAnimation from "../../Effects/CelebrationAnimation";
import {
  Timestamp,
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import * as Haptics from "expo-haptics";
import UserDetails from "@/app/user-details";
import MessageSelectedModal from "./MessageSelected/MessageSelectedModal";
import Loading from "../../Loading/LoadingSpinner";

const MessagesList = ({
  chatRoomData,
  scrollToEnd,
  scrollViewRef,
  userId,
  setDisplayShowReplyBar,
  setReplyMessage,
  setReplyRecipientName,
  userDetails,
  roomId,
  setSelectedMessage,
  setDisplayMessageSelectedModal,
  isSendingImage,
}) => {
  const [messages, setMessages] = useState([]);

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
        messageId: "TestMessageId7",
        senderAvatar: `${
          mode === "mentee"
            ? chatRoomData?.mentorAvatar
            : chatRoomData?.menteeAvatar
        }`,
      },
    ];
  }

  useEffect(() => {
    let initialMessage = [];
    if (mode === "mentee") {
      initialMessage = [
        {
          text: chatRoomData?.initialMessage || "",
          imageUrl: chatRoomData?.initialImageUrl,
          userId: chatRoomData?.menteeId,
          senderName: chatRoomData?.menteeName,
          messageId: "TestMessageId2",
        },
        {
          text: `Hey ${chatRoomData.menteeName} 👋. Thanks for your message!`,
          senderName: "Collet owl",
          messageId: "TestMessageId3",
        },
        {
          text: "I'm connecting you with a mentor. Meanwhile, can you tell me more about your problem? ",
          senderName: "Collet owl",
          messageId: "TestMessageId4",
        },
        {
          text: "Remember to use good English and be polite!",
          senderName: "Collet owl",
          messageId: "TestMessageId5",
        },
        ...connectedMessage,
      ];
    } else {
      initialMessage = [
        {
          text: chatRoomData?.initialMessage || "",
          imageUrl: chatRoomData?.initialImageUrl,
          userId: chatRoomData?.menteeId,
          senderName: chatRoomData?.menteeName,
          messageId: "TestMessageId2",
        },
        {
          text: `${chatRoomData.mentorName} please remember to use good English and be polite to your mentee!`,
          senderName: "Collet owl",
          messageId: "TestMessageId5",
        },

        ...connectedMessage,
      ];
    }

    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    // get all current messages from firebase
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages((prev) => {
        const newState = [...initialMessage, ...allMessages];
        return newState;
      });
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (chatRoomData?.connectedMentor) {
      setMessages((prev) => {
        const newState = [...prev, ...connectedMessage];
        return newState;
      });
    }
  }, [chatRoomData?.connectedMentor]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    storeObjectAsyncStorage(
      chatRoomData?.roomId,
      lastMessage ? lastMessage?.text : ""
    );
    scrollToEnd();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [messages, chatRoomData.sessionCompleted]);

  return (
    <ScrollView ref={scrollViewRef}>
      {messages?.map((message) => {
        return (
          <MessageItem
            setDisplayMessageSelectedModal={setDisplayMessageSelectedModal}
            setSelectedMessage={setSelectedMessage}
            menteeName={chatRoomData.menteeName}
            mentorName={chatRoomData.mentorName}
            mentorId={chatRoomData.mentorId}
            setReplyRecipientName={setReplyRecipientName}
            setReplyMessage={setReplyMessage}
            setDisplayShowReplyBar={setDisplayShowReplyBar}
            message={message}
            key={message.Id}
            userId={userId}
            roomId={chatRoomData.roomId}
          ></MessageItem>
        );
      })}

      {isSendingImage && (
        <LoadingImagePlaceholder
          isSendingImage={isSendingImage}
          scrollToEnd={scrollToEnd}
        />
      )}

      {mode === "mentee" && chatRoomData.sessionCompleted && (
        <View className="w-full absolute  ">
          <CelebrationAnimation position="bottom" loop={false} size={500} />
        </View>
      )}

      {chatRoomData.sessionCompleted && (
        <SessionSummary userDetails={userDetails} chatRoomData={chatRoomData} />
      )}
    </ScrollView>
  );
};

export default MessagesList;

const LoadingImagePlaceholder = ({ scrollToEnd, isSendingImage }) => {
  scrollToEnd();
  return (
    <View
      className="rounded-xl w-full  flex flex-row mb-1
        justify-end"
    >
      <View className=" h-[250px] w-[254px] rounded-xl shadow flex  p-[3px] flex-col justify-center items-center bg-orange-200  mr-2">
        <Loading size={150} />
      </View>
    </View>
  );
};
