import { View } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import IconButton from "../../Buttons/IconButton";
import InputFieldContainer from "./InputField";

const EmailContainer: React.FC<{
  setFormField: React.SetStateAction<any>;
}> = ({ setFormField }) => {
  const [loading, setIsloading] = useState(false);
  const [emailVerificationButtonText, setEmailVerificationButtonText] =
    useState("Resend Verification Email");

  const { verifyEmail, user } = useAuth();

  const handleResendVerification = async () => {
    setIsloading(true);
    try {
      const result = await verifyEmail();
      if (result.success) {
        setEmailVerificationButtonText("Email Sent! Check your email.");
      }
    } catch (error) {
      console.log(error);
    }
    setIsloading(false);
  };

  return (
    <View className="w-full">
      <InputFieldContainer
        setFormField={setFormField}
        currentVal={user?.email}
        field="email"
      />
      {!user?.emailVerified && (
        <IconButton
          textStyles="text-orange"
          isLoading={loading}
          containerStyles="justify-center items-center bg-white rounded-full"
          title={emailVerificationButtonText}
          handlePress={handleResendVerification}
        />
      )}
    </View>
  );
};

export default EmailContainer;
