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
import { validateInputs } from "./validateInputs";
import { initialFormState } from "../FormField/FormField";
import { useAuth } from "@/context/authContext";
import { auth } from "@/firebaseConfig";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialFormState);
  const { createNewUser } = useAuth();

  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const validateParams = [
    { type: "email", ref: emailRef },
    { type: "password", ref: passwordRef },
  ];

  const handleClick = async () => {
    if (validateInputs(validateParams, setErrors)) {
      setLoading(true);
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
      <View>
        <View className="  border-white  flex flex-row justify-end w-[80%]">
          <Link href={"forgot-password"} className=" text-orange-400 text-xs  ">
            Forgot password?{" "}
          </Link>
        </View>
      </View>
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
