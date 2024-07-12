import { View, Image } from "react-native";
import React from "react";
import Header from "./components/Profile/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import BorderUnderline from "./components/Profile/BorderUnderline";
import Leaderboard from "./components/Profile/Leaderboard/Leaderboard";
import Compliments from "./components/Profile/Compliments/Compliments";
import Achievements from "./components/Profile/Achievements/Achievements";
import Others from "./components/Profile/Others/Others";
import Statistics from "./components/Profile/Statistics";
import CustomKeyboardView from "./components/CustomKeyboardView";
import GradientNavigation from "./components/Profile/GradientNaviation/GradientNavigation";
import UserDetails from "./user-details";

const profile = () => {
  return (
    <View>
      <GradientNavigation />
      <CustomKeyboardView>
        <SafeAreaView className="h=full w-full  bg-white flex flex-col ">
          <View className="h=full w-full flex flex-col items-center">
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
              source={require("../assets/images/CMlogo.png")}
            />
          </View>
        </SafeAreaView>
      </CustomKeyboardView>
    </View>
  );
};

export default profile;
