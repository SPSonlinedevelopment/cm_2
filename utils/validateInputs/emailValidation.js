import validator from "validator";

export const validatePassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8, // Minimum length of the password
    minLowercase: 1, // Minimum number of lowercase letters
    minUppercase: 1, // Minimum number of uppercase letters
    minNumbers: 1, // Minimum number of digits
    minSymbols: 1, // Minimum number of special characters
  });
};
