import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@/app/context/authContext";
import bronzeMedal from "../../../../assets/images/bronzeMedal.jpg";
import { ScrollView } from "react-native-gesture-handler";
import Book from "../../../../assets/icons/Achievements/Book.png";
import IconGeneral from "../../IconGeneral";

const Achievements = () => {
  const { userDetails } = useAuth();

  const questions = userDetails?.mentorStatistics.questions;
  console.log("🚀 ~ Achievements ~ questions:", questions);
  const stars = userDetails?.mentorStatistics.stars;
  console.log("🚀 ~ Achievements ~ stars:", stars);

  let numberOf5Stars = stars.filter((star) => star === 5).length;
  console.log("🚀 ~ Achievements ~ numberOf5Stars:", numberOf5Stars);

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
      bgColor: "yellow",
      value: questions / 100 < 1 ? (questions / 100) * 100 : 100,
    },
    {
      name: "Bronze mentor",
      description: "5 starts from 3+ mentees",
      text: null,
      bgColor: "brown",
      value: 30,
    },
    {
      name: "Silver mentor",
      description: "5 starts from 5+ mentees",
      text: null,
      bgColor: "silver",
      value: (numberOf5Stars / 5) * 100,
    },
    {
      name: "Bronze mentor",
      description: "5 starts from 10+ mentees",
      text: null,
      bgColor: "gold",
      value: (numberOf5Stars / 10) * 100,
    },
    {
      name: "Platinum mentor",
      description: "5 starts from 20+ mentees",
      text: null,
      bgColor: "#E3E4E6",
      value: (numberOf5Stars / 20) * 100,
    },
  ];

  console.log("achievmentDataList", achievmentDataList);

  return (
    <View className="flex flex-start h-[220px]">
      <Text className="text-lg font-bold ml-3 "> Achievements</Text>
      <View className="flex flex-row justify-end">
        <TouchableOpacity onPress={() => {}} className="bg-white mr-3 ">
          <Text className="text-neutral-500">See All</Text>
        </TouchableOpacity>
      </View>

      {/* <Image source={Book}></Image> */}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {achievmentDataList.map((achievement) => {
          return (
            <View className=" m-2 flex items-center justify-between w-[100px] h-[100px] ">
              <AnimatedCircleComponent
                text={achievement?.text || ""}
                size={80}
                strokeWidth={5}
                percentage={10}
                bgColor={achievement.bgColor}
                value={achievement.value}
              />
              <Text className="text-base">{achievement.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Achievements;
