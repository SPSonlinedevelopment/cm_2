import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import FormField, { initialFormState } from "../components/FormField/FormField";
import { validateInputs } from "../components/Auth/validateInputs/validateInputs";
import CustomButton from "../components/Buttons/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomKeyboardView from "../components/CustomKeyboardView";

const ForgotPassword = () => {
  const emailRef = useRef(undefined);
  const [errors, setErrors] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const validateParams = [{ type: "email", ref: emailRef }];

  const handleClick = () => {
    if (validateInputs(validateParams, setErrors)) {
      setLoading(true);
    }
  };

  return (
    <CustomKeyboardView>
      <View className="bg-purple h-full flex-col justify-around items-center">
        <View className="h-[220px] w-[220px]  border-none rounded-full bg-orange"></View>

        <View className="px-7 flex flex-col   ">
          <Text className="text-neutral-300   text-center text-base p-8 leading-1">
            We'll send you instructions on how to reset your password by email
          </Text>

          <FormField
            setAlertMessage={setAlertMessage}
            type="email"
            icon={
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="white"
              />
            }
            refName={emailRef}
            seterror={setErrors}
            error={errors}
            placeholderText="Email"
            editable={loading}
          ></FormField>

          <CustomButton
            isLoading={loading}
            handlePress={() => {
              handleClick();
            }}
            title="Submit"
          />
        </View>
        <Link className="text-orange-400 font-psemibold" href={"sign-in"}>
          Return to login
        </Link>
      </View>
    </CustomKeyboardView>
  );
};

export default ForgotPassword;
