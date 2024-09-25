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
import { serverTimestamp } from "firebase/firestore";
import CreateRoomIfNotExists from "../Chats/SendData/CreateRoomIfNotExists";
import { useNavigation } from "@react-navigation/native";

// interface IndexQuestionInputProps {
//   toggleDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
// }

const IndexQuestionInput = ({ toggleDisplayInput }) => {
  const inputRef = useRef(null);

  const {
    isAuthenticated,
    userDetails,
    user,
    setUserDetails,
    getUserDataFromFirebase,
  } = useAuth();
  const { setNewTextQuestion } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigation = useNavigation();

  const getdataFn = async () => {
    const getdata = await getUserDataFromFirebase(user?.uid);

    if (getdata.success) {
      setUserDetails(getdata.data);
      // console.log("res data", getdata.data);
    }

    return getdata;
  };

  useEffect(() => {
    getdataFn();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTextChange = (value) => {
    setText(value);
  };
  const questionId = generateRandomId();
  const handleSendQuestion = async () => {
    setIsLoading(true);

    const hasProfanities = screenProfanities(text);
    if (hasProfanities) {
      setIsLoading(false);
      return Alert.alert("text shows inappropriate text");
    } else {
      const newQuestionObj = {
        imageUrl: "",
        menteeId: userDetails?.uid || "",
        menteeName: userDetails?.firstName || "",
        menteeAvatarName: userDetails?.avatarName,
        initialMessage: text || "",
        questionSubject: selectedSubject || "",
        Timestamp: serverTimestamp(),
        questionId: questionId,
      };

      try {
        // set new question in firebase
        const result = await setNewTextQuestion(newQuestionObj);

        if (result.success) {
          const createRoom = await CreateRoomIfNotExists(newQuestionObj);

          if (createRoom.success && isAuthenticated) {
            navigation.navigate("chat-room", {
              roomId: questionId,
              completedSession: false,
            });
            setSelectedSubject("");
            setIsLoading(false);
            setText("");
          }
        }

        // at same time create new room for mentee to join and await mentor
      } catch (error) {
        console.log(error);
      }
    }
  };
  // catch (error) {
  //   console.error(error);

  //   // if (!isAuthenticated) {
  //   //   router.push("sign-in");
  //   // }
  // }

  return (
    <CustomKeyboardView>
      <SafeAreaView className=" w-full h-full flex flex-col bg-grey-200 border  items-center justify-around">
        <ExitButton toggleDisplay={toggleDisplayInput} />

        <TextInput
          value={text}
          ref={inputRef}
          multiline={true}
          maxLength={1000}
          placeholder="Type your question"
          placeholderTextColor="orange"
          className={`w-full text-center height-[00px]  text-xl text-purple  mt-10`}
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
