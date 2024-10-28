import IconButton from "@/app/components/Buttons/IconButton";
import { Ionicons } from "@expo/vector-icons";

const BackButton: React.FC<{ handlePress: () => {} }> = ({ handlePress }) => {
  return (
    <IconButton
      icon={<Ionicons name="chevron-back" size={30} color="black" />}
      containerStyles=" bg-white shadow w-[45px] h-[45px] absolute left-3 top-10 flex justify-center items-center "
      iconContainerStyles="relative right-[2px]"
      handlePress={() => {
        handlePress();
      }}
    ></IconButton>
  );
};

export default BackButton;
