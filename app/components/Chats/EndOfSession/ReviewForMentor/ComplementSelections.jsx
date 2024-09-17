import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, Text } from "react-native";
import { useState } from "react";

export const menteeComplements = [
  {
    title: "Clear",
    icon: <FontAwesome name="pencil" size={34} color="orange" />,
  },
  {
    title: "Friendly",
    icon: <FontAwesome name="heart" size={34} color="orange" />,
  },
  {
    title: "Fast",
    icon: <MaterialCommunityIcons name="bike-fast" size={34} color="orange" />,
  },
  {
    title: "Helpful",
    icon: (
      <MaterialCommunityIcons name="boxing-glove" size={34} color="orange" />
    ),
  },
];

const ComplementSelectionsButton = ({
  comp,
  setFeedbackForm,
  feedbackForm,
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelection = (selection) => {
    const complimentSelected =
      feedbackForm.mentorCompliments.includes(selection);

    setFeedbackForm((prev) => {
      if (complimentSelected) {
        return {
          ...prev,
          mentorCompliments: prev.mentorCompliments.filter(
            (prevSelections) => prevSelections !== selection
          ),
        };
      } else {
        return {
          ...prev,
          mentorCompliments: [...prev.mentorCompliments, selection],
        };
      }
    });
  };

  return (
    <TouchableOpacity
      onPress={(selection) => {
        setSelected(!selected);

        handleSelection(comp.title);
      }}
      className={`shadow p-5 m-5 rounded-full ${
        selected ? "bg-purple" : "bg-neutral-50"
      }`}
    >
      {comp.icon}
    </TouchableOpacity>
  );
};

export default ComplementSelectionsButton;
