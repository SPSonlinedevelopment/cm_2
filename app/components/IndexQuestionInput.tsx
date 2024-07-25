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
import SubjectSelection from "./SubjectSelection";

interface IndexQuestionInputProps {
  toggleDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndexQuestionInput: React.FC<IndexQuestionInputProps> = ({
  toggleDisplayInput,
}) => {
  const inputRef = useRef<TextInput>(null);

  const {
    isAuthenticated,
    userDetails,
    user,
    setUserDetails,
    getUserDataFromFirebase,
  } = useAuth();
  const { setNewTextQuestion } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const getdataFn = async () => {
    const getdata = await getUserDataFromFirebase(user?.uid);

    if (getdata.success) {
      setUserDetails(getdata.data);
    }

    return getdata.success;
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTextChange = (value: any) => {
    setText(value);
  };

  const handleSendQuestion = async () => {
    setIsLoading(true);

    try {
      const resultData = await getdataFn();

      console.log("resultData", resultData);

      let newquestionObj;

      if (resultData.success) {
        newquestionObj = {
          menteeid: userDetails?.uid,
          menteeName: userDetails?.firstName,
          message: text,
          questionSubject: selectedSubject,
          Timestamp: new Date(),
        };
      }

      console.log("newquestionObj", newquestionObj);

      if (newquestionObj) {
        const result = await setNewTextQuestion(newquestionObj);
        console.log(result);

        if (isAuthenticated) {
          router.push("chats");
        }
      } else {
        console.error("Failed to get data from getdataFn.");
      }
    } catch (error) {
      console.error(error);

      if (!isAuthenticated) {
        router.push("sign-in");
      }
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
          placeholderTextColor="orange"
          className={`w-full text-center height-[500px]  text-xl text-purple  mt-10`}
          cursorColor="orange"
          selectionColor="orange"
          onChangeText={(value) => {
            handleTextChange(value);
          }}
        />
        <SubjectSelection
          setSelectedSubject={setSelectedSubject}
          selectedSubject={selectedSubject}
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
