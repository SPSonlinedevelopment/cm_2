import { View, Image, Platform, Text, Dimensions } from "react-native";
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
import MentorComments from "./MentorProfile/comments/MentorComments";
import IconButton from "../Buttons/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Navigation from "../Navigation/Navigation";
import NavHeaderBar from "../Navigation/NavHeaderBar";
import { MenuButton } from "@/app";
import { ScrollView } from "react-native-gesture-handler";

const Profiles = () => {
  const { userDetails } = useAuth();

  const mode = userDetails?.mode;

  const navigation = useNavigation();

  const { width } = Dimensions.get("window");

  const universalContent = (
    <View
      className={`w-full flex items-center justify-center rounded-2xl bg-neutral-50  ${
        Platform.OS === "web" ? "px-[10px]" : ""
      }`}
    >
      <View
        className={`h-full  w-full rounded-xl  max-w-[1000px]  flex-1 flex-col  items-center
    `}
      >
        <Header />
        <BorderUnderline />

        {mode === "mentor" ? <MentorStatistics /> : <MenteeStatistics />}

        <ComplementsProfile />

        {mode === "mentor" ? <MentorComments /> : <></>}

        {mode === "mentor" ? <Achievements /> : <></>}

        <Others />
        <Image
          className="   rounded-full h-[150px] w-[150px] mb-4"
          source={require("../../../assets/images/CMlogo.png")}
        />
      </View>
    </View>
  );

  const webContent = <ScrollView> {universalContent} </ScrollView>;

  const mobileContent = (
    <View className="bg-neutral-50 flex flex-col justify-center">
      <CustomKeyboardView>
        <SafeAreaView style={{ margin: 10 }}>
          <StatusBar style="dark" />

          {universalContent}
        </SafeAreaView>
      </CustomKeyboardView>
    </View>
  );

  return (
    <View className="bg-neutral-50 h-full">
      {width > 500 ? <NavHeaderBar /> : <GradientNavigation />}
      {Platform.OS === "web" ? webContent : mobileContent}
    </View>
  );
};

export default Profiles;

const EditProfile = () => {
  return (
    <IconButton
      icon={<Entypo name="edit" size={24} color="black" />}
      containerStyles=" bg-white shadow w-[40px] h-[40px] absolute right-5 top-10"
      handlePress={() => {
        navigation.navigate("edit-profile");
      }}
    />
  );
};
