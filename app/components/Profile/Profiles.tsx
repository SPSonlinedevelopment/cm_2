import { View, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import BorderUnderline from "./BorderUnderline";
import Leaderboard from "./MenteeProfile/Leaderboard/Leaderboard";
import Compliments from "./Compliments/Compliments";
import Achievements from "./Achievements/Achievements";
import MenteeStatistics from "./MenteeProfile/MenteeStatistics";
import CustomKeyboardView from "../CustomKeyboardView";
import GradientNavigation from "./MenteeProfile/GradientNaviation/GradientNavigation";
import Others from "./Others/Others";
import { useAuth } from "@/app/context/authContext";
import Loading from "../Loading";
import MentorStatistics from "./MentorProfile/MentorStatistics";

const Profiles = () => {
  const { userDetails, getUpdatedAuthObj, user } = useAuth();
  console.log("🚀 ~ Profiles ~ userDetails:", userDetails);

  const menteeMode = (
    <CustomKeyboardView>
      <SafeAreaView className="h=full w-full  bg-white flex flex-col ">
        <View className="h=full w-full flex flex-col items-center">
          <Header />
          <BorderUnderline />
          <MenteeStatistics />
          <BorderUnderline />
          <Leaderboard />
          <BorderUnderline />
          <Compliments />
          <BorderUnderline />
          <Achievements />
          <BorderUnderline />
          <Others />
          <Image
            className="   rounded-full h-[150px] w-[150px] mb-4"
            source={require("../../../assets/images/CMlogo.png")}
          />
        </View>
      </SafeAreaView>
    </CustomKeyboardView>
  );

  const mentorMode = (
    <CustomKeyboardView>
      <SafeAreaView className="h=full w-full  bg-white flex flex-col ">
        <View className="h=full w-full flex flex-col items-center">
          <Header />
          <BorderUnderline />
          <MentorStatistics />
          <BorderUnderline />
          <Compliments />
          <BorderUnderline />
          <Achievements />
          <Others />
          <Image
            className="   rounded-full h-[150px] w-[150px] mb-4"
            source={require("../../../assets/images/CMlogo.png")}
          />
        </View>
      </SafeAreaView>
    </CustomKeyboardView>
  );

  return (
    <View className="h-full w-full">
      {userDetails?.mode === "mentee" && <GradientNavigation />}
      {userDetails?.mode === "mentee" ? menteeMode : mentorMode}
    </View>
  );
};

export default Profiles;
