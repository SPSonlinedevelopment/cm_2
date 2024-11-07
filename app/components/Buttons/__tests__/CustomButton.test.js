import React from "react";
import CustomButton from "../CustomButton";
import { render, screen, fireEvent } from "@testing-library/react-native";

describe("Button", () => {
  test("renders correctly", () => {
    render(<CustomButton title="" handlePress={() => {}} />);

    const button = screen.getByTestId("custom_button");
    expect(button).toBeTruthy();
  });

  test("fires handlePress event when pressed", () => {
    const onPressMock = jest.fn();
    render(<CustomButton title="test_title" handlePress={onPressMock} />);

    const button = screen.getByTestId("custom_button");

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("renders title correctly", () => {
    const titleMessage = "This is the button title";

    render(<CustomButton title={titleMessage} handlePress={() => {}} />);
    const buttonText = screen.getByText(titleMessage);
    expect(buttonText).toBeTruthy();
  });


  
});
