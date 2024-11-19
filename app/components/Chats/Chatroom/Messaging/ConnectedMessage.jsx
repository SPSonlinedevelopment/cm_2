import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Avatar from "@/app/components/Profile/EditProfile/Avatar/Avatar";
import { useAuth } from "@/app/context/authContext";
import { Card } from "@/app/components/Profile/MenteeProfile/MenteeStatistics";
import IconGeneral from "@/app/components/IconGeneral";
import Crown from "../../../../../assets/icons/Crown.png";
import Ambition from "../../../../../assets/icons/Ambition.png";
import Love from "../../../../../assets/icons/Love.png";
import Clock from "../../../../../assets/icons/Clock.png";
import Loading from "@/app/components/Loading/LoadingSpinner";
import FadeInView from "@/app/components/Effects/FadeInView";

const useCalculateStarsOrComplements = (mentorData) => {
  let starsCount = 0;
  let starsAvg = 0;
  let complementsCount = 0;

  if (mentorData?.mentorStatistics?.stars.length) {
    starsCount = mentorData?.mentorStatistics?.stars.reduce(
      (acc, star) => acc + star,
      0
    );
    starsAvg = Math.floor(
      starsCount / mentorData?.mentorStatistics?.stars.length
    );

    complementsCount = Object.values(
      mentorData?.mentorStatistics?.complements
    ).reduce((accumulator, item) => {
      return accumulator + item;
    });
  }
  return { starsAvg, complementsCount };
};

export const useMentorData = (mentorId) => {
  const { getMentorDoc } = useAuth();
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mentorId) {
      setLoading(false);
      return;
    }

    const fetchMentorData = async () => {
      try {
        setLoading(true);
        const data = await getMentorDoc(mentorId);
        setMentorData(data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [mentorId]);

  return { mentorData, loading, error };
};

const ConnectedMessage = ({ message, mentorId, mentorName, menteeName }) => {
  const { userDetails } = useAuth();

  const { mentorData, loading, error } = useMentorData(mentorId);

  const { starsAvg, complementsCount } =
    useCalculateStarsOrComplements(mentorData);

  return (
    <FadeInView containerStyles=" w-full flex items-center ">
      <View className="flex w-[410px] items-center justify-center bg-purple shadow rounded-xl p-3">
        <Avatar avatarName={message.senderAvatar} />
        <Text className="text-white">
          You are now connected to{" "}
          {userDetails.mode === "mentor" ? menteeName : mentorName}
        </Text>

        {loading ? (
          <Loading size={100} />
        ) : error ? (
          <Text className="text-red-500">Error loading mentor data</Text>
        ) : (
          userDetails?.mode === "mentee" && (
            <>
              <View>
                <View className="flex w-full flex-row justify-between">
                  <Card
                    text={`${Math.ceil(
                      mentorData?.mentorStatistics?.time || 0
                    )} Total Mins`}
                    icon={<IconGeneral size="35" source={Clock} />}
                  />
                  <Card
                    text={`${
                      mentorData?.mentorStatistics?.questions || 0
                    } Questions`}
                    icon={<IconGeneral size="35" source={Crown} />}
                  />
                </View>

                <View className="flex flex-row justify-between">
                  <Card
                    text={`${starsAvg || 0} stars`}
                    icon={<IconGeneral size="35" source={Ambition} />}
                  />
                  <Card
                    text={`${complementsCount || 0} Complements`}
                    icon={<IconGeneral size="35" source={Love} />}
                  />
                </View>
              </View>
            </>
          )
        )}
      </View>
    </FadeInView>
  );
};

export default ConnectedMessage;
