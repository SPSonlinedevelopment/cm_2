export const editFirebaseMessage = (msg: string) => {
  // sign up responses
  if (msg.includes("(auth/invalid-email)"))
    msg = "This email is invalid please check its correct!";
  if (msg.includes("(auth/email-already-in-use)")) {
    msg =
      "There is already an account associated with that email. Please try again";
  }

  // sign in responses

  if (msg.includes("auth/invalid-credential")) {
    msg = "Incorrect email or password";
  }

  if (
    msg.includes(
      "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
    )
  ) {
    msg =
      "To many failed attempts so the account is locked. Reset your password or try later";
  }

  return msg;
};
