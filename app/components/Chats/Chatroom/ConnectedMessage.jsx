import { View, Text } from "react-native";
import React, { useState } from "react";

import Avatar from "../../Profile/Avatar";
import { useAuth } from "@/app/context/authContext";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Card } from "../../Profile/MenteeProfile/MenteeStatistics";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const ConnectedMessage = ({ message, mentorId }) => {
  const { userDetails } = useAuth();
  console.log("🚀 ~ ConnectedMessage ~ userDetails:", userDetails);

  console.log("🚀 ~ ConnectedMessage ~ messagementiriD:", mentorId);

  const [mentorData, setMentorData] = useState();
  console.log("🚀 ~ ConnectedMessage ~ mentorData:", mentorData);

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
  if (mentorData) {
    if (mentorData?.stars?.length) {
      starsCount = mentorData.stars.reduce((acc, star) => acc + star, 0);
      starsAvg = Math.floor(starsCount / mentorData.stars.length);
    }
  }

  return (
    <View className="full flex items-center m-2">
      <View className=" w-[100%] flex items-center  bg-purple shadow rounded-xl p-3">
        <Avatar avatarName={message.senderAvatar}></Avatar>
        <Text className="text-white">
          You are now connected to {userDetails?.firstName}
        </Text>

        {userDetails?.mode === "mentee" && (
          <View>
            <View className="flex w-full flex-row justify-between">
              <Card
                text={` ${Math.ceil(mentorData?.time)} Total Mins`}
                icon={<AntDesign name="clockcircle" size={24} color="orange" />}
              />
              <Card
                text={` ${mentorData?.questions} Questions`}
                icon={<AntDesign name="clockcircle" size={24} color="orange" />}
              />
            </View>

            <View className="flex flex-row justify-between">
              <Card
                text={` ${starsAvg} stars`}
                icon={<AntDesign name="star" size={24} color="orange" />}
              />
              <Card
                text={` ${mentorData?.compliments} Compliments`}
                icon={<AntDesign name="heart" size={24} color="orange" />}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ConnectedMessage;
