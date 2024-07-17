import * as EmailValidator from "email-validator";

interface ValidateParam {
  type: string;
  ref: { current: any };
}

interface ErrorObj {
  isError: boolean;
  message: string;
}

interface Errors {
  name: ErrorObj;
  email: ErrorObj;
  password: ErrorObj;
}

export const validateInputs = (
  validateParams: ValidateParam[],
  setErrors: React.Dispatch<React.SetStateAction<Errors>>
) => {
  let newErrors = {
    name: { isError: false, message: "" },
    email: { isError: false, message: "" },
    password: { isError: false, message: "" },
  };

  const errors = validateParams.map((element) => {
    if (element.type === "name" && !element.ref.current) {
      return (newErrors.name = {
        isError: true,
        message: "Hey! This name field cannot be empty",
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

  const { name, email, password } = newErrors;

  return [name, email, password].every((error) => !error.isError);
};
