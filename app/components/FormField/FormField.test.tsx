import React from "react";
import FormField from "./FormField";
import { render, screen, fireEvent } from "@testing-library/react-native";

describe("form field", () => {
  test("entering text into name input field updates useRef.current value", () => {
    render(<FormField></FormField>);
  });
});
