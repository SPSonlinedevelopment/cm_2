import { setDoc, Timestamp, doc, deleteDoc } from "firebase/firestore";
import { getRoomId } from "@/utils/common";
import { db } from "@/firebaseConfig";
import { useAuth } from "../../../context/authContext";

export default CreateRoomIfNotExists = async (item, userDetails) => {
  try {
    const roomId = getRoomId();

    // Create room document
    const roomData = {
      initialImageUrl: item?.imageUrl,
      mentorId: userDetails?.uid,
      mentorName: userDetails?.firstName,
      menteeId: item?.menteeId,
      menteeName: item?.menteeName,
      questionSubject: item?.questionSubject,
      safeguardingConcern: false,
      sessionName: "",
      roomId,
      typing: {
        menteeIsTyping: false,
        mentorIsTyping: false,
      },
      initialMessage: item?.initialMessage,
      createdAt: Timestamp.fromDate(new Date()),
    };

    await setDoc(doc(db, "rooms", roomId), roomData);

    // Delete question from the new question list
    const questionDocRef = doc(db, "new_question", item?.id);
    await deleteDoc(questionDocRef);

    return { success: true, message: "New Room created and question deleted" };
  } catch (error) {
    console.error("Error:", error);

    return { success: false, message: error };
  }
};
