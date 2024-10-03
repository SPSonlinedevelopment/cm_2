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

// interface ConversationSelectionProps {
//   setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
//   selectedSubject: string;
// }

const MentorConversationSuggestions = ({ userDetails, isReply, item }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const textRef = useRef(null);

  const handleClickSuggestion = async (suggestion) => {
    console.log("suggestion", suggestion);
    textRef.current = suggestion.text;
    console.log(textRef.current);
    await handleSendSuggestedMessageToChatroom(item, textRef, userDetails);

    setShowSuggestions(!showSuggestions);
  };

  if (!showSuggestions) {
    return (
      <IconButton
        containerStyles="bg-white w-[40px] w-[40px] p-2  absolute bottom-[145px] right-[10px]  "
        icon={<Feather name="message-square" size={24} />}
        handlePress={() => {
          console.log("sjdhj");
          setShowSuggestions(!showSuggestions);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      />
    );
  } else
    return (
      <View className="absolute bottom-[90px]">
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {userDetails.mode === "mentor"
            ? mentorConvoSuggestions.map((suggestion) => (
                <TouchableOpacity
                  onPress={() => handleClickSuggestion(suggestion)}
                  key={suggestion.id}
                  className="flex h-[100px] w-[200px] m-2 relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow bg-white self-start"
                >
                  <Text className="text-sm text-purple-900 m-1">
                    {suggestion.description}
                  </Text>
                  <Text className="m-1">{suggestion.text}</Text>
                  <View className="h-3 w-2 absolute bg-white bottom-0 rotate-[-30deg] right-[-2px] rounded-bl-xl" />
                </TouchableOpacity>
              ))
            : menteeConvoSuggestions.map((suggestion) => (
                <TouchableOpacity
                  onPress={() => handleClickSuggestion(suggestion)}
                  key={suggestion.id}
                  className="flex h-[100px] w-[200px] m-2 relative p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl shadow bg-white self-start"
                >
                  <Text className="text-sm text-purple-900 m-1">
                    {suggestion.description}
                  </Text>
                  <Text className="m-1">{suggestion.text}</Text>
                  <View className="h-3 w-2 absolute bg-white bottom-0 rotate-[-30deg] right-[-2px] rounded-bl-xl" />
                </TouchableOpacity>
              ))}
        </ScrollView>
        <IconButton
          containerStyles="bg-white w-[40px] h-[40px] absolute top-[-20px] right-2"
          icon={<Entypo name="cross" size={24} color="black" />}
          handlePress={() => {
            setShowSuggestions(!showSuggestions);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        ></IconButton>
      </View>
    );
};

export default MentorConversationSuggestions;
