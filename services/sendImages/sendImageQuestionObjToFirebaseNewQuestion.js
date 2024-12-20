import { useChat } from "../../app/context/chatContext";
import { generateRandomId } from "@/utils/common";

const sendImageQuestionObjToFirebaseNewQuestion = async (url, userDetails) => {
  const { setNewTextQuestion } = useChat();
  const sendData = async () => {
    try {
      const newquestionObj = {
        imageUrl: url,
        menteeId: userDetails?.uid || "",
        menteeName: userDetails?.firstName || "",
        initialMessage: "",
        questionSubject: "",
        Timestamp: new Date(),
        questionId: generateRandomId(),
      };

      const result = await setNewTextQuestion(newquestionObj);

      console.log(result);
    } catch (error) {
      console.error("Error setting new text question:", error);
    }
  };

  sendData();
};

export default sendImageQuestionObjToFirebaseNewQuestion;
