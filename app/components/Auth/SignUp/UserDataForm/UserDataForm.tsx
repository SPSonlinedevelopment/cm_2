import { View, TextInput, Text, Button, Image, Alert } from "react-native";
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
import { useAuth } from "@/app/context/authContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../../firebaseConfig";
import YearGroupSelection from "./YearGroupSelection";

export interface FormDetailProps {
  firstName: string;
  lastName: string;
  mode: string;
  dob: Date;
  subjectSelection: string[];
  partnership: string;
  year: string;
}

interface ErrorObject {
  dob: ErrorProperty;
  mode: ErrorProperty;
  subjectSelection: ErrorProperty;
  partnership: ErrorProperty;
  firstName: ErrorProperty;
  lastName: ErrorProperty;
  year: ErrorProperty;
}

interface ErrorProperty {
  isError: boolean;
  message: string;
}

const UserDataForm = () => {
  const { addUserDetailsOnSignup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(true);

  const [errorObj, setErrorObj] = useState<ErrorObject>({
    dob: { isError: false, message: " " },
    mode: { isError: false, message: " " },
    subjectSelection: { isError: false, message: " " },
    partnership: { isError: false, message: " " },
    firstName: { isError: false, message: " " },
    lastName: { isError: false, message: " " },
    year: { isError: false, message: " " },
  });

  const [formDetails, setFormDetails] = useState<FormDetailProps>({
    mode: "",
    dob: new Date(),
    subjectSelection: [],
    partnership: "",
    firstName: "",
    lastName: "",
    year: "",
  });

  const formValidation = async () => {
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

    if (!formDetails.year) {
      setFieldError("year", "Choose which year you are currentky in");
    }

    if (formDetails.mode === "mentor" && !formDetails.subjectSelection.length) {
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
    const Errors = Object.values(errorObj).some(
      (error) => error.isError === true
    );

    setHasErrors(Errors);
    setIsLoading(false);
  };

  const submitform = async () => {
    const result = await addUserDetailsOnSignup(formDetails);
    console.log("result", result);
    if (result.success) {
      setIsLoading(false);

      router.push("profile");
    } else if (!result.success) {
      setIsLoading(false);
      router.push("sign-in");
      Alert.alert("error");
    }
    return result;
  };

  return (
    <View className="flex flex-col  items-center py-4 w-full">
      <Text className="text-white m-5 text-base font-semibold ">
        Please fill in your details to get started
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

      <YearGroupSelection
        error={errorObj.year}
        setErrorObj={setErrorObj}
        setFormDetails={setFormDetails}
        formDetails={formDetails}
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
          setIsLoading(true);

          formValidation();

          if (!hasErrors) {
            submitform();
          }
        }}
        title="Submit"
      />
    </View>
  );
};

export default UserDataForm;
