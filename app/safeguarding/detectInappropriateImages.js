import { getFunctions, httpsCallable } from "firebase/functions";
import { Alert } from "react-native";

// Initialize functions
const functions = getFunctions();

// Get a reference to your Callable Cloud Function
const deleteImageWithFace = httpsCallable(functions, "deleteImageWithFace");

export const deleteImagesWithFace = async (storageRef) => {
  const storagePath = `gs://${storageRef._location.bucket}/${storageRef._location.path_}`;
  try {
    const result = await deleteImageWithFace({
      imageUrl: storagePath,
    });
    console.log("resultdeleteImageWithFace", result);

    if (result.data.success) {
      Alert.alert("Face recognised image deleted");
      return true;
    } else {
      console.log(result.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error calling function:", error);
  }
};

const detectInappropriateContent = httpsCallable(
  functions,
  "detectInappropriateImages"
);

export const detectInnapropriateImageContent = async (storageRef) => {
  const storagePath = `gs://${storageRef._location.bucket}/${storageRef._location.path_}`;
  try {
    const result = await detectInappropriateContent({
      imageUrl: storagePath,
    });

    if (result.data.success) {
      Alert.alert("Inappropriate content detected. Image deleted.");
      return true;
    } else {
      console.log(result.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error calling function:", error);
  }
};
