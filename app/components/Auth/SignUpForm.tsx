import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import * as EmailValidator from "email-validator";

const initialState = {
  name: { isError: false, message: "" },
  email: { isError: false, message: "" },
  password: { isError: false, message: "" },
};

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialState);

  const nameRef = useRef(undefined);
  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const validateInputs = () => {
    let newErrors = {
      name: { isError: false, message: "" },
      email: { isError: false, message: "" },
      password: { isError: false, message: "" },
    };

    if (!nameRef.current) {
      newErrors.name = {
        isError: true,
        message: "Hey! This name field cannot be empty",
      };
    }

    if (!passwordRef.current) {
      newErrors.password = {
        isError: true,
        message: "Hey! This password field cannot be empty",
      };
    }

    if (!emailRef.current) {
      newErrors.email = {
        isError: true,
        message: "Hey! This email field cannot be empty",
      };
    } else if (!EmailValidator.validate(emailRef.current)) {
      newErrors.email = {
        isError: true,
        message: "Hey! Incorrect email type",
      };
    }

    setErrors(newErrors);

    const { name, email, password } = newErrors;

    return [name, email, password].every((error) => !error.isError);
  };

  const handleClick = () => {
    if (validateInputs()) {
      setLoading(true);
    }
  };

  return (
    <>
      <View>
        <FormField
          refName={nameRef}
          type="name"
          icon={<Feather name="user" size={hp(2.7)} color="white" />}
          placeholderText="First Name"
          error={errors}
          seterror={setErrors}
          editable={loading}
        ></FormField>
      </View>
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
