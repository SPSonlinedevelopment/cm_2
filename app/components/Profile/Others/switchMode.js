import { useAuth } from "../../../context/authContext";
import { Alert } from "react-native";

import { db } from "@/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

export const switchMode = async (userDetails) => {
  console.log("🚀 ~ switchMode ~ userDetails:", userDetails);

  try {
    if (!userDetails.admin) {
      Alert.alert("You do not have permissions to switch modes");
      return;
    } else if (userDetails.admin) {
      // some mentors can have admin roles which allows them to change mode to mentee but the userdetails are still stored only in the mentors collection SOME mentors will be admins but no mentees will be admins

      // Get a reference to the mentor document
      const mentorRef = doc(db, "mentors", userDetails.uid);

      if (userDetails.mode === "mentor") {
        // Update the 'mode' field

        // if this is the first time modes have swictched need add the stats fields found in mentee mode first as needs to be present when mode changes to update UI
        if (!userDetails.menteeStatistics) {
          await updateDoc(mentorRef, {
            menteeStatistics: {
              time: 0,
              questions: 0,
              XP: 0,
              complements: {
                "Algebra Whizz": 0,
                "High Achiever": 0,
                "Math Wizard": 0,
                "Math Genius": 0,
                "Fast Thinker": 0,
                "Beast Mode": 0,
                "Human Calculator": 0,
                "Number God": 0,
                "Physics Phenom": 0,
                "Chemistry Connoisseur": 0,
                "Biology Buff": 0,
                "Science Savant": 0,
                "Literature Luminary": 0,
                "History Hero": 0,
              },
            },
          });
        }

        // update the mode last as this switches ui
        await updateDoc(mentorRef, {
          mode: "mentee",
        });
        console.log("Mode switched to 'mentee' successfully.");
      } else {
        await updateDoc(mentorRef, {
          mode: "mentor",
        });
        console.log("Mode switched to 'mentor' successfully.");
      }
    }
  } catch (error) {
    console.log("🚀 ~ switchMode ~ error:", error);
  }
};
