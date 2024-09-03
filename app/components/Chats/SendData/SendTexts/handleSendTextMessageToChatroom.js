import { Timestamp, doc, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { generateRandomId } from "@/utils/common";

// handle sending a message
export const handleSendTextMessageToChatroom = async (
  item,
  textRef,
  inputRef,
  userDetails,
  isReply
) => {
  let message = textRef.current.trim();

  if (!message) return;
  {
    try {
      const docRef = doc(db, "rooms", item?.roomId);
      const messagesRef = collection(docRef, "messages");

      if (inputRef) inputRef?.current?.clear();

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
            originalMessage: "djaksa",
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

      textRef.current = "";
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
};
