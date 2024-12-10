import { doc, collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Alert } from "react-native";



export const handleSendImageMessageToChatroom = async (
  item,
  textRef,
  inputRef,
  userDetails,
  imageUrl
) => {
  if (!imageUrl) return;
  let caption = "";

  if (textRef.current) {
    caption = textRef.current.trim();
  }

  try {
    const docRef = doc(db, "rooms", item?.roomId);
    const messagesRef = collection(docRef, "messages");

    if (inputRef) inputRef?.current?.clear();

    const newDoc = await addDoc(messagesRef, {
      userId: userDetails?.uid,
      userName: userDetails?.firstName,
      text: caption,
      createdAt: Timestamp.fromDate(new Date()),
      image: true,
      imageUrl: imageUrl,
    });
    textRef.current = "";
    console.log("new message id ", newDoc.id);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    Alert.alert("error sending message");
    textRef.current = "";
  }
  return;
};
