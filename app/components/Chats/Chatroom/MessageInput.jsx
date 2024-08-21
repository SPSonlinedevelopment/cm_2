import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useRef } from "react";
import { setDoc, Timestamp, doc, addDoc, collection } from "firebase/firestore";
import { getRoomId } from "@/utils/common";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/app/context/authContext";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Image } from "expo-image";

const MessageInput = React.memo(({ item }) => {
  const { userDetails } = useAuth();
  const [TextInputFocused, setTextInputFocused] = useState(false);
  const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const handleChangeText = () => {
    if (inputFieldEmpty) {
      setInputFieldEmpty(false);
      console.log("text added");
    }
  };

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

  return (
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
  );
});

export default MessageInput;
