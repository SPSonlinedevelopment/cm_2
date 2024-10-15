import { View, Modal, ScrollView } from "react-native";
import React, { useState } from "react";
import NameSession from "./NameSession";
import { SafeAreaView } from "react-native-safe-area-context";
import ExitButton from "../../Buttons/ExitButton";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";

import { useAuth } from "@/app/context/authContext";

const ReviewForMentee = ({ setDisplayFeedback, roomId }) => {
  const [menteeFeedbackForm, setMenteeFeedbackForm] = useState({
    sessionName: "",
  });

  const { userDetails } = useAuth();

  // what are feeback field for mentor to mentee

  const handleConfirmEndSession = async () => {
    const roomRef = doc(db, "rooms", roomId);

    try {
      await updateDoc(roomRef, {
        sessionCompleted: true,
        sessionCompletedAt: Timestamp.now(),
        sessionName: menteeFeedbackForm.sessionName,
        reviewForMentorCompleted: false,
        reviewForMenteeCompleted: true,
      });
      setDisplayFeedback(false);
      console.log("session ended and updated");
    } catch (error) {
      console.log("error updating room completed status", error);
    }
  };

  return (
    <SafeAreaView>
      <Modal animationType="fade">
        <ExitButton toggleDisplay={setDisplayFeedback} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            justifyContent: "center",
          }}
          className="mt-20 "
        >
          {userDetails?.mode === "mentor" && (
            <NameSession
              menteeFeedbackForm={menteeFeedbackForm}
              handleConfirmEndSession={handleConfirmEndSession}
              setMenteeFeedbackForm={setMenteeFeedbackForm}
              setDisplayFeedback={setDisplayFeedback}
            />
          )}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewForMentee;
