import { View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import BorderUnderline from "./BorderUnderline";
import Achievements from "./Achievements/Achievements";
import MenteeStatistics from "./MenteeProfile/MenteeStatistics";
import CustomKeyboardView from "../CustomKeyboardView";
import GradientNavigation from "./MenteeProfile/GradientNaviation/GradientNavigation";
import Others from "./Others/Others";
import { useAuth } from "@/app/context/authContext";
import MentorStatistics from "./MentorProfile/MentorStatistics";
import ComplementsProfile from "./ComplementsProfile";
import MentorComments from "./MentorProfile/MentorComments";
import IconButton from "../Buttons/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const Profiles = () => {
  const { userDetails } = useAuth();

  const mode = userDetails?.mode;

  const navigation = useNavigation();
  return (
    <View className="h-full w-full">
      <GradientNavigation />
      <CustomKeyboardView>
        <SafeAreaView className="h=full w-full  bg-white flex flex-col ">
          <IconButton
            icon={<Entypo name="edit" size={24} color="black" />}
            containerStyles=" bg-white shadow w-[40px] h-[40px] absolute right-5 top-10"
            handlePress={() => {
              navigation.navigate("edit-profile");
            }}
          ></IconButton>
          <View className="h=full w-full flex flex-col items-center">
            <Header />
            <BorderUnderline />

            {mode === "mentor" ? <MentorStatistics /> : <MenteeStatistics />}

            <BorderUnderline />
            <ComplementsProfile />

            {mode === "mentor" ? <MentorComments /> : <></>}

            <BorderUnderline />

            {mode === "mentor" ? <Achievements /> : <></>}

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
