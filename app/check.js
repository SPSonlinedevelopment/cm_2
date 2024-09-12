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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import MessagesList from "./components/Chats/Chatroom/MessagesList";

import { useAuth } from "./context/authContext";

const ChatRoom = () => {
  const ios = Platform.OS == "ios";
  const route = useRoute();
  const { isNewQuestion, item } = route?.params;

  const [TextInputFocused, setTextInputFocused] = useState(false);
  const [isNewQ, setIsNewQ] = useState(isNewQuestion);

  const [newRoomCreated, setNewRoomCreated] = useState(false);
  const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  const [messages, setMessages] = useState([]);

  const { userDetails } = useAuth();
  const inChat = true;
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 0 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  const textRef = useRef(null);
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  console.log("Item22", item);

  let initialMessage = [];

  if (userDetails?.mode === "mentee") {
    initialMessage = [
      {
        text: item?.initialMessage || "",
        senderId: item?.menteeid,
        senderName: item?.menteeName,
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        text: `Hey ${item.menteeName} 👋. Thanks for your message!`,
        senderName: "Collet owl",
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        text: "I'm connecting you with a mentor. Meanwhile, can you tell me more about your problem? ",
        senderName: "Collet owl",
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        text: "Remember to use good English and be polite!",
        senderName: "Collet owl",
        createdAt: Timestamp.fromDate(new Date()),
      },
    ];
  } else if (userDetails?.mode === "mentor") {
    initialMessage = [
      {
        text: `You are now connected with a mentee, they're name is ${item?.menteeName} `,
        senderName: "Collet owl",
        createdAt: Timestamp.fromDate(new Date()),
      },
    ];
  }

  useEffect(() => {
    if (isNewQuestion) {
      createRoomIfNotExists();
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

  console.log("allMessages", messages);

  const createRoomIfNotExists = async () => {
    const roomId = getRoomId();

    if (!newRoomCreated) {
      try {
        await setDoc(doc(db, "rooms", roomId), {
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
          sessionCompleted: false,
          mentorReviewCompeleted: false,
          mentorReview: null,
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
    }, 100);
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const handleSendMessage = async () => {
    let message = textRef.current.trim();

    if (!message) return;

    {
      try {
        const docRef = doc(db, "rooms", item?.roomId);

        const messagesRef = collection(docRef, "messages");
        textRef.current = "";

        if (inputRef) inputRef?.current?.clear();

        const newDoc = await addDoc(messagesRef, {
          userId: userDetails?.uid,
          userName: userDetails?.firstName,
          text: message,
          createdAt: Timestamp.fromDate(new Date()),
        });

        console.log("new message id ", newDoc.id);
      } catch (error) {
        Alert.alert("Message", error.message);
      }
    }
  };

  const handleChangeText = () => {
    if (inputFieldEmpty) {
      setInputFieldEmpty(false);
      console.log("text added");
    }
  };

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
      <Text> {JSON.stringify(isNewQ)}</Text>

      {messages && (
        <MessagesList scrollViewRef={scrollViewRef} messages={messages} />
      )}

      <View
        style={{}}
        className={`${
          TextInputFocused ? "pb-[0px]" : "pb-[20px]"
        }  shadow-2xl bg-neutral-200  w-full flex flex-row justify-center items-center `}
      >
        <View className="flex-row justify-around  items-center  w-full  p-2   ">
          <TouchableOpacity className="bh-neutral-200    flex items-center justify-center rounded-full  pr-[10px]">
            <Ionicons name="add-outline" size={hp(3.5)} color="black" />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            onFocus={() => setTextInputFocused(true)}
            onBlur={() => setTextInputFocused(false)}
            onChangeText={(value) => {
              (textRef.current = value), handleChangeText();
            }}
            style={{
              fontSize: hp(2),
              backgroundColor: "white",
              display: "flex",
              padding: 4,
              borderRadius: "20%",
            }}
            className="flex-1 m-1 mr-3  p-2 items-center justify-center"
            multiline={true}
            numberOfLines={10}
            placeholder="type message ..."
          />
          {!inputFieldEmpty && (
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bh-neutral-200  h-[35px] w-[35px]  flex items-center justify-center rounded-full bg-orange-600 pr-[2px]"
            >
              <Feather name="send" color="white" size={hp(2.7)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

/* <KeyboardAvoidingView
  behavior={ios ? "padding" : "height"}
  style={{
    flex: 1,
  }}
  {...kavConfig}
  contentContainerStyle={{ flex: 1 }}
  >
  <View className="w-full  h-full flex-col justify-between bg-purple-50 "></View>
  </KeyboardAvoidingView> */

{
  /* <MessagesList scrollViewRef={scrollViewRef} messages={messages} />; */
}
