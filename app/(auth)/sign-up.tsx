import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import CustomButton from "../components/CustomButton/CustomButton";

const SignIn = () => {
  return (
    <View className="bg-purple h-full flex flex-col items-center ">
      <View className="flex flex-row  justify-between  w-full">
        <Link
          className="p-6 text-neutral-500 font-pmedium text-lg"
          href={"index"}
        >
          Go back
        </Link>
        <Link
          className="p-6  font-pextrabold text-orange text-lg"
          href={"sign-in"}
        >
          Sign In
        </Link>
      </View>
      <View className="h-[250px] w-[250px]  border-none rounded-full bg-orange"></View>

      <View className="w-full  flex-col justify-center items-center">
        <Text className="text-white text-2xl mt-6">Sign up to get started</Text>
        <Text className="text-neutral-400  text-center text-lg p-4">
          To sign up, enter your school email and choose a new password
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
