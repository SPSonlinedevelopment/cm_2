import React, { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { router } from "expo-router";
import Profiles from "./components/Profile/Profiles";

const profile = () => {
  const {
    user,
    getUserDataFromFirebase,
    userDetails,
    setUserDetails,
    isAuthenticated,
  } = useAuth();

  if (!isAuthenticated || !user || !userDetails) {
    router.push("sign-in");
    return;
  } else if (isAuthenticated && user) {
    return <Profiles />;
  }
};

export default profile;
