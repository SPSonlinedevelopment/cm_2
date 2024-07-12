import * as EmailValidator from "email-validator";
import { initialFormState } from "../initalFormState";

interface ValidateParam {
  type: string;
  ref: { current: any };
}

interface ErrorObj {
  isError: boolean;
  message: string;
}

interface Errors {
  firstName: ErrorObj;
  email: ErrorObj;
  lastName: ErrorObj;
  password: ErrorObj;
  school: ErrorObj;
  dob: ErrorObj;
}

export const validateInputs = (
  validateParams: ValidateParam[],
  setErrors: React.Dispatch<React.SetStateAction<Errors>>
) => {
  let newErrors = initialFormState;

  const errors = validateParams.map((element) => {
    if (element.type === "firstName" && !element.ref.current) {
      return (newErrors.firstName = {
        isError: true,
        message: "Hey! This first field cannot be empty",
      });
    }

    if (element.type === "lastName" && !element.ref.current) {
      return (newErrors.lastName = {
        isError: true,
        message: "Hey! This last name field cannot be empty",
      });
    }

    if (element.type === "password" && !element.ref.current) {
      return (newErrors.password = {
        isError: true,
        message: "Hey! This password field cannot be empty",
      });
    }

    if (element.type === "email" && !element.ref.current) {
      return (newErrors.email = {
        isError: true,
        message: "Hey! This email field cannot be empty",
      });
    }

    if (element.type === "dob" && !element.ref.current) {
      return (newErrors.dob = {
        isError: true,
        message: "Hey! This birthday field cannot be empty",
      });
    } else if (
      element.type === "email" &&
      !EmailValidator.validate(element.ref.current)
    ) {
      return (newErrors.email = {
        isError: true,
        message: "Hey! Incorrect email type",
      });
    }
    return null;
  });

  setErrors(newErrors);

  console.log(newErrors);

  const { firstName, email, password, lastName, dob, school } = newErrors;

  const test = newErrors.map((element) => {
    element;

    /// to do need a function to only return the function below relevant params
  });

  return [firstName, email, password, lastName, dob, school].every(
    (error) => !error.isError
  );
};
