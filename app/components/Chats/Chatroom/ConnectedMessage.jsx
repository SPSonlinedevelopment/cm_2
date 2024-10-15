import { View, Text } from "react-native";
import React, { useState } from "react";

import Avatar from "../../Profile/Avatar";
import { useAuth } from "@/app/context/authContext";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Card } from "../../Profile/MenteeProfile/MenteeStatistics";

import IconGeneral from "../../IconGeneral";
import Crown from "../../../../assets/icons/Crown.png";
import Ambition from "../../../../assets/icons/Ambition.png";
import Love from "../../../../assets/icons/Love.png";
import Clock from "../../../../assets/icons/Clock.png";

const ConnectedMessage = ({ message, mentorId, mentorName, menteeName }) => {
  const { userDetails } = useAuth();
  const [mentorData, setMentorData] = useState();

  const getMentorDoc = async () => {
    try {
      const docRef = doc(db, "mentors", mentorId);

      const docSnapshot = await getDoc(docRef); // Use await here

      if (docSnapshot.exists()) {
        // Document data
        const data = docSnapshot.data();

        setMentorData(data.mentorStatistics);
      } else {
        // Document does not exist
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  if (userDetails?.mode === "mentee" && !mentorData) {
    getMentorDoc();
  }
  let starsCount = 0;
  let starsAvg = 0;
  let complementsCount;
  if (mentorData) {
    if (mentorData?.stars?.length) {
      starsCount = mentorData.stars.reduce((acc, star) => acc + star, 0);
      starsAvg = Math.floor(starsCount / mentorData.stars.length);
    }
    complementsCount = Object.values(mentorData?.complements).reduce(
      (accumulator, item) => {
        return accumulator + item;
      }
    );
  }

  return (
    <View className="full flex items-center m-2">
      <View className=" w-[100%] flex items-center  bg-purple shadow rounded-xl p-2">
        <Avatar avatarName={message.senderAvatar}></Avatar>
        <Text className="text-white">
          You are now connected to{" "}
          {userDetails.mode === "mentor" ? menteeName : mentorName}
        </Text>

        {userDetails?.mode === "mentee" && (
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
        )}
      </View>
    </View>
  );
};

export default ConnectedMessage;
