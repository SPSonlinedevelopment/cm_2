import { Platform } from "react-native";

const usePlatform = () => {
  const isWeb = Platform.OS === "web";
  return { isWeb };
};

export default usePlatform;
