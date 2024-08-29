import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import createBlob from "./createBlob";

export const sendImageToFirebaseStorageGetDownloadUrl = async (image, user) => {
  try {
    // create reference to storage image in Firebase Storage
    const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}.jpg`);

    if (!image) {
      throw new Error("Image is missing. Please provide an image to upload.");
    }
    await uploadImageToStorage(image, storageRef);
    const downloadUrl = await getDownloadUrlFromStorage(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const uploadImageToStorage = async (image, storageRef) => {
  const blob = await createBlob(image);
  await uploadBytesResumable(storageRef, blob);
};

const getDownloadUrlFromStorage = async (storageRef) => {
  const url = await getDownloadURL(storageRef);
  return url;
};
