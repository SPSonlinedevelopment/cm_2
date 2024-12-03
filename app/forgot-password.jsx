import {
  View,
  Text,
  Image,
  Platform,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import FormField, {
  initialFormState,
} from "./components/Auth/FormField/FormField";
import { validateInputs } from "@/utils/validateInputs/validateInputs";
import CustomButton from "./components/Buttons/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomKeyboardView from "./components/CustomKeyboardView";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const emailRef = useRef(undefined);
  const [errors, setErrors] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const validateParams = [{ type: "email", ref: emailRef }];

  const navigation = useNavigation();
  let showPasswordInput;

  if (!resetEmailSent) {
    showPasswordInput = (
      <View className="flex flex-col items-center">
        <FormField
          setAlertMessage={setAlertMessage}
          type="email"
          icon={
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="purple"
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
    );
  }

  if (resetEmailSent) {
    showPasswordInput = (
      <View className="w-full flex flex-row items-center justify-center">
        <Text className="text-orange-400  text-2xl font-medium mb-8">
          Success! Check your email!
        </Text>
      </View>
    );
  }

  const handleClick = () => {
    if (validateInputs(validateParams, setErrors)) {
      setLoading(true);
      const auth = getAuth();

      if (emailRef.current) {
        sendPasswordResetEmail(auth, emailRef.current)
          .then(() => {
            setLoading(false);
            setResetEmailSent(true);
          })
          .catch((error) => {
            showPasswordInput = (
              <View>
                <Text> Error sending password reset email </Text>
              </View>
            );
            // Handle errors, such as invalid email address.
            console.error("Error sending password reset email:", error);
          });
      }
    }
  };

  const content = (
    <SafeAreaView className=" pt-3 w-full h-full flex flex-col bg-purple   items-center justify-start">
      <View className="bg-purple h-full flex-col justify-start  items-center">
        <View className="mt-20"></View>

        <Image
          className="   rounded-full h-[210px] w-[210px]"
          source={require("../assets/images/CMlogo.png")}
        />

        <View className="px-7 flex flex-col   ">
          <Text className="text-neutral-300   text-center text-xl  leading-1">
            Forgotten Password
          </Text>

          <Text className="text-neutral-300   text-center text-base p-8 leading-1">
            We'll send you instructions on how to reset your password by email
          </Text>

          {showPasswordInput}
          <View className="flex-col items-center justify-center">
            <TouchableOpacity onPress={() => navigation.navigate("sign-in")}>
              <Text className="text-orange-400  text-base font-medium">
                Return to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  return Platform.OS === "web" ? (
    content
  ) : (
    <CustomKeyboardView>{content}</CustomKeyboardView>
  );
};

export default ForgotPassword;
