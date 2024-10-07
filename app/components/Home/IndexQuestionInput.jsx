import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FormField from "../FormField/FormField";
import IconButton from "../Buttons/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomKeyboardView from "../CustomKeyboardView";
import { AuthContextProvider, useAuth } from "../../context/authContext";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChat } from "../../context/chatContext";

import SubjectSelection from "./SubjectSelection";
import { generateRandomId, screenProfanities } from "@/utils/common";
import ExitButton from "../Buttons/ExitButton";
import { Timestamp } from "firebase/firestore";
import CreateRoomIfNotExists from "../Chats/SendData/CreateRoomIfNotExists";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// interface IndexQuestionInputProps {
//   toggleDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
// }

const IndexQuestionInput = ({
  toggleDisplayInput,
  text,
  setText,
  handleSendQuestion,
  loading,
}) => {
  const inputRef = useRef(null);

  const {
    isAuthenticated,
    userDetails,
    user,
    setUserDetails,
    getUserDataFromFirebase,
  } = useAuth();

  const [selectedSubject, setSelectedSubject] = useState("");
  const navigation = useNavigation();

  const [displaySubjectSelection, setDisplaySubjectSelection] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <CustomKeyboardView>
      <SafeAreaView className=" w-full h-full flex flex-col bg-grey-200 border  items-center justify-around">
        {!displaySubjectSelection && (
          <ExitButton toggleDisplay={toggleDisplayInput} />
        )}

        <TextInput
          value={text}
          ref={inputRef}
          multiline={true}
          maxLength={1000}
          placeholder="Type your question"
          placeholderTextColor="orange"
          className={`w-full text-center h-[90%]  text-xl text-purple  mt-10`}
          cursorColor="orange"
          selectionColor="orange"
          onChangeText={(value) => {
            handleTextChange(value);
          }}
        />

        <SubjectSelection
          loading={loading}
          handleSendQuestion={handleSendQuestion}
          setDisplaySubjectSelection={setDisplaySubjectSelection}
          displaySubjectSelection={displaySubjectSelection}
          setSelectedSubject={setSelectedSubject}
          selectedSubject={selectedSubject}
        />

        <IconButton
          disabled={text.length > 0 ? false : true}
          handlePress={() => {
            setDisplaySubjectSelection(true);
          }}
          textStyles=""
          title="Next"
          containerStyles="flex flex-row-reverse  items-center  px-4 h-[50px] absolute bottom-2 right-2"
          icon={<MaterialIcons name="navigate-next" size={24} color="white" />}
        />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default IndexQuestionInput;
