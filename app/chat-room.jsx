import { KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import ChatroomHeader from "./components/Chats/Chatroom/ChatroomHeader";
import {
  Timestamp,
  doc,
  collection,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import MessagesList from "./components/Chats/Chatroom/MessagesList";
import { useAuth } from "./context/authContext";
import MessageInput from "./components/Chats/Chatroom/MessageInput";
import { storeObjectAsyncStorage } from "../utils/common";

const ChatRoom = () => {
  const ios = Platform.OS == "ios";
  const route = useRoute();
  const { item } = route?.params;

  const [messages, setMessages] = useState([]);
  const { userDetails } = useAuth();

  const inChat = true;
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 0 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  // const textRef = useRef(null);
  // const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    let initialMessage = [];

    if (userDetails?.mode === "mentee") {
      initialMessage = [
        {
          senderId: item?.menteeid,
          senderName: item?.menteeName,
          text: null,
          imageUrl: item?.initialImageUrl || null,
        },
        {
          text: item?.initialMessage || "",
          senderId: item?.menteeid,
          senderName: item?.menteeName,
        },
        {
          text: `Hey ${item.menteeName} 👋. Thanks for your message!`,
          senderName: "Collet owl",
        },
        {
          text: "I'm connecting you with a mentor. Meanwhile, can you tell me more about your problem? ",
          senderName: "Collet owl",
        },
        {
          text: "Remember to use good English and be polite!",
          senderName: "Collet owl",
        },
      ];
    } else if (userDetails?.mode === "mentor") {
      initialMessage = [
        {
          senderId: item?.menteeid,
          senderName: item?.menteeName,
          text: null,
          imageUrl: item?.initialImageUrl || null,
        },
        {
          text: `You are now connected with a mentee, they're name is ${item?.menteeName} `,
          senderName: "Collet owl",
          createdAt: Timestamp.fromDate(new Date()),
        },
      ];
    }

    // get all current messages from firebase
    const docRef = doc(db, "rooms", item?.roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

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
    const lastMessage = messages[messages.length - 1];
    console.log("🚀 ~ ChatRoom ~ lastMessage:", lastMessage);

    storeObjectAsyncStorage(item?.roomId, lastMessage ? lastMessage?.text : "");
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  updateScrollView();

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{
        flex: 1,
      }}
      {...kavConfig}
      contentContainerStyle={{ flex: 1 }}
    >
      <ChatroomHeader item={{ item }} />

      {messages && (
        <MessagesList scrollViewRef={scrollViewRef} messages={messages} />
      )}
      <MessageInput item={item} />
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
