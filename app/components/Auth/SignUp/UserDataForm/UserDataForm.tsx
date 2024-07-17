import { View, TextInput, Text, Button, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../Buttons/CustomButton";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";
import SubjectSelectionMentor from "./SubjectSelectionMentor";
import DOBPicker from "./DOBPicker";
import PartnersipSelection from "./PartnersipSelection";
import BorderUnderline from "@/app/components/Profile/BorderUnderline";
import SelectUserMode from "./SelectUserMode";
import { router } from "expo-router";
import FormField from "@/app/components/FormField/FormField";
import Names from "./Names";

export interface FormDetailProps {
  firstName: string;
  lastName: string;
  mode: string;
  dob: Date;
  subjectSelection: string[];
  partnership: string;
}

interface ErrorObject {
  dob: ErrorProperty;
  mode: ErrorProperty;
  subjectSelection: ErrorProperty;
  partnership: ErrorProperty;
  firstName: ErrorProperty;
  lastName: ErrorProperty;
}

interface ErrorProperty {
  isError: boolean;
  message: string;
}

const UserDataForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [errorObj, setErrorObj] = useState<ErrorObject>({
    dob: { isError: false, message: "" },
    mode: { isError: false, message: "" },
    subjectSelection: { isError: false, message: "" },
    partnership: { isError: false, message: "" },
    firstName: { isError: false, message: "" },
    lastName: { isError: false, message: "" },
  });

  const [formDetails, setFormDetails] = useState<FormDetailProps>({
    mode: "",
    dob: new Date(),
    subjectSelection: [],
    partnership: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = () => {
    const setFieldError = (field: keyof ErrorObject, message: string) => {
      setErrorObj((prev) => ({
        ...prev,
        [field]: {
          isError: true,
          message: message,
        },
      }));
    };

    if (!formDetails.mode) {
      setFieldError("mode", "Choose either mentor or mentee mode");
    }

    if (!formDetails.dob) {
      setFieldError("dob", "Select your Date of Birth");
    }

    if (!formDetails.subjectSelection.length) {
      setFieldError("subjectSelection", "Select your subjects you can mentor");
    }

    if (!formDetails.partnership) {
      setFieldError("partnership", "Select your partnership");
    }

    if (!formDetails.firstName) {
      setFieldError("firstName", "Please enter your first name");
    }

    if (!formDetails.lastName) {
      setFieldError("lastName", "Please enter your last name");
    }

    // submit form data

    // router.push("profile");
  };

  return (
    <View className="flex flex-col  items-center py-4 w-full">
      <Text className="text-white m-5 text-base font-semibold ">
        Personal details
      </Text>
      <Names
        error={errorObj}
        setErrorObj={setErrorObj}
        setFormDetails={setFormDetails}
        formDetails={formDetails}
      />
      <BorderUnderline />

      <SelectUserMode
        error={errorObj.mode}
        setErrorObj={setErrorObj}
        setFormDetails={setFormDetails}
      />

      {formDetails?.mode === "mentor" && (
        <>
          <Text className="text-white mt-5 text-base font-semibold ">
            You selected to volunteer to be a mentor
          </Text>
          <BorderUnderline />
          <DOBPicker error={errorObj} setFormDetails={setFormDetails} />
          <BorderUnderline />
          <SubjectSelectionMentor
            setErrorObj={setErrorObj}
            error={errorObj.subjectSelection}
            formDetails={formDetails}
            setFormDetails={setFormDetails}
          />
        </>
      )}

      {formDetails?.mode === "mentee" && (
        <>
          <Text className="text-white mt-5 text-base font-semibold ">
            You selected to get help and be a mentee
          </Text>
          <BorderUnderline />
          <DOBPicker error={errorObj} setFormDetails={setFormDetails} />
        </>
      )}

      <BorderUnderline />
      <PartnersipSelection
        setErrorObj={setErrorObj}
        error={errorObj.partnership}
        formDetails={formDetails}
        setFormDetails={setFormDetails}
      />
      <BorderUnderline />

      <CustomButton
        isLoading={isLoading}
        handlePress={() => {
          handleSubmit();
        }}
        title="Submit"
      />
    </View>
  );
};

export default UserDataForm;
