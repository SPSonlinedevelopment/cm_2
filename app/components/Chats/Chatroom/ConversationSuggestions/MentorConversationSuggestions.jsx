import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import IconButton from "@/app/components/Buttons/IconButton";
import Feather from "@expo/vector-icons/Feather";
import {
  mentorConvoSuggestions,
  menteeConvoSuggestions,
} from "./convoSuggestions";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { handleSendSuggestedMessageToChatroom } from "../../SendData/SendTexts/handleSendTextMessageToChatroom";

import ToggleScrollSelectionButton from "@/app/components/Buttons/ToggleScrollSelectionButton";

// interface ConversationSelectionProps {
//   setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
//   selectedSubject: string;
// }

const MentorConversationSuggestions = ({ userDetails, isReply, item }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const textRef = useRef(null);

  const handleClickSuggestion = async (suggestion) => {
    textRef.current = suggestion.text;

    await handleSendSuggestedMessageToChatroom(item, textRef, userDetails);
    setShowSuggestions(!showSuggestions);
  };

  return (
    <>
      <ToggleScrollSelectionButton
        icon={<Feather name="message-square" size={24} color="black" />}
        display={showSuggestions}
        setDisplay={setShowSuggestions}
        position="right"
      />

      {showSuggestions && (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View className="flex flex-row  justify-end items-end">
            {userDetails.mode === "mentor"
              ? mentorConvoSuggestions.map((suggestion) => (
                  <Button
                    handleClickSuggestion={handleClickSuggestion}
                    suggestion={suggestion}
                  />
                ))
              : menteeConvoSuggestions.map((suggestion) => (
                  <Button
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

export default MentorConversationSuggestions;

const Button = ({ handleClickSuggestion, suggestion }) => {
  return (
    <TouchableOpacity
      onPress={() => handleClickSuggestion(suggestion)}
      key={suggestion.id}
      className="flex m-2 max-w-[200px]  relative p-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow bg-white self-start"
    >
      <Text className="m-1">{suggestion.text}</Text>
      <View className="h-3 w-2 absolute bg-white bottom-0 rotate-[-30deg] right-[-2px] rounded-bl-xl" />
    </TouchableOpacity>
  );
};
