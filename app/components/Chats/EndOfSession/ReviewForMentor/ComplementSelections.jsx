import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, Text } from "react-native";
import { useState } from "react";

export const menteeComplements = [
  {
    title: "Clear",
    iconName: "pencil",
  },
  {
    title: "Friendly",
    iconName: "pencil",
  },
  {
    title: "Fast",
    iconName: "pencil",
  },
  {
    title: "Helpful",
    iconName: "pencil",
  },
];

export const mentorComplements = [
  {
    title: "Algebra Whizz",
    iconName: "pencil",
    description: "Mastered the intricacies of algebra",
  },
  {
    title: "High Achiever",
    iconName: "pencil",
    description: "Went beyond the status quo",
  },
  {
    title: "Math Wizard",
    iconName: "pencil",
    description: "Showed a real talent for maths",
  },
  {
    title: "Math Genius",
    iconName: "pencil",
    description: "Seriously impressive number-crunching",
  },
  {
    title: "Fast Thinker",
    iconName: "pencil",
    description: "Zoomed through the solution",
  },
  {
    title: "Beast Mode",
    iconName: "pencil",
    description: "Blazed through with ease",
  },
  {
    title: "Human Calculator",
    iconName: "pencil",
    description: "When you're this smart who needs a calculator",
  },
  {
    title: "Number God",
    iconName: "pencil",
    description: "Completely owned that maths question",
  },
  {
    title: "Physics Phenom",
    iconName: "pencil",
    description: "A true master of physics",
  },
  {
    title: "Chemistry Connoisseur",
    iconName: "pencil",
    description: "Can chemically ignite with their learning",
  },
  {
    title: "Biology Buff",
    iconName: "pencil",
    description: "Knows the ins and outs of biology",
  },
  {
    title: "Science Savant",
    iconName: "pencil",
    description: "Has a deep understanding of all things science",
  },
  {
    title: "Literature Luminary",
    iconName: "pencil",
    description: "A master of words",
  },
  {
    title: "History Hero",
    iconName: "pencil",
    description: "Brings history to life with their knowledge",
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

        handleSelection(comp?.title);
      }}
      className={`shadow p-5 m-5 rounded-full ${
        selected ? "bg-purple" : "bg-neutral-50"
      }`}
    >
      {comp?.icon}
    </TouchableOpacity>
  );
};

export default ComplementSelectionsButton;
