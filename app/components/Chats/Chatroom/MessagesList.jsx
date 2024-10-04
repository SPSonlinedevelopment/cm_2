import { View, Text, FlatList, ScrollView } from "react-native";
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
}) => {
  const [messages, setMessages] = useState([]);

  console.log("mode", userDetails);

  const mode = userDetails?.mode;

  let connectedMessage = [];

  // if (chatRoomData?.connectedMentor) {
  //   connectedMessage = [
  //     {
  //       messageType: "connected",
  //       senderName: "Collet owl",
  //       text: `You are now connected with your ${
  //         mode === "mentee" ? "mentor" : "mentee"
  //       } , their name is ${
  //         mode === "mentee"
  //           ? chatRoomData?.mentorName
  //           : chatRoomData?.menteeName
  //       }`,

  //       createdAt: Timestamp.fromDate(new Date()),
  //       messageId: "TestMessageId7",
  //       senderAvatar: `${
  //         mode === "mentee"
  //           ? chatRoomData?.mentorAvatar
  //           : chatRoomData?.menteeAvatar
  //       }`,
  //     },
  //   ];
  // }

  useEffect(() => {
    let initialMessage = [];
    if (mode === "mentee") {
      initialMessage = [
        {
          text: chatRoomData?.initialMessage || "",
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
          text: `${chatRoomData.mentorName} please remember to use good English and be polite to your mentee!`,
          senderName: "Collet owl",
          messageId: "TestMessageId5",
        },

        {
          text: chatRoomData?.initialMessage || "",
          userId: chatRoomData?.menteeId,
          senderName: chatRoomData?.menteeName,
          messageId: "TestMessageId2",
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

  // const resetUnreadMessageNumber = async () => {
  //   // await updateDoc(docRef, {
  //   //   unreadMessagesNumber: 0,
  //   // });
  // };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    storeObjectAsyncStorage(
      chatRoomData?.roomId,
      lastMessage ? lastMessage?.text : ""
    );
    scrollToEnd();

    setTimeout(() => {
      // resetUnreadMessageNumber();
    }, 300);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [messages]);

  return (
    <ScrollView ref={scrollViewRef}>
      {messages?.map((message) => {
        return (
          <MessageItem
            mentorId={chatRoomData.mentorId}
            setReplyRecipientName={setReplyRecipientName}
            setReplyMessage={setReplyMessage}
            // ShowReply={ShowReply}
            // setShowReply={setShowReply}
            setDisplayShowReplyBar={setDisplayShowReplyBar}
            message={message}
            key={message.Id}
            userId={userId}
          ></MessageItem>
        );
      })}

      {mode === "mentee" && chatRoomData.sessionCompleted && (
        <View className="w-full absolute  ">
          <CelebrationAnimation loop={false} size={500} />
        </View>
      )}

      {chatRoomData.sessionCompleted && (
        <SessionSummary userDetails={userDetails} chatRoomData={chatRoomData} />
      )}
    </ScrollView>
  );
};

export default MessagesList;
