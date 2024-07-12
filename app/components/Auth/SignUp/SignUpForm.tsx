import { View, Text } from "react-native";
import React, { Children, useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../Buttons/CustomButton";
import FormField from "../../FormField/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Octicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { validateInputs } from "../validateInputs/validateInputs";
import { auth } from "../../../../firebaseConfig";
import { useAuth } from "../../../context/authContext";
import { initialFormState } from "../initalFormState";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialFormState);
  const [alertMessage, setAlertMessage] = useState("");
  const { createNewUser } = useAuth();

  const firstName = useRef(undefined);
  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const validateParams = [
    { type: "firstName", ref: firstName },
    { type: "email", ref: emailRef },
    { type: "password", ref: passwordRef },
  ];

  const handleClick = async () => {
    if (validateInputs(validateParams, setErrors)) {
      setLoading(true);

      const result = await createNewUser(
        firstName.current,
        emailRef.current,
        passwordRef.current
      );

      if (result.success) {
        setLoading(false);

        router.push("user-details");
        // display user Profile setup
      } else setAlertMessage(result.message);
      setLoading(false);
    }
  };

  return (
    <>
      <FormField
        setAlertMessage={setAlertMessage}
        refName={emailRef}
        type="email"
        icon={
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="white"
          />
        }
        placeholderText="Email"
        error={errors}
        seterror={setErrors}
        editable={loading}
      ></FormField>
      <FormField
        setAlertMessage={setAlertMessage}
        refName={passwordRef}
        type="password"
        icon={<AntDesign name="lock" size={24} color="white" />}
        placeholderText="Password"
        error={errors}
        seterror={setErrors}
        editable={loading}
      ></FormField>
      <Text className="text-white text-center w-[80%]"> {alertMessage}</Text>
      <CustomButton
        isLoading={loading}
        containerStyles="my-0"
        handlePress={() => {
          handleClick();
        }}
        title="Sign Up"
      ></CustomButton>
    </>
  );
};

export default SignUpForm;
