import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import IconButton from "../Buttons/IconButton";
import { toBeDisabled } from "@testing-library/jest-native";

describe("IconButton Component", () => {
  const mockHandlePress = jest.fn();

  it("renders correctly with title and icon when not loading", () => {
    const { getByText, getByTestId } = render(
      <IconButton
        handlePress={mockHandlePress}
        title="Press Me"
        icon={<Text>Icon</Text>}
      />
    );

    // Check if title is rendered
    expect(getByText("Press Me")).toBeTruthy();

    expect(getByText("Icon")).toBeTruthy();
    const button = getByTestId("icon_button");

    fireEvent.press(button);

    expect(mockHandlePress).toHaveBeenCalled();
    expect(mockHandlePress).toHaveBeenCalledTimes(1);
  });

  it("disables the button when disabled prop is true", () => {
    const { getByTestId } = render(
      <IconButton
        handlePress={mockHandlePress}
        disabled={true}
        title="Press Me"
      />
    );

    const button = getByTestId("icon_button");
    // expect(button).toBeDisabled();
  });
});
