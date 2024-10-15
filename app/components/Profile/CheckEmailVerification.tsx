import { View, Text, Button, Alert } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import CustomButton from "../Buttons/CustomButton";

const CheckEmailVerification = () => {
  const { verifyEmail, user } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(user?.emailVerified);
  const [isLoading, setIsLoading] = useState(false);

  const [buttonTitle, setButtonTitle] = useState("Resend Verification Email");

  const resendVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const result = await verifyEmail();

      if (result.success) {
        setButtonTitle("Success! Check your email!");
        setIsLoading(false);
        setTimeout(() => {
          setButtonTitle("Resend Verification Email");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setButtonTitle("Error sending email!");
    }
  };

  return (
    <View className="w-full shadow-sm">
      {!isEmailVerified && (
        <View className=" w-full shadow-sm  bg-white justify-center rounded-2xl p-2 flex items-center">
          <Text className="text-xs text-center">
            Email not verified, please check email or click button below to
            resend
          </Text>
          <CustomButton
            isLoading={isLoading}
            textStyles="text-sm"
            handlePress={() => {
              resendVerifyEmail();
            }}
            title={buttonTitle}
          ></CustomButton>
        </View>
      )}
    </View>
  );
};

export default CheckEmailVerification;
