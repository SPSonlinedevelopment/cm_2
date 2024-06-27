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

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const nameRef = useRef(undefined);
  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const handleClick = () => {
    setPasswordError(false);
    setNameError(false);
    setEmailError(false);

    if (!nameRef.current) {
      setNameError(true);
    }

    if (!passwordRef.current) {
      setPasswordError(true);
    }

    if (!emailRef.current) {
      setEmailError(true);
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
          error={nameError}
          seterror={setNameError}
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
        title="Sign Up"
      ></CustomButton>
    </>
  );
};

export default SignUpForm;
