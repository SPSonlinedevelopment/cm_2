import {
  Timestamp,
  doc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { generateRandomId } from "@/utils/common";
import * as Haptics from "expo-haptics";

// handle sending a message

export const handleSendTextMessageToChatroom = async (
  item,
  text,
  inputRef,
  userDetails,
  isReply,
  replyMessage
) => {
  let message = text.trim();

  if (!message) return;
  {
    try {
      const docRef = doc(db, "rooms", item?.roomId);
      const messagesRef = collection(docRef, "messages");

      // if (inputRef) inputRef?.current?.clear();

      if (isReply) {
        const newDoc = await addDoc(messagesRef, {
          userId: userDetails?.uid,
          userName: userDetails?.firstName,
          text: message,
          createdAt: Timestamp.fromDate(new Date()),
          messageId: generateRandomId(),
          isReply: true,
          reply: {
            originalIsImage: false,
            originalImgUrl: "asdjas",
            originalMessage: replyMessage,
          },
        });
      } else {
        const newDoc = await addDoc(messagesRef, {
          userId: userDetails?.uid,
          userName: userDetails?.firstName,
          text: message,
          createdAt: Timestamp.fromDate(new Date()),
          messageId: generateRandomId(),
          isReply: isReply,
        });
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
};

export const handleSendSuggestedMessageToChatroom = async (
  item,
  textRef,
  userDetails
) => {
  let message = textRef.current.trim();

  if (!message) return;
  try {
    const docRef = doc(db, "rooms", item?.roomId);
    const messagesRef = collection(docRef, "messages");

    const newDoc = await addDoc(messagesRef, {
      userId: userDetails?.uid,
      userName: userDetails?.firstName,
      text: message,
      createdAt: Timestamp.fromDate(new Date()),
      messageId: generateRandomId(),
      isReply: false,
    });
  } catch (error) {
    console.log(error);
  }
};
