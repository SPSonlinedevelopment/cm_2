import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import SessionSummary from "../../EndOfSession/ReviewForMentor/SessionSummary";
import { storeObjectAsyncStorage } from "./../../../../../utils/common";
import CelebrationAnimation from "../../../Effects/CelebrationAnimation";
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
import Loading from "@/app/components/Loading/LoadingSpinner";
import { generateRandomId } from "./../../../../../utils/common";
import { useChatRoom } from "@/app/context/chatRoomContext";
import { useAuth } from "@/app/context/authContext";

const MessagesList = ({
  scrollViewRef,
  scrollToEnd,
  replyState,
  setReplyState,
  setSelectedMessage,
  setDisplayMessageSelectedModal,
  isSendingImage,
}) => {
  const { chatRoomData } = useChatRoom();
  const { userDetails } = useAuth();
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
        messageId: generateRandomId(),
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
      ];
    } else {
      initialMessage = [
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
    }

    const docRef = doc(db, "rooms", chatRoomData.roomId);
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
            replyState={replyState}
            setReplyState={setReplyState}
            message={message}
            key={message.messageId}
            userId={userDetails?.uid}
            roomId={chatRoomData.roomId}
            scrollToEnd={scrollToEnd}
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

const LoadingImagePlaceholder = ({ scrollToEnd }) => {
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
