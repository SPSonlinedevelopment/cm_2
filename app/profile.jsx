import React, { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { router } from "expo-router";
import Profiles from "./components/Profile/Profiles";
import Loading from "./components/Loading/LoadingSpinner";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

const Profile = () => {
  const { user, userDetails, setUserDetails, isAuthenticated } = useAuth();
  // console.log("🚀 ~ Profile ~ user:", user);

  const navigation = useNavigation();
  if (!isAuthenticated) {
    navigation.navigate("sign-in");
    return;
  }

  if (!userDetails) {
    navigation.navigate("user-details");
    return;
  }

  useEffect(() => {
    if (!user) {
      navigation.navigate("sign-in");
      return;
    }

    const mentorRef = collection(db, "mentors");
    const mentorQuery = query(mentorRef, where("uid", "==", user?.uid));

    getDocs(mentorQuery).then((mentorDoc) => {
      if (!mentorDoc.empty) {
        // Mentor found, set up listener for mentor data
        const unsubscribe = onSnapshot(mentorQuery, (querySnapshot) => {
          if (querySnapshot.empty) {
            setUserDetails(null);
            return;
          }
          const mentorDoc = querySnapshot.docs[0];
          setUserDetails(mentorDoc.data());
        });

        return () => unsubscribe(); // Unsubscribe when component unmounts
      } else {
        // Mentor not found, check if the UID exists in the 'mentees' collection
        const menteeRef = collection(db, "mentees");
        const menteeQuery = query(menteeRef, where("uid", "==", user?.uid));

        getDocs(menteeQuery).then((menteeDoc) => {
          if (!menteeDoc.empty) {
            // Mentee found, set up listener for mentee data
            const unsubscribe = onSnapshot(menteeQuery, (querySnapshot) => {
              if (querySnapshot.empty) {
                setUserDetails(null);
                return;
              }
              const menteeDoc = querySnapshot.docs[0];

              setUserDetails(menteeDoc.data());
            });

            return () => unsubscribe(); // Unsubscribe when component unmounts
          } else {
            // Neither mentor nor mentee found, set userData to null
            setUserDetails(null);
          }
        });
      }
    });
  }, [user?.uid]); // Only re-run the effect when the uid changes

  if (!userDetails) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Loading size={200} />
        <Text>Loading</Text>
      </View>
    );
  }

  return <Profiles />;
};

export default Profile;
