import {
  Timestamp,
  doc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { generateRandomId } from "@/utils/common";

// handle sending a message

export const handleSendTextMessageToChatroom = async (
  roomId,
  text,
  userDetails,
  type,
  replyMessage
) => {
  let message = text.trim();

  if (!message) return;

  try {
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const commondata = {
      userId: userDetails?.uid,
      userName: userDetails?.firstName,
      text: message,
      createdAt: Timestamp.fromDate(new Date()),
    };

    let result;
    if (type === "reply") {
      result = await addDoc(messagesRef, {
        ...commondata,
        isReply,
        reply: {
          originalIsImage: false,
          originalMessage: replyMessage,
        },
      });
    } else if (type === "complement") {
      result = await addDoc(messagesRef, {
        ...commondata,
        isMenteeCompliment: true,
      });
    } else {
      result = await addDoc(messagesRef, {
        ...commondata,
      });
    }

    const newMeessageDocRef = doc(messagesRef, result.id);
    await updateDoc(newMeessageDocRef, { messageId: result.id });
    return { success: true };
  } catch (error) {
    console.log("🚀 ~ error:", error);

    return { success: false };
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
    const commondata = {
      userId: userDetails?.uid,
      userName: userDetails?.firstName,
      text: message,
      createdAt: Timestamp.fromDate(new Date()),
    };

    const result = await addDoc(messagesRef, {
      ...commondata,
      isReply: false,
    });

    const newMeessageDocRef = doc(messagesRef, result.id);
    await updateDoc(newMeessageDocRef, { messageId: result.id });
  } catch (error) {
    console.log(error);
  }
};
