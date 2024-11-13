import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { Link } from "expo-router";
import CustomButton from "./components/Buttons/CustomButton";
import FormField from "./components/Auth/FormField/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Octicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import CustomKeyboardView from "./components/CustomKeyboardView";
import UserDataForm from "./components/Auth/SignUp/UserDataForm/UserDataForm";
import { useAuth } from "./context/authContext";

const UserDetails = () => {
  return (
    <CustomKeyboardView>
      <SafeAreaView className="flex-1 w-full flex flex-col bg-purple border  items-center justify-start">
        <View className="flex flex-row  justify-between  items-center  w-full">
          <Link
            className="ml-6 text-neutral-300 font-pmedium text-lg"
            href={"/"}
            push={true}
          >
            Go back
          </Link>
          <Link
            className="mr-6 text-neutral-300 font-pmedium text-lg"
            href={"sign-in"}
          >
            Sign In
          </Link>
        </View>
        <Image
          className="   rounded-full h-[210px] w-[210px]"
          source={require("../assets/images/CMlogo.png")}
        />
        <View className="w-[80%]   flex-col justify-center items-center">
          <Text className="text-white text-2xl mt-3">Welcome </Text>
        </View>
        <UserDataForm />
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default UserDetails;
