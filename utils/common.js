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

export const convertFirebaseTimestampToTime = (firebaseTimestamp) => {
  const date = firebaseTimestamp.toDate(); // Convert Firebase timestamp to JavaScript Date object
  let hours = date.getHours();
  const minutes = date.getMinutes();
  let period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour clock format
  hours = hours % 12 || 12;

  return { hours, minutes, period };
};

export const calculateDuration = (startTimestamp, endTimestamp) => {
  console.log("🚀 ~ calculateDuration ~ endTimestamp:", endTimestamp);
  if (
    !(startTimestamp instanceof Timestamp) ||
    !(endTimestamp instanceof Timestamp)
  ) {
    throw new Error("Both arguments must be Firebase Timestamp objects.");
  }

  const startDate = startTimestamp.toDate();
  const endDate = endTimestamp.toDate();

  // Calculate the difference in milliseconds
  const durationInMillis = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to seconds, minutes, hours, etc.
  const seconds = Math.floor(durationInMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Format the duration string
  let durationString = "";
  if (days > 0) {
    durationString += `${days} day${days > 1 ? "s" : ""} `;
  }
  if (hours % 24 > 0) {
    durationString += `${hours % 24} hour${hours % 24 > 1 ? "s" : ""} `;
  }
  if (minutes % 60 > 0) {
    durationString += `${minutes % 60} minute${minutes % 60 > 1 ? "s" : ""} `;
  }
  if (seconds % 60 > 0) {
    durationString += `${seconds % 60} second${seconds % 60 > 1 ? "s" : ""} `;
  }

  return durationString.trim();
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

export const convertRecurringDecimalToNumber = (decimal) => {
  // Extract the non-recurring part and the recurring part
  const nonRecurringPart = Math.floor(decimal);
  const recurringPart = decimal - nonRecurringPart;

  // Calculate the exact value of the recurring decimal
  const exactValue = nonRecurringPart + recurringPart / 9;

  // Round the exact value to 1 decimal place
  const roundedValue = Number(exactValue.toFixed(1));

  return roundedValue;
};
