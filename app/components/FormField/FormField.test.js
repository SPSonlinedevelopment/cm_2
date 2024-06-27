import React from "react";
import FormField from "./FormField";
import {
  render,
  screen,
  fireEvent,
  userEvent,
} from "@testing-library/react-native";

describe("form field", () => {
  test("entering text into name input field updates useRef.current value and invoves callback", () => {
    const mockCallback = jest.fn();

    const expectedUsername = "Ada Lovelace";

    // fireEvent.changeText(screen.getByTestId("input"), expectedUsername);

    // simulate tyoing and name

    // fireEvent.type(nameInput);
  });
});
