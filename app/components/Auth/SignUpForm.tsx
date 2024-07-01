import { View, Text } from "react-native";
import React, { Children, useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import CustomButton from "../CustomButton/CustomButton";
import FormField from "../FormField/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Octicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { validateInputs } from "./validateInputs";
import { auth } from "@/firebaseConfig";
import { useAuth } from "@/context/authContext";

const initialState = {
  name: { isError: false, message: "" },
  email: { isError: false, message: "" },
  password: { isError: false, message: "" },
};

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialState);
  const { createNewUser } = useAuth();

  const nameRef = useRef(undefined);
  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const validateParams = [
    { type: "name", ref: nameRef },
    { type: "email", ref: emailRef },
    { type: "password", ref: passwordRef },
  ];

  let message;
  const handleClick = async () => {
    if (validateInputs(validateParams, setErrors)) {
      setLoading(true);
    }

    const result = await createNewUser(
      nameRef.current,
      emailRef.current,
      passwordRef.current
    );

    setLoading(false);
    if (!result.success) {
      message = result.message;
    }
  };

  return (
    <>
      <FormField
        refName={nameRef}
        type="name"
        icon={<Feather name="user" size={hp(2.7)} color="white" />}
        placeholderText="First Name"
        error={errors}
        seterror={setErrors}
        editable={loading}
      ></FormField>

      <FormField
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
        refName={passwordRef}
        type="password"
        icon={<AntDesign name="lock" size={24} color="white" />}
        placeholderText="Password"
        error={errors}
        seterror={setErrors}
        editable={loading}
      ></FormField>
      {message}
      <CustomButton
        isLoading={loading}
        containerStyles=""
        handlePress={() => {
          handleClick();
        }}
        title="Sign Up"
      ></CustomButton>
    </>
  );
};

export default SignUpForm;
