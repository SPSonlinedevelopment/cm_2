import React, { useEffect, useState } from "react";
import MenteeProfile from "./components/Profile/Profiles";
import { useAuth } from "./context/authContext";
import { router } from "expo-router";
import { Text, View } from "react-native";
import MentorProfile from "./components/Profile/MenteeProfile/MentorProfile";

const profile = () => {
  const { setUser, user, getUserDataFromFirebase, isAuthenticated } = useAuth();
  const [count, setCount] = useState(0);
  console.log("username", user?.firstName);

  const getdataFn = async () => {
    const getdata = await getUserDataFromFirebase(user.uid);
    console.log("getdata", getdata);
    setCount((count) => count + 1);
    if (getdata.success) {
      console.log("getdata.success", getdata.success);
      setUser(getdata.data);
      return getdata;
    }
  };

  let val;

  console.log("count", count);

  useEffect(() => {
    val = getdataFn();
  }, []);

  if (!isAuthenticated || !user) {
    router.push("sign-in");
    return;
  } else if (isAuthenticated && user) {
    return <MenteeProfile />;
  }
};

export default profile;
