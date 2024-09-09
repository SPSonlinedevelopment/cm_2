import { View, Text, Modal, ScrollView } from "react-native";
import React, { useState } from "react";
import XPEarned from "./XPEarned";
import RateLesson from "./RateLesson";
import Complements from "./Complements";
import WrittenFeedback from "./WrittenFeedback";
import Confidence from "./ConfidenceBeforeAndAfter";
import IconButton from "@/app/components/Buttons/IconButton";
import ExitButton from "../../../Buttons/ExitButton";
import { SafeAreaView } from "react-native-safe-area-context";

const ReviewMentorContainer = ({ setDisplayMentorFeedback }) => {
  const [feedbackForm, setFeedbackForm] = useState({
    mentorRating: undefined,
    mentorCompliments: [],
    writtenFeedback: "",
    confidenceRatingBefore: undefined,
    confidenceRatingAfter: undefined,
  });
  console.log("🚀 ~ ReviewMentorContainer ~ feedbackForm:", feedbackForm);
  return (
    <SafeAreaView>
      <Modal animationType="fade">
        <ExitButton setDisplayMentorFeedback={setDisplayMentorFeedback} />
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            justifyContent: "center",
          }}
          className="mt-20 "
        >
          <XPEarned />
          <RateLesson setFeedbackForm={setFeedbackForm} />
          <Complements setFeedbackForm={setFeedbackForm} />
          <WrittenFeedback setFeedbackForm={setFeedbackForm} />
          <Confidence setFeedbackForm={setFeedbackForm} />
          <View className="w-full flex items-center my-10">
            <IconButton
              containerStyles="w-[85%] h-[40px] flex items-center"
              handlePress={() => {}}
              title="Submit Feedback"
            />
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewMentorContainer;
