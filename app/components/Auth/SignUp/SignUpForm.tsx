import { View, Text } from "react-native";
import React, { Children, useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../Buttons/CustomButton";
import FormField from "../FormField/FormField";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { validateInputs } from "../validateInputs/validateInputs";

import { useAuth } from "../../../context/authContext";

const initialState = {
  name: { isError: false, message: "" },
  email: { isError: false, message: "" },
  password: { isError: false, message: "" },
};

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialState);
  const [alertMessage, setAlertMessage] = useState("");
  const { createNewUser, setUser, verifyEmail } = useAuth();

  const nameRef = useRef(undefined);
  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const validateParams = [
    // { type: "name", ref: nameRef },
    { type: "email", ref: emailRef },
    { type: "password", ref: passwordRef },
  ];

  const handleClick = async () => {
    if (validateInputs(validateParams, setErrors)) {
      setLoading(true);

      const result = await createNewUser(emailRef.current, passwordRef.current);

      if (result.success) {
        setLoading(false);
        setUser(result.data);

        try {
          const sendVerifyEmail = await verifyEmail();

          if (sendVerifyEmail) {
            console.log("sendVerifyEmail", sendVerifyEmail);
          }
        } catch (error) {
          console.log(error);
        }

        router.push("verify-email");
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
