import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
// import {
//   mentorConvoSuggestions,
//   menteeConvoSuggestions,
// } from "../../../../../services/convoSuggestions";

import { TouchableOpacity } from "react-native-gesture-handler";
import { handleSendSuggestedMessageToChatroom } from "@/services/sendTexts/handleSendTextMessageToChatroom";

import ToggleScrollSelectionButton from "@/app/components/Buttons/ToggleScrollSelectionButton";
import { useChatRoom } from "@/app/context/chatRoomContext";
import { useAuth } from "@/app/context/authContext";

const mentorConvoSuggestions = [
  {
    id: 1,
    description: "Greeting",
    text: "Hey! How can I help today? 😄",
  },
  {
    id: 2,
    description: "Thanks",
    text: "Well done!! 🤩",
  },
  {
    id: 3,
    description: "Thanks",
    text: "Great work 🙌",
  },
  {
    id: 4,
    description: "Support",
    text: "Read the question again slowly 😄",
  },
  {
    id: 5,
    description: "Clarification",
    text: "Can you explain what you've tried so far? 🙌",
  },
  {
    id: 6,
    description: "Encouragement",
    text: "You're making progress, keep going! 💪",
  },
  {
    id: 7,
    description: "Problem-Solving",
    text: "Let's break down the problem step by step 🔍",
  },
  {
    id: 8,
    description: "Resources",
    text: "Have you checked the textbook or online resources? 📚",
  },
  {
    id: 9,
    description: "Examples",
    text: "Here are some similar examples for reference 📊",
  },
  {
    id: 10,
    description: "Visualize",
    text: "Can you draw a diagram? ✏️",
  },
  {
    id: 11,
    description: "Check Your Work",
    text: "Double-check your calculations and answers ✅",
  },
  {
    id: 12,
    description: "Seek Help",
    text: "Don't hesitate to ask for further assistance if needed 🙋‍♂️",
  },
];

const menteeConvoSuggestions = [
  {
    id: 1,
    description: "Quick Help",
    text: "Can you help me 😄?",
  },

  {
    id: 2,
    description: "Thanks",
    text: "Thanks 🤩",
  },

  {
    id: 3,
    description: "Clarification",
    text: "Got it 🙌",
  },
  {
    id: 4,
    description: "Clarification",
    text: "Can you explain that concept again? 🙃",
  },

  {
    id: 5,
    description: "Help with Homework",
    text: "I'm having trouble with this question, can you help me understand it?",
  },
  {
    id: 6,
    description: "Practice",
    text: "Can we go over some practice problems together?",
  },
  {
    id: 7,
    description: "Feedback",
    text: "How did I do on my last assignment? Any feedback?",
  },
  {
    id: 8,
    description: "Confusion",
    text: "I'm a bit confused about this topic, can you simplify it for me?",
  },
  {
    id: 9,
    description: "Extra Resources",
    text: "Do you have any additional resources I can use to study?",
  },
  {
    id: 10,
    description: "Study Tips",
    text: "Can you give me some tips on how to study more effectively?",
  },
  {
    id: 11,
    description: "Time Management",
    text: "I'm struggling with managing my time for assignments, any advice?",
  },
  {
    id: 12,
    description: "Test Preparation",
    text: "How should I prepare for the upcoming test?",
  },
  {
    id: 13,
    description: "Group Study",
    text: "Would you recommend studying in a group for this subject?",
  },
  {
    id: 14,
    description: "Revision",
    text: "Can we review the topics we covered in the last class?",
  },
  {
    id: 15,
    description: "Goal Setting",
    text: "How can I set realistic goals for my academic progress?",
  },
  {
    id: 16,
    description: "Career Advice",
    text: "Do you have any advice on choosing a career path related to this subject?",
  },
];

const ConversationSuggestions = () => {
  const { chatRoomData } = useChatRoom();
  const { userDetails } = useAuth();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleClickSuggestion = async (suggestion) => {
    setShowSuggestions(false);
    await handleSendSuggestedMessageToChatroom(
      chatRoomData,
      suggestion.text,
      userDetails
    );
  };

  const suggestions =
    userDetails.mode === "mentor"
      ? mentorConvoSuggestions
      : menteeConvoSuggestions;

  return (
    <>
      <ToggleScrollSelectionButton
        testId="toggle-button"
        icon={<Feather name="message-square" size={24} color="black" />}
        display={showSuggestions}
        setDisplay={setShowSuggestions}
        position="right"
      />

      {showSuggestions && (
        <ScrollView
          style={{
            backgroundColor: "transparent",
            marginBottom: 5,
          }}
          testID="suggestions-list"
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View className="flex flex-row  justify-end items-end">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.text}
                handleClickSuggestion={handleClickSuggestion}
                suggestion={suggestion}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ConversationSuggestions;

const Button = ({ handleClickSuggestion, suggestion }) => {
  return (
    <TouchableOpacity
      testID="suggestion_select_button"
      onPress={() => handleClickSuggestion(suggestion)}
      key={suggestion.id}
      className="flex m-2 max-w-[200px]  relative p-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow bg-white self-start"
    >
      <Text className="m-1">{suggestion.text}</Text>
      <View className="h-3 w-2 absolute bg-white bottom-0 rotate-[-30deg] right-[-2px] rounded-bl-xl" />
    </TouchableOpacity>
  );
};
