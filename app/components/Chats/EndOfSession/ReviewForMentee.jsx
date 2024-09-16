import { View, Modal, ScrollView } from "react-native";
import React, { useState } from "react";
import NameSession from "./NameSession";
import { SafeAreaView } from "react-native-safe-area-context";
import ExitButton from "../../Buttons/ExitButton";
import CelebrationAnimation from "../../Effects/CelebrationAnimation";
import IconButton from "../../Buttons/IconButton";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const ReviewForMentee = ({ setDisplayFeedback, roomId }) => {
  const [menteeFeedbackForm, setMenteeFeedbackForm] = useState({
    sessionName: "",
  });

  console.log("🚀 ~ menteeFeedbackForm:", menteeFeedbackForm);
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
          <NameSession
            setMenteeFeedbackForm={setMenteeFeedbackForm}
            setDisplayFeedback={setDisplayFeedback}
          ></NameSession>

          {/* <XPEarned />
          <RateLesson setFeedbackForm={setFeedbackForm} />
          <Complements
            feedbackForm={feedbackForm}
            setFeedbackForm={setFeedbackForm}
          />
          <WrittenFeedback setFeedbackForm={setFeedbackForm} />
          <Confidence
            feedbackForm={feedbackForm}
            setFeedbackForm={setFeedbackForm}
          /> */}
          <View className="w-full flex items-center my-10">
            <IconButton
              containerStyles="w-[85%] h-[40px] flex items-center"
              handlePress={() => {
                handleConfirmEndSession();

                // addReviewToRoom();
                // updateMentorStats();
                // setDisplayMentorFeedback(false);
              }}
              title="Submit Feedback"
            />
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewForMentee;
