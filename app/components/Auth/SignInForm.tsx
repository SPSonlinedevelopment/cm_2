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

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const handleClick = () => {
    setPasswordError(false);
    setEmailError(false);

    if (!passwordRef.current) {
      setPasswordError(true);
    }

    if (!emailRef.current) {
      setEmailError(true);
    }
  };

  return (
    <>
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
        error={emailError}
        seterror={setEmailError}
      ></FormField>
      <FormField
        refName={passwordRef}
        type="password"
        icon={<AntDesign name="lock" size={24} color="white" />}
        placeholderText="Password"
        error={passwordError}
        seterror={setPasswordError}
      ></FormField>
      <CustomButton
        isLoading={loading}
        containerStyles=""
        handlePress={() => {
          handleClick();
        }}
        title="Sign In"
      ></CustomButton>
    </>
  );
};

export default SignInForm;
