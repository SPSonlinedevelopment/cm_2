import { View } from "react-native";
import IconButton from "../../../Buttons/IconButton";
import { isLoading } from "expo-font";

const SaveChangesButton: React.FC<{
  isLoading: boolean;
  handlePress: () => {};
}> = ({ handlePress, isLoading }) => {
  return (
    <View className="w-full flex justify-center items-center mb-5">
      <IconButton
        isLoading={isLoading}
        title="Save Changes"
        textStyles="text-base font-semibold"
        containerStyles="   justify-center items-center  h-[40px] w-[360px] "
        handlePress={() => handlePress()}
      />
    </View>
  );
};

export default SaveChangesButton;
