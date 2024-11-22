import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useAuth } from "@/app/context/authContext";
import { ScrollView } from "react-native-gesture-handler";
import AchievementsModal from "./AchievementsModal";

const Achievements = () => {
  const [displayAchievementsModal, setDisplayAchievementsModal] =
    useState(false);

  return (
    <View className="flex w-full  h-[160px] justify-center items-center">
      <AchievementsModal
        displayDescription={true}
        setDisplayAchievementsModal={setDisplayAchievementsModal}
        displayAchievementsModal={displayAchievementsModal}
      />

      <View className=" w-full flex-row justify-between items-center ">
        <Text className="text-lg ml-4 font-bold ">Achievements</Text>

        <TouchableOpacity
          onPress={() => {
            setDisplayAchievementsModal(true);
          }}
          className="bg-white mr-3 "
        >
          <Text className="text-neutral-500">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <AchievementListView />
      </ScrollView>
    </View>
  );
};

export default Achievements;

export const AchievementListView = ({ displayDescription }) => {
  const { userDetails } = useAuth();

  const questions = userDetails?.mentorStatistics.questions;

  const stars = userDetails?.mentorStatistics.stars;

  let numberOf5Stars = stars.filter((star) => star === 5).length;

  const achievmentDataList = [
    {
      name: "5 lessons",
      description: "Completed teaching 5 lessons",
      text: 5,
      bgColor: "blue",
      value: questions / 5 < 1 ? (questions / 5) * 100 : 100,
    },
    {
      name: "10 lessons",
      description: "Completed teaching 10 lessons",
      text: 10,
      bgColor: "turquoise",
      value: questions / 10 < 1 ? (questions / 10) * 100 : 100,
    },
    {
      name: "25 lessons",
      description: "Completed teaching 25 lessons",
      text: 25,
      bgColor: "green",
      value: questions / 25 < 1 ? (questions / 25) * 100 : 100,
    },
    {
      name: "50 lessons",
      description: "Completed teaching 50 lessons",
      text: 50,
      bgColor: "orange",
      value: questions / 50 < 1 ? (questions / 50) * 100 : 100,
    },
    {
      name: "100 lessons",
      description: "Completed teaching 100 mentees",
      text: 100,
      bgColor: "purple",
      value: questions / 100 < 1 ? (questions / 100) * 100 : 100,
    },
    {
      name: "Bronze mentor",
      description: "5 stars from 3+ mentees",
      text: null,
      bgColor: "brown",
      value: (numberOf5Stars / 3) * 100,
    },
    {
      name: "Silver mentor",
      description: "5 stars from 5+ mentees",
      text: null,
      bgColor: "silver",
      value: (numberOf5Stars / 5) * 100,
    },
    {
      name: "Gold mentor",
      description: "5 stars from 10+ mentees",
      text: null,
      bgColor: "gold",
      value: (numberOf5Stars / 10) * 100,
    },
    {
      name: "Platinum mentor",
      description: "5 stars from 20+ mentees",
      text: null,
      bgColor: "#E3E4E6",
      value: (numberOf5Stars / 20) * 100,
    },
  ];

  return achievmentDataList.map((achievement) => {
    return (
      <View
        key={achievement.name}
        className={` mx-4  flex items-center justify-between   ${
          displayDescription ? "  w-[140px]  h-[120px] mt-14 mx-5  " : " mt-6 "
        }`}
      >
        <View className="flex flex-col justify-between h-full w-full">
          <AnimatedCircleComponent
            text={achievement?.text || ""}
            size={80}
            strokeWidth={5}
            percentage={10}
            bgColor={achievement.bgColor}
            value={achievement.value}
          />
          <Text className="text-sm text-center">{achievement.name}</Text>
        </View>
        {displayDescription && (
          <Text className="text-xs text-center">{achievement.description}</Text>
        )}
      </View>
    );
  });
};
