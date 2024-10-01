import { View, Text } from "react-native";
import React from "react";

import { menteeComplements } from "../../Chats/EndOfSession/ReviewForMentor/ComplementSelections";
import { useAuth } from "@/app/context/authContext";
import { ScrollView } from "react-native-gesture-handler";

const ComplementsProfile = () => {
  const { userDetails } = useAuth();

  let content;

  if (userDetails?.mode === "mentor") {
    const complelments = userDetails?.mentorStatistics.compliments;
    const array = Object.entries(complelments);
    const test = array.map(([key, value]) => ({ key, value }));

    content = (
      <View className="h-[150px]">
        <Text className="text-lg font-bold ml-3 "> Compliments</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          className="flex flex-row pb-2 "
        >
          {menteeComplements?.map((comp) => {
            const compVal = test.filter((item) => {
              return item.key.toLowerCase() === comp.title.toLowerCase();
            });

            return (
              <View className="shadow p-5 m-2 rounded-full h-[90px] w-[100px] bg-white flex items-center">
                {comp.icon}
                <Text className="text-xs m-1">{comp.title}</Text>
                <View className="bg-orange-400 rounded-full p-1 h-6 w-10 shadow-xl flex items-center absolute bottom-[-10px]">
                  <Text className="text-white font-bold ">
                    {compVal[0].value}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return content;
};

export default ComplementsProfile;
