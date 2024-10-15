import { TouchableOpacity } from "react-native";
import { useState } from "react";
import Brain from "../../../../../assets/icons/Achievements/Brain.png";
import Certificate from "../../../../../assets/icons/Achievements/Certificate.png";
import Concentration from "../../../../../assets/icons/Achievements/Concentration.png";
import lightbulb from "../../../../../assets/icons/Achievements/light-bulb.png";
import magicwand from "../../../../../assets/icons/Achievements/magic-wand.png";
import performance from "../../../../../assets/icons/Achievements/Performance.png";
import positivity from "../../../../../assets/icons/Achievements/Positivity.png";
import Rocket from "../../../../../assets/icons/Achievements/Rocket.png";
import Clover from "../../../../../assets/icons/Achievements/Luck (Clover).png";
import Influence from "../../../../../assets/icons/Achievements/Influence.png";
import Calculator from "../../../../../assets/icons/Achievements/calculator.png";
import Learning from "../../../../../assets/icons/Achievements/Learning.png";
import Calendar from "../../../../../assets/icons/Achievements/Calendar.png";
import Commitment from "../../../../../assets/icons/Commitment.png";
import Superhero from "../../../../../assets/icons/Achievements/Superhero.png";
import Speedometer from "../../../../../assets/icons/Achievements/Speedometer.png";
import Fist from "../../../../../assets/icons/Achievements/Fist.png";
import ProblemSolving from "../../../../../assets/icons/Achievements/Problem Solving.png";
import Love from "../../../../../assets/icons/Love.png";
import IconGeneral from "@/app/components/IconGeneral";

export const menteeComplements = [
  {
    title: "Clear",
    icon: Certificate,
  },
  {
    title: "Friendly",
    icon: Commitment,
  },
  {
    title: "Fast",
    icon: Speedometer,
  },
  {
    title: "Helpful",
    icon: Superhero,
  },
  {
    title: "Smart",
    icon: Brain,
  },
  {
    title: "Kind",
    icon: Love,
  },
  {
    title: "SolvedProblems",
    icon: ProblemSolving,
  },
  {
    title: "Supportive",
    icon: Fist,
  },
];

export const mentorComplements = [
  {
    title: "Algebra Whizz",
    icon: Brain,
    description: "Mastered the intricacies of algebra",
  },
  {
    title: "High Achiever",
    icon: Certificate,
    description: "Went beyond the status quo",
  },
  {
    title: "Math Wizard",
    icon: Concentration,
    description: "Showed a real talent for maths",
  },
  {
    title: "Math Genius",
    icon: "pencil",
    description: "Seriously impressive number-crunching",
  },
  {
    title: "Fast Thinker",
    icon: lightbulb,
    description: "Zoomed through the solution",
  },
  {
    title: "Beast Mode",
    icon: magicwand,
    description: "Blazed through with ease",
  },
  {
    title: "Human Calculator",
    icon: Calculator,
    description: "When you're this smart who needs a calculator",
  },
  {
    title: "Number God",
    icon: performance,
    description: "Completely owned that maths question",
  },
  {
    title: "Physics Phenom",
    icon: Rocket,
    description: "A true master of physics",
  },
  {
    title: "Chemistry Connoisseur",
    icon: positivity,
    description: "Can chemically ignite with their learning",
  },
  {
    title: "Biology Buff",
    icon: Clover,
    description: "Knows the ins and outs of biology",
  },
  {
    title: "Science Savant",
    icon: Influence,
    description: "Has a deep understanding of all things science",
  },
  {
    title: "Literature Luminary",
    icon: Learning,
    description: "A master of words",
  },
  {
    title: "History Hero",
    icon: Calendar,
    description: "Brings history to life with their knowledge",
  },
];

const ComplementSelectionsButton = ({
  comp,
  setFeedbackForm,
  feedbackForm,
}) => {
  console.log("🚀 ~ feedbackForm:", feedbackForm);
  const [selected, setSelected] = useState(false);

  const handleSelection = (selection) => {
    const complementSelected =
      feedbackForm.mentorComplements.includes(selection);

    setFeedbackForm((prev) => {
      if (complementSelected) {
        return {
          ...prev,
          mentorComplements: prev.mentorComplements.filter(
            (prevSelections) => prevSelections !== selection
          ),
        };
      } else {
        return {
          ...prev,
          mentorComplements: [...prev.mentorComplements, selection],
        };
      }
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(!selected);

        handleSelection(comp?.title);
      }}
      className={`shadow h-[75px] w-[75px] m-2 flex items-center justify-center  rounded-full ${
        selected ? "bg-purple" : "bg-neutral-50"
      }`}
    >
      <IconGeneral size="40" source={comp?.icon} />
    </TouchableOpacity>
  );
};

export default ComplementSelectionsButton;
