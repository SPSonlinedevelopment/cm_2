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
import CustomKeyboardView from "./components/CustomKeyboardView";
import { StatusBar } from "expo-status-bar";
import ChatroomHeader from "./components/Chats/Chatroom/ChatroomHeader";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  setDoc,
  Timestamp,
  doc,
  FieldValue,
  updateDoc,
  addDoc,
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
  const item = useLocalSearchParams(); // Assuming newItem is an object

  const [TextInputFocused, setTextInputFocused] = useState(false);

  const { userDetails } = useAuth();
  const inChat = true;
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 0 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  const textRef = useRef();
  const inputRef = useRef(null);

  const initialMessage = [
    {
      text: item?.message,
      senderName: item?.menteeid,
      createdAt: Timestamp.fromDate(new Date()),
    },
    {
      text: "Hey 👋",
      senderName: "Collet owl",
      createdAt: Timestamp.fromDate(new Date()),
    },
    {
      text: "I'm connecting you with a mentor. Meanwhile, can you tell me more about your problem? ",
      senderName: "Collet owl",
      createdAt: Timestamp.fromDate(new Date()),
    },
    {
      text: "Remember to use good english and be polite!",
      senderName: "Collet owl",
      createdAt: Timestamp.fromDate(new Date()),
    },
  ];

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    createRoomIfNotExists();

    // const docRef = doc(db, "rooms", roomId);
    // const messagesRef = collection(docRef, "messages");
    // const q = query(messagesRef, orderBy("createdAt", "asc"));
    // let unsub = onSnapshot(q, (snapshot) => {
    //   let allMessages = snapshot.docs.map((doc) => {
    //     return doc.data();
    //   });
    //   setMessages((prev) => {
    //     const newState = [...initialMessage, ...allMessages];
    //     return newState;
    //   });
    // });
    // // const KeyBoardDidShowListener = Keyboard.addListener(
    // //   "keyboardDidShow",
    // //   updateScrollView
    // // );
    // return () => {
    //   unsub();
    //   // KeyBoardDidShowListener.remove();
    // };
  }, []);

  console.log(item);

  const createRoomIfNotExists = async () => {
    // let roomId = getRoomId(userDetails?.uid, item?.menteeid);
    let roomId = getRoomId();
    // check room !exists
    // console.log("roomid", roomId);

    //  mentor MODE

    try {
      const result = await setDoc(doc(db, "rooms", roomId), {
        mentorId: userDetails?.uid,
        menteeId: item?.menteeid,
        questionSubject: item?.questionSubject,
        safeguardingConcern: false,
        sessionName: "",
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log("Error creating room:", error);
    }

    // try {
    //   // let roomId = getRoomId(userDetails?.uid, item?.menteeid);

    //   const result = await setDoc(doc(db, "rooms", roomId), {
    //     mentorId: userDetails?.uid,
    //     menteeId: item?.menteeid,
    //     questionSubject: item?.questionSubject,
    //     safeguardingConcern: false,
    //     sessionName: "",
    //     roomId,
    //     createdAt: Timestamp.fromDate(new Date()),
    //   });
    // } catch (error) {
    //   console.log("Error creating room:", error);
    // }

    // try {
    //   const menteesCollectionRef = collection(db, "mentees");
    //   const menteeDocRef = doc(menteesCollectionRef, item?.menteeid);

    //   // Fetch the document to check if the value already exists in the array
    //   const menteeDocSnapshot = await getDoc(menteeDocRef);
    //   const data = menteeDocSnapshot.data();

    //   // Check if the value doesn't already exist in the array before updating
    //   if (
    //     data.linkedChatroom &&
    //     !data.linkedChatroom.some((room) => room.roomId === roomId)
    //   ) {
    //     try {
    //       await updateDoc(menteeDocRef, {
    //         linkedChatroom: arrayUnion({
    //           roomId: roomId,
    //           menteeId: item?.menteeid,
    //           mentorId: userDetails?.uid,
    //           questionSubject: questionSubject,
    //         }),
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // const updateScrollView = () => {
  //   setTimeout(() => {
  //     scrollViewRef?.current?.scrollToEnd({ animated: true });
  //   }, 100);
  // };

  useEffect(() => {
    // updateScrollView();
  }, [messages]);

  const handleFocus = () => {
    setTextInputFocused(true);
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();

    if (!message) return;

    {
      try {
        const docRef = doc(db, "rooms", roomId);

        const messagesRef = collection(docRef, "messages");
        textRef.current = "";

        if (inputRef) inputRef?.current?.clear();

        const newDoc = await addDoc(messagesRef, {
          // userId: userDetails?.uid,
          text: message,
          // profileUrl: user?.profileUrl,
          // senderName: user?.username,
          createdAt: Timestamp.fromDate(new Date()),
        });

        console.log("new message id ", newDoc.id);
      } catch (error) {
        Alert.alert("Message", error.message);
      }
    }
  };

  return (
    <CustomKeyboardView>
      <KeyboardAvoidingView
        behavior={ios ? "padding" : "height"}
        style={{
          flex: 1,
        }}
        {...kavConfig}
        contentContainerStyle={{ flex: 1 }}
      >
        <View className="w-full  h-full flex-col justify-between bg-purple-50 border">
          <ChatroomHeader user={{ item }} router={router} />

          <Text> MentorUSER {userDetails?.uid}</Text>
          <Text> Mentee {item?.menteeId}</Text>

          <Text> ITEM {JSON.stringify(item)}</Text>

          <MessagesList messages={messages} />
          <Text>{JSON.stringify(TextInputFocused)}/</Text>
          <View
            style={{}}
            className={`min-h-[70px] ${
              TextInputFocused ? "pb-[0px]" : "pb-[25px]"
            } shadow bg-neutral-200  flex flex-row items-center `}
          >
            <View className="flex-row justify-between    m-2  w-[80%] ">
              <TextInput
                ref={inputRef}
                onFocus={handleFocus}
                onChangeText={(value) => (textRef.current = value)}
                style={{
                  fontSize: hp(2),
                  backgroundColor: "white",
                  display: "flex",
                  padding: 10,
                  // height: 50,
                  borderRadius: "20%",
                  border: "1px solid red",
                }}
                className="flex-1 mr-3 p-2 items-center justify-center"
                multiline={true}
                numberOfLines={10}
                //   className="flex-1  w-full   "
                placeholder="type message ..."
              />
            </View>
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bh-neutral-200 p-2   flex items-center justify-center rounded-full bg-orange-600 pr-[10px]"
            >
              <Feather name="send" color="white" size={hp(2.7)} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </CustomKeyboardView>
  );
};

export default ChatRoom;
