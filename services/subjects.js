import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";

export default SubjectIcon = ({ subject, selectedSubject }) => {
  const subjectSelected = subject.subject === selectedSubject;

  const subjects = [
    {
      subject: "Maths",
      icon: (
        <MaterialCommunityIcons
          name="math-compass"
          size={24}
          color={subjectSelected ? "white" : "black"}
        />
      ),
    },
    {
      subject: "Chemistry",
      icon: (
        <SimpleLineIcons
          name="chemistry"
          size={24}
          color={subjectSelected ? "white" : "black"}
        />
      ),
    },
    {
      subject: "Physics",
      icon: (
        <SimpleLineIcons
          name="energy"
          size={24}
          color={subjectSelected ? "white" : "black"}
        />
      ),
    },
    {
      subject: "Biology",
      icon: (
        <Fontisto
          name="dna"
          size={24}
          color={subjectSelected ? "white" : "black"}
        />
      ),
    },
    {
      subject: "Geography",
      icon: (
        <Fontisto
          name="earth"
          size={24}
          color={subjectSelected ? "white" : "black"}
        />
      ),
    },
    {
      subject: "English",
      icon: (
        <FontAwesome
          name="book"
          size={24}
          color={subjectSelected ? "white" : "black"}
        />
      ),
    },
  ];

  return subjects.find((sub) => sub.subject === subject.subject).icon;
};
