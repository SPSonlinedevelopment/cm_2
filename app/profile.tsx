import { View, Text, Button } from "react-native";
import React from "react";
import CustomButton from "./components/Buttons/CustomButton";
import { useAuth } from "./context/authContext";
import { router } from "expo-router";
import Header from "./components/Profile/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "./components/Profile/Avatar";
import BorderUnderline from "./components/Profile/BorderUnderline";
import Leaderboard from "./components/Profile/Leaderboard/Leaderboard";
import Compliments from "./components/Profile/Compliments/Compliments";
import Achievements from "./components/Profile/Achievements/Achievements";
import Others from "./components/Profile/Others/Others";
import Entypo from "@expo/vector-icons/Entypo";
import Statistics from "./components/Profile/Statistics";

import CustomKeyboardView from "./components/CustomKeyboardView";
import GradientNavigation from "./components/Profile/GradientNaviation/GradientNavigation";

const profile = () => {
  return (
    <CustomKeyboardView>
      <SafeAreaView className="h=full w-full  bg-white flex flex-col ">
        <View className="h=full w-full flex flex-col items-center">
          <GradientNavigation />
          <Header />
          <BorderUnderline />
          <Statistics />
          <BorderUnderline />
          <Leaderboard />
          <BorderUnderline />
          <Compliments />
          <BorderUnderline />
          <Achievements />
          <BorderUnderline />
          <Others />
        </View>
      </SafeAreaView>
    </CustomKeyboardView>
  );
};

export default profile;
