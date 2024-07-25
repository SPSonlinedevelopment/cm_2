import React, { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { router } from "expo-router";
import Profiles from "./components/Profile/Profiles";

const profile = () => {
  const { user, getUserDataFromFirebase, setUserDetails, isAuthenticated } =
    useAuth();

  const getdataFn = async () => {
    const getdata = await getUserDataFromFirebase(user.uid);

    if (getdata.success) {
      setUserDetails(getdata.data);

      return getdata;
    }
  };

  let val;

  useEffect(() => {
    val = getdataFn();
  }, []);

  if (!isAuthenticated || !user) {
    router.push("sign-in");
    return;
  } else if (isAuthenticated && user) {
    return <Profiles />;
  }
};

export default profile;
