import { TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "../Buttons/IconButton";
import CustomKeyboardView from "../CustomKeyboardView";
import { SafeAreaView } from "react-native-safe-area-context";
import SubjectSelection from "./SubjectSelection";
import ExitButton from "../Buttons/ExitButton";
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
  setSelectedSubject,
  selectedSubject,
  displaySubjectSelection,
  setDisplaySubjectSelection,
}) => {
  const inputRef = useRef(null);

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
          handlePress={() => setDisplaySubjectSelection(true)}
          textStyles=""
          title="Next"
          containerStyles="flex flex-row-reverse  px-4 w-[100px] h-[50px] absolute bottom-2 right-2"
          icon={<MaterialIcons name="navigate-next" size={34} color="white" />}
        />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default IndexQuestionInput;
