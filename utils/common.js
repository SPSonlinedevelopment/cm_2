import { Timestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const getRoomId = () => {
  // const sortedIds = [userId1, userId2].sort();
  // sortedIds.push(generateRandomId());

  // const roomId = sortedIds.join("-");
  return generateRandomId();
};

export const generateRandomId = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const convertTimestampToTime = (timestamp) => {
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000); // Convert nanoseconds to milliseconds
  const date = new Date(milliseconds);
  const time = date.toLocaleTimeString(); // Get the time part from the date object

  return time;
};

export const convertFirebaseTimestampToDate = (firebaseTimestamp) => {
  if (!firebaseTimestamp) {
    return null;
  }
  const date = firebaseTimestamp.toDate(); // Convert Firebase Timestamp to JavaScript Date object

  // Extracting the date, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so add 1
  const year = date.getFullYear();

  // Format the date in a simple format
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const storeObjectAsyncStorage = async (key, value) => {


  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error storing object:", error);
  }
};

export const getObjectAsyncStorage = async (key) => {

  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue ? jsonValue : "No messages";
  } catch (error) {
    console.error("Error retrieving object:", error);
    return null;
  }
};
