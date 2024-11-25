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

export const useCalculateStarsOrComplements = (mentorStatistics = {}) => {
  const { stars = [], complements = {} } = mentorStatistics;

  console.log("useCalculateStarsOrComplements", mentorStatistics);

  // Calculate total stars
  const starsCount = stars?.length
    ? stars?.reduce((acc, star) => acc + star, 0)
    : 0;

  console.log("starsCount", starsCount);

  // Calculate average stars (rounded to 1 decimal place)
  const starsAvg = stars?.length
    ? Number((starsCount / stars?.length).toFixed(1))
    : 0;

  console.log("starsAvg", starsAvg);

  // Calculate total complements

  const complementsCount = Object.values(complements).reduce(
    (acc, count) => acc + count,
    0
  );

  console.log("complementsCount", complementsCount);

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

  const { starsAvg, complementsCount } = useCalculateStarsOrComplements(
    mentorData?.mentorStatistics || {}
  );

  console.log("starsAvg, complementsCount", starsAvg, complementsCount);

  return (
    <FadeInView containerStyles=" w-full flex items-center ">
      <View className="flex w-[400px] items-center justify-center shadow rounded-xl p-3">
        <Avatar avatarName={message?.senderAvatar} />
        <Text className="text-purple font-bold">
          You are now connected to{" "}
          {userDetails?.mode === "mentor" ? menteeName : mentorName}
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
                      mentorData?.mentorStatistics?.time
                    )} Total Mins`}
                    icon={<IconGeneral size="35" source={Clock} />}
                  />
                  <Card
                    text={`${mentorData?.mentorStatistics?.questions} Questions`}
                    icon={<IconGeneral size="35" source={Crown} />}
                  />
                </View>

                <View className="flex flex-row justify-between">
                  <Card
                    text={`${starsAvg} stars`}
                    icon={<IconGeneral size="35" source={Ambition} />}
                  />

                  <Card
                    text={`${complementsCount} Complements`}
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
