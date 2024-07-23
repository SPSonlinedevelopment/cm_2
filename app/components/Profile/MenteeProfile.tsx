import { View, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import BorderUnderline from "./BorderUnderline";
import Leaderboard from "./MentorProfile/Leaderboard/Leaderboard";
import Compliments from "./MentorProfile/Compliments/Compliments";
import Achievements from "./MentorProfile/Achievements/Achievements";
import Statistics from "./Statistics";
import CustomKeyboardView from "../CustomKeyboardView";
import GradientNavigation from "./MentorProfile/GradientNaviation/GradientNavigation";
import Others from "./Others/Others";
import { useAuth } from "@/app/context/authContext";
import Loading from "../Loading";

const MenteeProfile = () => {
  const { user } = useAuth();

  const menteeMode = (
    <CustomKeyboardView>
      <SafeAreaView className="h=full w-full  bg-white flex flex-col ">
        <View className="h=full w-full flex flex-col items-center">
          <Text>mode {user?.mode}</Text>
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
          <Text>mode {user?.mode}</Text>
          <Header />
          <View>
            <Text className="text-4xl">ahjdask</Text>
          </View>
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
      <GradientNavigation />

      {!user.mode === "mentor" || !user.mode === "mentee" ? (
        <View className="flex-1 justify-center items-center">
          <Loading size={134} />
        </View>
      ) : user.mode === "mentee" ? (
        menteeMode
      ) : (
        mentorMode
      )}
    </View>
  );
};

export default MenteeProfile;
