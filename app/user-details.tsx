import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { Link } from "expo-router";
import CustomButton from "./components/Buttons/CustomButton";
import FormField from "./components/FormField/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Octicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";

import CustomKeyboardView from "./components/CustomKeyboardView";

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

        <View className="w-[80%]   flex-col justify-center items-center">
          <Text className="text-white text-2xl mt-3">Your Details</Text>
          <Text className="text-neutral-300  text-center text-xl p-5 leading-1">
            Please fill in the form below and submit
          </Text>
        </View>
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default UserDetails;
