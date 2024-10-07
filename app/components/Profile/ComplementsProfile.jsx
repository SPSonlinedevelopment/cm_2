import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";

import {
  menteeComplements,
  mentorComplements,
} from "../Chats/EndOfSession/ReviewForMentor/ComplementSelections";
import { useAuth } from "@/app/context/authContext";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DisplayAllComplimentsModal from "./DisplayAllComplimentsModal";
import IconGeneral from "../IconGeneral";

const ComplementsProfile = () => {
  const { userDetails } = useAuth();
  const [displayAllComplimentsModal, setDisplayAllComplimentsModal] =
    useState(false);

  const complelments =
    userDetails.mode === "mentor"
      ? userDetails?.mentorStatistics.compliments
      : userDetails?.menteeStatistics.compliments;

  const array = Object.entries(complelments);
  const test = array.map(([key, value]) => ({ key, value }));

  const mapVal =
    userDetails?.mode === "mentor" ? menteeComplements : mentorComplements;

  const data = mapVal?.map((comp) => {
    const compVal = test.filter((item) => {
      return item.key.toLowerCase() === comp.title.toLowerCase();
    });

    return (
      <View
        className={`justify-start items-center ${
          displayAllComplimentsModal ? "w-[48%]" : ""
        } `}
      >
        <View
          className={`shadow bg-white p-5 m-3 rounded-full ${
            displayAllComplimentsModal
              ? "h-[100px] w-[100px]"
              : "h-[80px] w-[80px]"
          }   flex justify-center items-center relative `}
        >
          <View
            className={` ${
              displayAllComplimentsModal
                ? "h-[100px] w-[100px]"
                : "h-[80px] w-[80px]"
            }  ${
              compVal[0]?.value > 0 ? "opacity-0 " : " bg-gray-700 opacity-50"
            } rounded-full absolute z-40`}
          />
          {/* <Icon
            color={compVal[0]?.value > 0 ? "#FFA500" : "grey"}
            name={comp.iconName}
          /> */}
          <Icon source={comp?.icon} />

          {compVal[0]?.value > 0 && (
            <View className="bg-[#FFA500] rounded-full p-1 h-6 w-10 shadow-xl flex items-center absolute bottom-[-15px]">
              <Text className=" font-bold text-white  ">
                {compVal[0]?.value}
              </Text>
            </View>
          )}
        </View>
        <Text
          className={`mt-3 ${
            displayAllComplimentsModal ? "text-base" : "w-[82] text-med "
          } text-center`}
        >
          {comp.title === "SolvedProblems" ? "Solved my Problems" : comp.title}
        </Text>

        {comp.description && displayAllComplimentsModal && (
          <Text className="text-base m-1   text-center text-neutral-500">
            {comp.description}
          </Text>
        )}
      </View>
    );
  });

  return (
    <View className="h-[190px] ">
      <DisplayAllComplimentsModal
        data={data}
        setDisplayAllComplimentsModal={setDisplayAllComplimentsModal}
        displayAllComplimentsModal={displayAllComplimentsModal}
      />

      <View className="w-full flex flex-row justify-between ">
        <Text className="text-lg font-bold ml-3 "> Compliments</Text>
        <TouchableOpacity
          onPress={() => {
            setDisplayAllComplimentsModal(true);
          }}
          className="bg-white mr-3 "
          title="See All"
        >
          <Text className="text-neutral-500">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        className="  "
      >
        {data}
      </ScrollView>
    </View>
  );
};

export default ComplementsProfile;

const Icon = ({ source }) => {
  return (
    <View>
      <IconGeneral size="70" source={source} />
    </View>
  );
};
