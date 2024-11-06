import { View } from "react-native";
import IconButton from "../../../Buttons/IconButton";

const SaveChangesButton: React.FC<{ handlePress: () => {} }> = ({
  handlePress,
}) => {
  return (
    <View className="w-full flex justify-center items-center mb-5">
      <IconButton
        title="Save Changes"
        textStyles="text-base font-semibold"
        containerStyles="   justify-center items-center  h-[40px] w-[360px] "
        handlePress={() => handlePress()}
      />
    </View>
  );
};

export default SaveChangesButton;
