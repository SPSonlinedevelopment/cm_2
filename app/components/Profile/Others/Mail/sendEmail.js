import email from "react-native-email";
import { useAuth } from "@/app/context/authContext";

export const sendEmailToColletTeam = (name) => {
  const to = ["cxc@stpaulsschool.org.uk"];
  const subject = `Hello from  ${name}`;
  const body = "Hello Collet Mentoring team.... ";

  email(to, { subject, body }).catch((err) => {
    console.error("Failed to send email:", err);
  });
};
