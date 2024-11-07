import React, { useRef } from "react";
import FormField from "../FormField";
import {
  render,
  screen,
  fireEvent,
  userEvent,
} from "@testing-library/react-native";

describe("TextInput", () => {
  const user = userEvent.setup();
  // test("renders correctly", () => {
  //   render(<FormField />);
  //   const input = screen.getByTestId("input");

  //   userEvent.type(input);
  // });

  // Add more tests for other scenarios or functionalities

  test("should handle input change", () => {
    // Test data
    const placeholderText = "Enter text";
    const otherStyles = "custom-styles";

    const type = "password";
    const refName = { current: "" };
    const error = {
      name: { isError: false, message: "" },
      email: { isError: false, message: "" },
      password: { isError: false, message: "" },
    };
    const seterror = jest.fn();
    const setAlertMessage = jest.fn();
    const editable = true;

    // Render the component
    const { getByTestId } = render(
      <FormField
        setAlertMessage={setAlertMessage}
        placeholderText={placeholderText}
        otherStyles={otherStyles}
        type={type}
        refName={refName}
        error={error}
        seterror={seterror}
        editable={editable}
      />
    );

    // Find the input element
    const input = getByTestId("input");
    expect(placeholderText).toBe("Enter text");
    expect(type).toBe("password");

    // Test input change event
    // userEvent.press(input);
    // userEvent.type(input, "Test input");
    // expect(input).toBe("Test input");

    // Assert
    // expect(refName.current).toBe("Test input");
  });
});
