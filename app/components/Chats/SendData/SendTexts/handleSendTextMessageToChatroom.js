import {
  Timestamp,
  doc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { generateRandomId } from "@/utils/common";

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
  console.log("🚀 ~ message:", message);

  if (!message) return;
  {
    try {
      const docRef = doc(db, "rooms", item?.roomId);
      const messagesRef = collection(docRef, "messages");

      // if (inputRef) inputRef?.current?.clear();

      const id = generateRandomId();
      if (isReply) {
        await addDoc(
          messagesRef,
          {
            userId: userDetails?.uid,
            userName: userDetails?.firstName,
            text: message,
            createdAt: Timestamp.fromDate(new Date()),
            messageId: id,
            isReply: true,
            reply: {
              originalIsImage: false,
              originalImgUrl: "asdjas",
              originalMessage: replyMessage,
            },
          },
          id
        );
      } else {
        await addDoc(
          messagesRef,
          {
            userId: userDetails?.uid,
            userName: userDetails?.firstName,
            text: message,
            createdAt: Timestamp.fromDate(new Date()),
            messageId: id,
            isReply: isReply,
          },
          id
        );
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
  const id = generateRandomId();
  if (!message) return;
  try {
    const docRef = doc(db, "rooms", item?.roomId);
    const messagesRef = collection(docRef, "messages");

    await addDoc(
      messagesRef,
      {
        userId: userDetails?.uid,
        userName: userDetails?.firstName,
        text: message,
        createdAt: Timestamp.fromDate(new Date()),
        messageId: id,
        isReply: false,
      },
      id
    );
  } catch (error) {
    console.log(error);
  }
};
