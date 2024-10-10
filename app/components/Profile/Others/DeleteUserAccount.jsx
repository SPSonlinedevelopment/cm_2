import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth"; // Import Firebase Authentication
import IconButton from "../../Buttons/IconButton";

const DeleteUserAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const deleteUserAccount = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await firebase.auth().currentUser.delete();
      Alert.Alert("Account delete sucessful");
    } catch (error) {
      setErrorMessage(error.message);
      Alert.Alert("Account delete unsucessful");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {isLoading && <Text>Deleting account...</Text>}
      {errorMessage && <Text>{errorMessage}</Text>}

      <View className="flex flex-row justify-evenly">
        <IconButton
          containerStyles="w-200px"
          title="Delete"
          handlePress={deleteUserAccount}
          disabled={isLoading}
        />
        <IconButton
          containerStyles="w-200px"
          title="Cancel"
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

export default DeleteUserAccount;
