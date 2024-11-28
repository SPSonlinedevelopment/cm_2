import { render, screen } from "@testing-library/react-native";
import { editFirebaseMessage } from "../../../../utils/firebaseAuthMessages/editFirebaseAuthMessage";

describe("editFirebaseMessage", () => {
  test("should return the correct message for invalid email", () => {
    const errorMessage = "(auth/invalid-email)";
    const expectedMessage = "This email is invalid please check its correct!";
    const result = editFirebaseMessage(errorMessage);
    expect(result).toBe(expectedMessage);
  });

  test("should return the correct message for email already in use", () => {
    const errorMessage = "(auth/email-already-in-use)";
    const expectedMessage =
      "There is already an account associated with that email. Please try again";
    const result = editFirebaseMessage(errorMessage);
    expect(result).toBe(expectedMessage);
  });

  test("should return the correct message for invalid credentials", () => {
    const errorMessage = "auth/invalid-credential";
    const expectedMessage = "Incorrect email or password";
    const result = editFirebaseMessage(errorMessage);
    expect(result).toBe(expectedMessage);
  });

  test("should return the original message if there are no matching cases", () => {
    const errorMessage = "Some random error message";
    const result = editFirebaseMessage(errorMessage);
    expect(result).toBe(errorMessage);
  });
});
