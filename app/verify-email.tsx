import { View, Text, SafeAreaView, Image } from "react-native";
import React, { Children, useEffect, useState } from "react";
import CustomKeyboardView from "./components/CustomKeyboardView";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from "./context/authContext";
import CustomButton from "./components/Buttons/CustomButton";

const VerifyEmail = () => {
  const { user, getUpdatedAuthObj } = useAuth();

  const [emailVerified, setEmailVerified] = useState(false);

  //   useEffect(() => {}, [user.emailVerified]);

  const handlepress = async () => {
    try {
      console.log("get auth");
      const result = await getUpdatedAuthObj();
      setEmailVerified(result.emailVerified);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("emailVerified", user?.emailVerified);

  return (
    <CustomKeyboardView>
      <SafeAreaView className="flex-1 w-full flex flex-col bg-purple border  items-center justify-start">
        <View className="flex flex-col  justify-between  items-center  w-full">
          <Image
            className="   rounded-full h-[221px] w-[221px]"
            source={require("../assets/images/CMlogo.png")}
          />

          <View className="w-[80%]   flex-col justify-center items-center">
            {!emailVerified ? (
              <View>
                <Text className="text-white text-2xl mt-3">
                  Verify your email
                </Text>
                <Text className="text-neutral-300  text-center text-xl p-5 leading-1">
                  We have sent a verifyication link to {user.email}
                </Text>
                <View>
                  <Text> Success! Email Verified</Text>

                  <CustomButton
                    handlePress={() => {
                      handlepress();
                    }}
                    title="I have verified my email"
                  />
                </View>
              </View>
            ) : (
              <View>
                Success! Email Verified
                <CustomButton handlePress={() => {}} title="Proceeed" />
              </View>
            )}

            <View className="flex-col items-center justify-center">
              <Link
                className="text-orange-400  text-base font-psemibold"
                href={"sign-up"}
              >
                Return to login
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default VerifyEmail;
