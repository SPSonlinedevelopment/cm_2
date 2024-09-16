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
import MentorStatistics from "@/app/components/Profile/MentorProfile/MentorStatistics";
import { calculateTimeDifference } from "@/utils/common";

const ReviewMentorContainer = ({
  setDisplayFeedback,
  roomId,
  mentorId,
  menteeId,
  sessionCompletedAt,
  createdAt,
}) => {
  const [feedbackForm, setFeedbackForm] = useState({
    mentorRating: undefined,
    mentorCompliments: [],
    writtenFeedback: "",
    confidenceRatingBefore: undefined,
    confidenceRatingAfter: undefined,
  });

  const duration = calculateTimeDifference(createdAt, sessionCompletedAt);

  const addMentorReviewToRoom = async () => {
    const roomRef = doc(db, "rooms", roomId);
    try {
      await updateDoc(roomRef, {
        mentorReview: feedbackForm,
        reviewForMentorCompleted: true,
        duration: duration,
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
  };

  const updateMentorStats = async () => {
    const mentorRef = doc(db, "mentors", mentorId);

    try {
      const mentorDoc = await getDoc(mentorRef);
      if (!mentorDoc.exists()) {
        throw new Error("Mentor document not found.");
      }
      const mentorData = mentorDoc.data();

      const updatedStars = [
        ...mentorData.mentorStatistics.stars,
        feedbackForm.mentorRating,
      ];

      const feedbackCounts = {
        clear: 0,
        fast: 0,
        friendly: 0,
        helpful: 0,
      };

      feedbackForm?.mentorCompliments.forEach((stat) => {
        if (stat === "Clear") feedbackCounts.clear++;
        if (stat === "Fast") feedbackCounts.fast++;
        if (stat === "Friendly") feedbackCounts.friendly++;
        if (stat === "Helpful") feedbackCounts.helpful++;
      });

      await updateDoc(mentorRef, {
        "mentorStatistics.stars": updatedStars,
        "mentorStatistics.questions": mentorData.mentorStatistics.questions + 1,
        "mentorStatistics.compliments.clear":
          mentorData.mentorStatistics.compliments.clear + feedbackCounts.clear,
        "mentorStatistics.compliments.fast":
          mentorData.mentorStatistics.compliments.fast + feedbackCounts.fast,
        "mentorStatistics.compliments.friendly":
          mentorData.mentorStatistics.compliments.friendly +
          feedbackCounts.friendly,
        "mentorStatistics.compliments.helpful":
          mentorData.mentorStatistics.compliments.helpful +
          feedbackCounts.helpful,
        "mentorStatistics.time": mentorData.mentorStatistics.time + duration,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateMenteeStats = async () => {
    const menteeRef = doc(db, "mentees", menteeId);
    const menteeDoc = await getDoc(menteeRef);

    if (!menteeDoc.exists()) {
      throw new Error("Mentor document not found.");
    }

    const menteeData = menteeDoc.data();

    // this isnt updating
    console.log("duration", duration);
    console.log(" menteeData.questions", menteeData.questions);
    console.log("enteeData.time ", menteeData.time);

    try {
      await updateDoc(menteeRef, {
        "menteeStatistics.time": menteeData.time + duration,
        "menteeStatistics.questions": menteeData.questions + 1,
      });
    } catch (error) {
      console.log(error);
      throw error;
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
          <CelebrationAnimation loop={false} size={400} />
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
                updateMentorStats();
                updateMenteeStats();
                setDisplayFeedback(false);
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
