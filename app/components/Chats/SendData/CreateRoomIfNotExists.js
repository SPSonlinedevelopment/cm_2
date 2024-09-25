import { setDoc, Timestamp, doc, deleteDoc } from "firebase/firestore";
import { getRoomId } from "@/utils/common";
import { db } from "@/firebaseConfig";
import { useAuth } from "../../../context/authContext";
import { serverTimestamp } from "firebase/firestore";

export default CreateRoomIfNotExists = async (newquestionObj) => {
  console.log("🚀 ~ CreateRoomIfNotExists= ~ newquestionObj:", newquestionObj);
  try {
    const roomId = newquestionObj.questionId;

    // Create room document
    const roomData = {
      initialImageUrl: newquestionObj?.imageUrl,
      connectedMentor: false,
      // mentorId: userDetails?.uid,
      // mentorName: userDetails?.firstName,
      // mentorAvatar: userDetails?.avatarName,
      menteeId: newquestionObj?.menteeId,
      menteeName: newquestionObj?.menteeName,
      menteeAvatar: newquestionObj?.menteeAvatarName,
      questionSubject: newquestionObj?.questionSubject,
      initialMessage: newquestionObj?.initialMessage,
      safeguardingConcern: false,
      sessionName: "",
      roomId,
      menteeIsTyping: false,
      mentorIsTyping: false,
      sessionCompleted: false,
      reviewForMentorCompleted: false,
      reviewForMenteeCompleted: false,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "rooms", roomId), roomData);

    // Delete question from the new question list
    const questionDocRef = doc(db, "new_question", roomId);
    // await deleteDoc(questionDocRef);

    return { success: true, message: "New Room created and question deleted" };
  } catch (error) {
    console.error("Error:", error);

    return { success: false, message: error };
  }
};
