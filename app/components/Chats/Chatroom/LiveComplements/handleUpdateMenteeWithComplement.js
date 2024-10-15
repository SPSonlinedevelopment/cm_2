import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { useAuth } from "@/app/context/authContext";

export const handleUpdateMenteeWithComplement = async (
  menteeId,
  complement
) => {
  const docRef = doc(db, "mentees", menteeId);

  try {
    const doc = await getDoc(docRef);

    if (!doc.exists) {
      console.log("no doc found");
      return { success: false };
    }

    const data = doc.data();

    const compsVal = data.menteeStatistics.complements[complement];

    let updateComp = `menteeStatistics.complements.${complement}`;

    await updateDoc(docRef, {
      [updateComp]: compsVal + 1,
      "menteeStatistics.XP": data.menteeStatistics.XP + 10,
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
