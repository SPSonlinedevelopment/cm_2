import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import CustomButton from "../../Buttons/CustomButton";
import FormField from "../FormField/FormField";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { validateInputs } from "@/utils/validateInputs/validateInputs";
import { initialFormState } from "../FormField/FormField";
import { useAuth } from "@/app/context/authContext";
import { useNavigation } from "@react-navigation/native";

const SignInForm = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialFormState);
  const [alertMessage, setAlertMessage] = useState("");
  const { signIn } = useAuth();

  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const validateParams = [
    { type: "email", ref: emailRef },
    { type: "password", ref: passwordRef },
  ];

  const handleSignIn = async () => {
    if (validateInputs(validateParams, setErrors)) {
      try {
        setLoading(true);
        const result = await signIn(emailRef.current, passwordRef.current);
        if (result.success) {
          navigation.navigate("profile");
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
    <View className="flex flex-col justify-center items-center">
      <FormField
        setAlertMessage={setAlertMessage}
        refName={emailRef}
        type="email"
        icon={
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="purple"
          />
        }
        placeholderText="Email"
        error={errors}
        seterror={setErrors}
        editable={loading}
      />
      <FormField
        setAlertMessage={setAlertMessage}
        refName={passwordRef}
        type="password"
        icon={<AntDesign name="lock" size={24} color="purple" />}
        placeholderText="Password"
        error={errors}
        seterror={setErrors}
        editable={loading}
      />

      {alertMessage && (
        <View className="w-full flex justify-center items-center">
          <Text className="text-red-600  mt-2 text-center w-[80%]">
            {alertMessage}
          </Text>
        </View>
      )}

      <CustomButton
        isLoading={loading}
        containerStyles=""
        handlePress={() => {
          handleSignIn();
        }}
        title="Sign In"
      />

      <TouchableOpacity onPress={() => navigation.navigate("forgot-password")}>
        <Text className="text-orange-400  text-base font-medium">
          Forgot password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInForm;
