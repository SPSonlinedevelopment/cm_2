import { View, Modal, ScrollView } from "react-native";
import React, { useState } from "react";
import XPEarned from "./XPEarned";
import RateLesson from "./RateLesson";
import Complements from "./Complements";
import WrittenFeedback from "./WrittenFeedback";
import Confidence from "./ConfidenceBeforeAndAfter";
import IconButton from "@/app/components/Buttons/IconButton";
import ExitButton from "../../../Buttons/ExitButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "@/firebaseConfig";

import {
  collection,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import CelebrationAnimation from "@/app/components/Effects/CelebrationAnimation";
import { Timestamp } from "firebase/firestore";
import { calculateDuration } from "@/utils/common";
import { serverTimestamp } from "firebase/firestore";

const ReviewMentorContainer = ({
  setDisplayMentorFeedback,
  roomId,
  createdAt,
}) => {
  const [feedbackForm, setFeedbackForm] = useState({
    mentorRating: undefined,
    mentorCompliments: [],
    writtenFeedback: "",
    confidenceRatingBefore: undefined,
    confidenceRatingAfter: undefined,
  });

  const addMentorReviewToRoom = async () => {
    const roomRef = doc(db, "rooms", roomId);
    try {
      await updateDoc(roomRef, {
        mentorReview: feedbackForm,
        sessionCompleted: true,
        sessionCompletedAt: Timestamp.now(),
      });

      // Get the room document from the 'rooms' collection
      const roomData = (await getDoc(roomRef)).data();

      const messagesRef = collection(roomRef, "messages");
      const messagesSnapshot = await getDocs(messagesRef);

      await setDoc(doc(db, "completed_sessions", roomId), {
        ...roomData,
      });

      messagesSnapshot.forEach(async (messageDoc) => {
        const messageData = messageDoc.data();
        await setDoc(
          doc(db, "completed_sessions", roomId, "messages", messageDoc.id),
          messageData
        );
      });

      await deleteDoc(roomRef);
    } catch (error) {
      console.error(`Error adding fields to room ${roomId}:`, error);
    }

    setDisplayMentorFeedback(false);
  };

  return (
    <SafeAreaView>
      <Modal animationType="fade">
        <ExitButton toggleDisplay={setDisplayMentorFeedback} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            justifyContent: "center",
          }}
          className="mt-20 "
        >
          <CelebrationAnimation size={400} />
          <XPEarned />
          <RateLesson setFeedbackForm={setFeedbackForm} />
          <Complements
            feedbackForm={feedbackForm}
            setFeedbackForm={setFeedbackForm}
          />
          <WrittenFeedback setFeedbackForm={setFeedbackForm} />
          <Confidence
            feedbackForm={feedbackForm}
            setFeedbackForm={setFeedbackForm}
          />
          <View className="w-full flex items-center my-10">
            <IconButton
              containerStyles="w-[85%] h-[40px] flex items-center"
              handlePress={() => {
                addMentorReviewToRoom();
              }}
              title="Submit Feedback"
            />
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewMentorContainer;
