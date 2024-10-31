import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import createBlob from "./createBlob";

export const sendImageToFirebaseStorageGetDownloadUrl = async (
  image,
  storageRef
) => {
  if (!image) {
    throw new Error("Image is missing. Please provide an image to upload.");
  }

  try {
    // Create blob and upload to Firebase
    const blob = await createBlob(image);
    await uploadBytesResumable(storageRef, blob);
    blob.close(); // Cleanup blob after upload

    // Get the download URL
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};
