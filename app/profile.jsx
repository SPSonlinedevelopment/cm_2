import React from "react";
import { useAuth } from "./context/authContext";
import Profiles from "./components/Profile/Profiles";
import Loading from "./components/Loading/LoadingSpinner";
import { View, Text, Button } from "react-native";

const Profile = () => {
  const { userDetails, logOut } = useAuth();

  if (!userDetails) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Loading size={200} />
        <Text>Loading</Text>
        <Button
          title="log out"
          onPress={async () => {
            await logOut();
          }}
        ></Button>
      </View>
    );
  }

  return <Profiles />;
};

export default Profile;
