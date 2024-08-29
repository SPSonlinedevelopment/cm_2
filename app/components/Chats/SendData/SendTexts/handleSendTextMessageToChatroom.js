import { Timestamp, doc, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// handle sending a message
export const handleSendTextMessageToChatroom = async (
  item,
  textRef,
  inputRef,
  userDetails
) => {
  let message = textRef.current.trim();

  console.log("🚀 ~ handleSendTextMessage ~ message:", message);
  if (!message) return;
  {
    try {
      const docRef = doc(db, "rooms", item?.roomId);
      const messagesRef = collection(docRef, "messages");

      if (inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messagesRef, {
        userId: userDetails?.uid,
        userName: userDetails?.firstName,
        text: message,
        createdAt: Timestamp.fromDate(new Date()),
      });
      textRef.current = "";
      console.log("new message id ", newDoc.id);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
};
