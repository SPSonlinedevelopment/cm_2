import React from "react";
import CustomButton from "../CustomButton";
import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

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

  test("styles are passed correctly via container Styles prop", () => {
    render(<CustomButton containerStyles="bg-blue-100" />);

    const button = screen.getByTestId("custom_button");
    const buttonStyle = button.props.style;

    expect(buttonStyle.backgroundColor).toBe("#dbeafe");
  });

  test(" when is Loading is true opacity style changes and Loading spinner displayed and becomes disabled", () => {
    const { getByTestId } = render(<CustomButton isLoading={true} />);
    const button = screen.getByTestId("custom_button");

    expect(button.props.style.opacity).toBe(0.5);

    expect(button).toBeDisabled();

    const loadingIndicator = screen.getByTestId("loading-spinner-indicator");
    expect(loadingIndicator).toBeTruthy();
  });
});
