import { View, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import BorderUnderline from "./BorderUnderline";
import Leaderboard from "./MenteeProfile/Leaderboard/Leaderboard";

import Achievements from "./Achievements/Achievements";
import MenteeStatistics from "./MenteeProfile/MenteeStatistics";
import CustomKeyboardView from "../CustomKeyboardView";
import GradientNavigation from "./MenteeProfile/GradientNaviation/GradientNavigation";
import Others from "./Others/Others";
import { useAuth } from "@/app/context/authContext";
import Loading from "../Loading/LoadingSpinner";
import MentorStatistics from "./MentorProfile/MentorStatistics";
import ComplementsProfile from "./ComplementsProfile";
import MentorComments from "../.././components/Profile/MentorProfile/MentorComments";

const Profiles = () => {
  const { userDetails, getUpdatedAuthObj, user } = useAuth();

  const mode = userDetails.mode;

  return (
    <View className="h-full w-full">
      <GradientNavigation />
      <CustomKeyboardView>
        <SafeAreaView className="h=full w-full  bg-white flex flex-col ">
          <View className="h=full w-full flex flex-col items-center">
            <Header />
            <BorderUnderline />

            {mode === "mentor" ? <MentorStatistics /> : <MenteeStatistics />}

            <BorderUnderline />
            <ComplementsProfile />

            {mode === "mentor" ? <MentorComments /> : <></>}

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
    </View>
  );
};

export default Profiles;
