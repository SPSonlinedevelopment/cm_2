import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef, Children } from "react";
import { useRoute } from "@react-navigation/native";
import CustomKeyboardView from "./components/CustomKeyboardView";
import { StatusBar } from "expo-status-bar";
import ChatroomHeader from "./components/Chats/Chatroom/ChatroomHeader";

import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";


import {
  setDoc,
  Timestamp,
  doc,
  FieldValue,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
  arrayUnion,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getRoomId } from "@/utils/common";
import { db } from "@/firebaseConfig";

import { SafeAreaView } from "react-native-safe-area-context";
import MessagesList from "./components/Chats/Chatroom/MessagesList";

import { useAuth } from "./context/authContext";
import MessageInput from "./components/Chats/Chatroom/MessageInput";

const ChatRoom = () => {
  const ios = Platform.OS == "ios";
  const route = useRoute();
  const { isNewQuestion, item } = route?.params;
  const [newRoomCreated, setNewRoomCreated] = useState(false);
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

  console.log("Item22", item);

  useEffect(() => {
    if (isNewQuestion) {
      createRoomIfNotExists();
    }

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

  const createRoomIfNotExists = async () => {
    const roomId = getRoomId();

    if (!newRoomCreated) {
      try {
        await setDoc(doc(db, "rooms", roomId), {
          initialImageUrl: item?.imageUrl,
          mentorId: userDetails?.uid,
          mentorName: userDetails?.firstName,
          menteeId: item?.menteeId,
          menteeName: item?.menteeName,
          questionSubject: item?.questionSubject,
          safeguardingConcern: false,
          sessionName: "",
          roomId,
          initialMessage: item?.initialMessage,
          createdAt: Timestamp.fromDate(new Date()),
        });

        setNewRoomCreated(true);
      } catch (error) {
        console.log("Error creating room:", error);
      }
    }

    try {
      const docRef = doc(db, "new_question", item?.id); // Replace 'new_question' with your collection name
      await deleteDoc(docRef);
      console.log("Document deleted successfully!");
    } catch (error) {
      console.log("error", error);
    }
  };

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
