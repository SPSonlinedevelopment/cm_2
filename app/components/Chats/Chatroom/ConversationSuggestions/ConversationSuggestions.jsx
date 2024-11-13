import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  mentorConvoSuggestions,
  menteeConvoSuggestions,
} from "./convoSuggestions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleSendSuggestedMessageToChatroom } from "../../SendData/SendTexts/handleSendTextMessageToChatroom";
import ToggleScrollSelectionButton from "@/app/components/Buttons/ToggleScrollSelectionButton";
import { useChatRoom } from "@/app/context/chatRoomContext";
import { useAuth } from "@/app/context/authContext";

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
            position: "absolute",
            bottom: 70,
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
