import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../Buttons/CustomButton";
import FormField from "../../FormField/FormField";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { validateInputs } from "../validateInputs/validateInputs";
import { initialFormState } from "../../FormField/FormField";
import { useAuth } from "@/app/context/authContext";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialFormState);
  const [alertMessage, setAlertMessage] = useState("");
  const { user, signIn, } = useAuth();

  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const validateParams = [
    { type: "email", ref: emailRef },
    { type: "password", ref: passwordRef },
  ];

  const handleClick = async () => {
    if (validateInputs(validateParams, setErrors)) {
      try {
        setLoading(true);
        const result = await signIn(emailRef.current, passwordRef.current);
        if (result.success) {
          router.push("profile");
        } else {
          setAlertMessage(result.message);
        }
      } catch (error) {
        console.error("An error occurred during sign-in:", error);
        setAlertMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
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
      <View>
        <View className="  border-white  flex flex-row justify-end w-[80%]">
          <Link
            href={"forgot-password"}
            className=" text-orange-400  mt-2 text-sm  "
          >
            Forgot password?{" "}
          </Link>
        </View>
      </View>

      <Text>{user?.uid}</Text>

      <Text>{user?.firstName}</Text>

      {alertMessage && (
        <Text className="text-white font-pextrabold  mt-2 text-center w-[80%]">
          {alertMessage}
        </Text>
      )}

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
