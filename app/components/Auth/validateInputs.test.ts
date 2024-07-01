import * as EmailValidator from "email-validator";
import { validateInputs } from "./validateInputs";

interface ErrorObj {
  isError: boolean;
  message: string;
}

interface Errors {
  name?: ErrorObj;
  email?: ErrorObj;
  password?: ErrorObj;
}

const setErrorsMock: jest.Mock<React.Dispatch<React.SetStateAction<Errors>>> =
  jest.fn();

describe("validateInputs", () => {
  test("should validate inputs and set errors when input fields are empty", () => {
    // Test data
    const validateParamsMockData = [
      { type: "name", ref: { current: "" } },
      { type: "email", ref: { current: "" } },
      { type: "password", ref: { current: "" } },
    ];

    // Call the function
    const result = validateInputs(validateParamsMockData, setErrorsMock);

    // Assert
    expect(result).toBe(false); // Validation should fail with empty inputs
    expect(setErrorsMock).toHaveBeenCalledTimes(1); // setErrors should be called once

    const expectedErrors: Errors = {
      name: { isError: true, message: "Hey! This name field cannot be empty" },
      email: {
        isError: true,
        message: "Hey! This email field cannot be empty",
      },
      password: {
        isError: true,
        message: "Hey! This password field cannot be empty",
      },
    };
    expect(setErrorsMock).toHaveBeenCalledWith(expectedErrors);
  });

  test("should validate and set errors correctly", () => {
    // Test data
    const validateParamsMockData = [
      { type: "name", ref: { current: "John Doe" } },
      { type: "email", ref: { current: "test@example.com" } },
      { type: "password", ref: { current: "123456" } },
    ];

    const result = validateInputs(validateParamsMockData, setErrorsMock);

    expect(result).toBe(true); // Validation should pass with inputs having value

    expect(setErrorsMock).toHaveBeenCalledTimes(2);

    const expectedErrors: Errors = {
      name: { isError: false, message: "" },
      email: { isError: false, message: "" },
      password: { isError: false, message: "" },
    };

    // inputs are correct so expect result to not show error or messages
    expect(setErrorsMock).toHaveBeenCalledWith(expectedErrors);
  });

  test("email field should show error if email not in correct format ", () => {
    const validateParamsMockData = [
      { type: "name", ref: { current: "test name" } },
      { type: "email", ref: { current: "testexample.com" } },
      { type: "password", ref: { current: "123456" } },
    ];

    const result = validateInputs(validateParamsMockData, setErrorsMock);

    expect(setErrorsMock).toHaveBeenCalledTimes(3);

    const expectedErrors: Errors = {
      name: { isError: false, message: "" },
      email: { isError: true, message: "Hey! Incorrect email type" },
      password: { isError: false, message: "" },
    };

    expect(setErrorsMock).toHaveBeenCalledWith(expectedErrors);
  });

  test("function returns correct error object in sign in page with just email and password inputs ", () => {
    const validateParamsMockData = [
      { type: "email", ref: { current: "test@example.com" } },
      { type: "password", ref: { current: "123456" } },
    ];

    const result = validateInputs(validateParamsMockData, setErrorsMock);
    expect(setErrorsMock).toHaveBeenCalledTimes(4);

    const expectedErrors: Errors = {
      name: { isError: false, message: "" },
      email: { isError: true, message: "Hey! Incorrect email type" },
      password: { isError: false, message: "" },
    };
    expect(setErrorsMock).toHaveBeenCalledWith(expectedErrors);
  });
});
