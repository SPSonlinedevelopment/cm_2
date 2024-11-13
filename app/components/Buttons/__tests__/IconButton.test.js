import React from "react";
import { Text, View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import IconButton from "../IconButton";
import "@testing-library/jest-native/extend-expect";
import { StyleSheet } from "react-native";

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
    expect(button).toBeDisabled();
  });

  it("displays icon when passed via icon props ", () => {
    const { getByTestId, getByText } = render(
      <IconButton
        icon={
          <View>
            <Text>TestIcon</Text>
          </View>
        }
        handlePress={mockHandlePress}
      />
    );

    const button = getByTestId("icon_button");
    const icon = getByText("TestIcon");
    expect(icon).toBeTruthy();
  });

  it("displays is Loading indicator when isLoading is true", () => {
    const { getByText, getByTestId } = render(
      <IconButton handlePress={mockHandlePress} isLoading />
    );

    const loading = getByTestId("loading-spinner-indicator");

    expect(loading).toBeTruthy();
  });

  it("does not render title or icon when isLoading is true", () => {
    render(
      <IconButton
        title="Press me"
        icon={<Text>👍</Text>}
        isLoading={true}
        handlePress={mockHandlePress}
      />
    );

    expect(screen.queryByText("Press me")).toBeNull();
    expect(screen.queryByText("👍")).toBeNull();
  });

  it("does not call handlePress when disabled", () => {
    render(
      <IconButton
        title="Press me"
        handlePress={mockHandlePress}
        disabled={true}
      />
    );

    const button = screen.getByTestId("icon_button");
    fireEvent.press(button);

    expect(mockHandlePress).not.toHaveBeenCalled();
  });

  it("passes tailwind content container styles correctly when provided as a string ", () => {
    render(
      <IconButton
        title="Press me"
        handlePress={mockHandlePress}
        textStyles="font-pbold"
        containerStyles="bg-blue-300"
      />
    );
    const textElement = screen.getByText("Press me");

    // Check that the fontFamily is Montserrat-Bold
    const textStyle = textElement.props.style;

    // Flatten the style array (in case it is an array)
    const flattenedStyle = Array.isArray(textStyle)
      ? Object.assign({}, ...textStyle)
      : textStyle;

    expect(flattenedStyle.fontFamily).toBe("Montserrat-Bold");

    const button = screen.getByTestId("icon_button");

    const buttonStyle = button.props.style;

    const flattenedButtonStyle = Array.isArray(buttonStyle)
      ? Object.assign({}, ...buttonStyle)
      : buttonStyle;

    expect(flattenedButtonStyle.backgroundColor).toBe("#93c5fd");
  });

  it("passes icon container styles when passed as string props", () => {
    render(<IconButton iconContainerStyles="bg-blue-300" title="Press me" />);

    const iconElement = screen.getByTestId("icon_button_test");

    const iconStyles = iconElement.props.style;

    const flattenedStyle = StyleSheet.flatten(iconStyles);

    expect(flattenedStyle.backgroundColor).toBe("#93c5fd");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
