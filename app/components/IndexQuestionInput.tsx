import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FormField from "./FormField/FormField";
import IconButton from "./Buttons/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomKeyboardView from "./CustomKeyboardView";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChat } from "../context/chatContext";
import { Try } from "expo-router/build/views/Try";

interface IndexQuestionInputProps {
  toggleDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndexQuestionInput: React.FC<IndexQuestionInputProps> = ({
  toggleDisplayInput,
}) => {
  const inputRef = useRef<TextInput>(null);

  const { isAuthenticated, user } = useAuth();
  const { setNewTextQuestion } = useChat();

  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleTextChange = (value: any) => {
    setText(value);
  };

  const handleSendQuestion = async () => {
    let newquestionObj = {
      menteeid: user?.uid,
      menteeName: user.firstName,
      message: text,
      questionSubject: "science",
      Timestamp: new Date(),
    };

    setIsLoading(true);

    try {
      const result = await setNewTextQuestion(newquestionObj);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    // console.log("is Authenticated", isAuthenticated);

    if (isAuthenticated) {
      router.push("chats");
    } else {
      router.push("sign-in");
    }
  };

  return (
    <CustomKeyboardView>
      <SafeAreaView className=" w-full h-full flex flex-col bg-grey-200 border  items-center justify-around">
        <IconButton
          containerStyles="h-[50px] w-[50px] bg-white absolute left-4 top-10 "
          handlePress={() => {
            toggleDisplayInput(false);
          }}
          icon={<Entypo name="cross" size={34} color="black" />}
        ></IconButton>
        <Text>{text}</Text>

        <TextInput
          ref={inputRef}
          multiline={true}
          maxLength={1000}
          placeholder="Type your question"
          className={`w-full text-center height-[500px]  text-xl `}
          cursorColor="orange"
          selectionColor="orange"
          onChangeText={(value) => {
            handleTextChange(value);
          }}
        />
        <IconButton
          isLoading={isLoading}
          handlePress={() => {
            handleSendQuestion();
          }}
          textStyles="ml-2"
          title="Send"
          containerStyles="flex flex-row  px-4 h-[50px] absolute bottom-2 right-2"
          icon={<FontAwesome name="send" size={24} color="white" />}
        />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default IndexQuestionInput;
