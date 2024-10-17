import IconButton from "@/app/components/Buttons/IconButton";
import { Ionicons } from "@expo/vector-icons";

const BackButton: React.FC<{ handlePress: () => {} }> = ({ handlePress }) => {
  return (
    <IconButton
      icon={<Ionicons name="chevron-back" size={24} color="black" />}
      containerStyles=" bg-white shadow w-[40px] h-[40px] absolute left-3 top-10"
      handlePress={() => {
        handlePress();
      }}
    ></IconButton>
  );
};

export default BackButton;
