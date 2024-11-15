import { View, Text } from "react-native";
import React, { useState } from "react";
import Avatar from "@/app/components/Profile/EditProfile/Avatar/Avatar";
import { useAuth } from "@/app/context/authContext";
import { Card } from "@/app/components/Profile/MenteeProfile/MenteeStatistics";
import IconGeneral from "@/app/components/IconGeneral";
import Crown from "../../../../../assets/icons/Crown.png";
import Ambition from "../../../../../assets/icons/Ambition.png";
import Love from "../../../../../assets/icons/Love.png";
import Clock from "../../../../../assets/icons/Clock.png";

const ConnectedMessage = ({ message, mentorId, mentorName, menteeName }) => {
  const { userDetails, getMentorDoc } = useAuth();
  // const [mentorData, setMentorData] = useState();

  if (userDetails?.mode === "mentee") {
    const mentorData = getMentorDoc(mentorId);
    console.log("🚀 ~ ConnectedMessage ~ mentorData:", mentorData);
    const stats = mentorData.mentorStatistics;
  }
  let starsCount = 0;
  let starsAvg = 0;
  let complementsCount;

  // if (stats) {
  //   if (stats?.stars?.length) {
  //     starsCount = stats.stars.reduce((acc, star) => acc + star, 0);
  //     starsAvg = Math.floor(starsCount / stats.stars.length);
  //   }
  //   complementsCount = Object.values(stats?.complements).reduce(
  //     (accumulator, item) => {
  //       return accumulator + item;
  //     }
  //   );
  // }

  return (
    <View className="full flex items-center m-2">
      <View className=" w-[100%] flex items-center  bg-purple shadow rounded-xl p-2">
        <Avatar avatarName={message.senderAvatar}></Avatar>
        <Text className="text-white">
          You are now connected to{" "}
          {userDetails.mode === "mentor" ? menteeName : mentorName}
        </Text>

        {/* {userDetails?.mode === "mentee" && (
          <View>
            <View className="flex w-full flex-row justify-between">
              <Card
                text={` ${Math.ceil(mentorData?.time)} Total Mins`}
                icon={<IconGeneral size="35" source={Clock} />}
              />
              <Card
                text={` ${mentorData?.questions} Questions`}
                icon={<IconGeneral size="35" source={Crown} />}
              />
            </View>

            <View className="flex flex-row justify-between">
              <Card
                text={` ${starsAvg} stars`}
                icon={<IconGeneral size="35" source={Ambition} />}
              />
              <Card
                text={` ${complementsCount} Complements`}
                icon={<IconGeneral size="35" source={Love} />}
              />
            </View>
          </View>
        )} */}
      </View>
    </View>
  );
};

export default ConnectedMessage;
