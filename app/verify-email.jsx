import { View, Text, SafeAreaView, Image } from "react-native";
import React, { Children, useEffect, useState } from "react";
import CustomKeyboardView from "./components/CustomKeyboardView";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAuth } from "./context/authContext";
import CustomButton from "./components/Buttons/CustomButton";

import { useNavigation } from "@react-navigation/native";

const VerifyEmail = () => {
  const { user } = useAuth();

  const navigation = useNavigation();

  const handlepress = async () => {
    navigation.navigate("user-details");
  };

  return (
    <CustomKeyboardView>
      <SafeAreaView className="flex-1 w-full flex flex-col bg-purple border  items-center justify-start">
        <View className="flex flex-col  justify-between  items-center  w-full">
          <Image
            className="   rounded-full h-[221px] w-[221px]"
            source={require("../assets/images/CMlogo.png")}
          />

          <View className="flex flex-col  justify-between  items-center  w-full">
            <Text className="text-white text-2xl mt-3 text-center">
              Verify your email
            </Text>
            <Text className="text-neutral-300  text-center text-xl p-5 leading-1">
              We have sent a verifyication link to {user?.email}
            </Text>
            <View>
              <CustomButton
                handlePress={() => {
                  handlepress();
                }}
                title="I'm verified! Continue on boarding"
              />
            </View>

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
