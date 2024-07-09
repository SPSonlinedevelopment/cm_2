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

interface IndexQuestionInputProps {
  toggleDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndexQuestionInput: React.FC<IndexQuestionInputProps> = ({
  toggleDisplayInput,
}) => {
  const inputRef = useRef<TextInput>(null);

  const { isAuthenticated } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleSendQuestion = () => {
    setIsLoading(true);

    console.log("is Authenticated", isAuthenticated);

    if (isAuthenticated) {
      router.push("profile");
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

        <TextInput
          ref={inputRef}
          multiline={true}
          maxLength={1000}
          placeholder="Type your question"
          className={`w-full text-center height-[500px]  text-xl `}
          cursorColor="orange"
          selectionColor="orange"
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
