import { setDoc, Timestamp, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const CreateRoomIfNotExists = async (newQuestionObj, userDetails) => {
  try {
    // Create room document
    const roomData = {
      initialImageUrl: newQuestionObj?.imageUrl,
      connectedMentor: false,
      mentorId: userDetails?.uid,
      mentorName: userDetails?.firstName,
      mentorAvatar: userDetails?.avatarName,
      menteeId: newQuestionObj?.menteeId,
      menteeName: newQuestionObj?.menteeName,
      menteeAvatar: newQuestionObj?.menteeAvatarName,
      questionSubject: newQuestionObj?.questionSubject,
      initialMessage: newQuestionObj?.initialMessage,
      safeguardingConcern: false,
      sessionName: "",
      roomId: newQuestionObj?.roomId,
      menteeIsTyping: false,
      mentorIsTyping: false,
      sessionCompleted: false,
      reviewForMentorCompleted: false,
      reviewForMenteeCompleted: false,
      createdAt: Timestamp.fromDate(new Date()),
    };

    await setDoc(doc(db, "rooms", newQuestionObj?.roomId), roomData);

    // Delete question from the new question list
    const questionDocRef = doc(db, "new_question", newQuestionObj?.roomId);
    await deleteDoc(questionDocRef);

    return { success: true, message: "New Room created and question deleted" };
  } catch (error) {
    console.error("Error:", error);

    return { success: false, message: error };
  }
};
