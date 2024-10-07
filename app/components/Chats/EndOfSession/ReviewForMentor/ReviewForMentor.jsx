import { View, Modal, ScrollView, Button } from "react-native";
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
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import CelebrationAnimation from "@/app/components/Effects/CelebrationAnimation";
import { calculateTimeDifference } from "@/utils/common";
import { selectRandomAvatar } from "@/app/components/Profile/Avatar";

const ReviewMentorContainer = ({
  setDisplayFeedback,
  chatRoomData: {
    roomId,
    mentorId,
    menteeId,
    sessionCompletedAt,
    createdAt,
    menteeName,
    menteeAvatar,
  },
}) => {
  const [feedbackForm, setFeedbackForm] = useState({
    mentorRating: undefined,
    mentorCompliments: [],
    writtenFeedback: "",
    confidenceRatingBefore: undefined,
    confidenceRatingAfter: undefined,
  });
  console.log("🚀 ~ feedbackForm:", feedbackForm);
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
      console.log("added data to Completedroom");
      await deleteDoc(roomRef);
      console.log("deleted room");
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
        Clear: 0,
        Fast: 0,
        Friendly: 0,
        Helpful: 0,
        Kind: 0,
        Smart: 0,
        SolvedProblems: 0,
        Supportive: 0,
      };

      feedbackForm?.mentorCompliments.forEach((stat) => {
        if (stat === "Clear") feedbackCounts.Clear++;
        if (stat === "Fast") feedbackCounts.Fast++;
        if (stat === "Friendly") feedbackCounts.Friendly++;
        if (stat === "Kind") feedbackCounts.Kind++;
        if (stat === "Helpful") feedbackCounts.Helpful++;
        if (stat === "Smart") feedbackCounts.Smart++;
        if (stat === "SolvedProblems") feedbackCounts.SolvedProblems++;
        if (stat === "Supportive") feedbackCounts.Supportive++;
      });

      await updateDoc(mentorRef, {
        "mentorStatistics.stars": updatedStars,
        "mentorStatistics.questions": mentorData.mentorStatistics.questions + 1,
        "mentorStatistics.compliments.Clear":
          mentorData.mentorStatistics.compliments.Clear + feedbackCounts.Clear,
        "mentorStatistics.compliments.Fast":
          mentorData.mentorStatistics.compliments.Fast + feedbackCounts.Fast,
        "mentorStatistics.compliments.Friendly":
          mentorData.mentorStatistics.compliments.Friendly +
          feedbackCounts.Friendly,
        "mentorStatistics.compliments.Helpful":
          mentorData.mentorStatistics.compliments.Helpful +
          feedbackCounts.Helpful,
        "mentorStatistics.compliments.Kind":
          mentorData.mentorStatistics.compliments.Kind + feedbackCounts.Kind,
        "mentorStatistics.compliments.Smart":
          mentorData.mentorStatistics.compliments.Smart + feedbackCounts.Smart,
        "mentorStatistics.compliments.SolvedProblems":
          mentorData.mentorStatistics.compliments.SolvedProblems +
          feedbackCounts.SolvedProblems,
        "mentorStatistics.compliments.Supportive":
          mentorData.mentorStatistics.compliments.Supportive +
          feedbackCounts.Supportive,
        "mentorStatistics.time": mentorData.mentorStatistics.time + duration,
        writtenFeedback: arrayUnion({
          menteeId,
          menteeName,
          writtenFeedback: feedbackForm.writtenFeedback,
          completedSessionId: roomId,
          createdAt: Timestamp.fromDate(new Date()),
          avatarName: menteeAvatar,
          stars: feedbackForm.mentorRating,
        }),
      });

      console.log("update mentor stats");
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

    const updatedQuestions = menteeData.menteeStatistics.questions + 1;
    const updatedTime = menteeData.menteeStatistics.time + duration;
    const updatedXp = menteeData.menteeStatistics.XP + 3;

    try {
      await updateDoc(menteeRef, {
        "menteeStatistics.time": updatedTime,
        "menteeStatistics.questions": updatedQuestions,
        "menteeStatistics.XP": updatedXp,
      });

      console.log("updated mentee stats");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  let submitButtonDisabled;

  if (
    !feedbackForm.mentorRating ||
    !feedbackForm.confidenceRatingBefore ||
    !feedbackForm.confidenceRatingAfter
  ) {
    submitButtonDisabled = true;
  } else submitButtonDisabled = false;

  return (
    <SafeAreaView>
      <Modal animationType="fade">
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
              disabled={submitButtonDisabled}
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
