import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ToggleScrollSelectionButton from "../ToggleScrollSelectionButton";
import * as Haptics from "expo-haptics";
import { Entypo } from "@expo/vector-icons";

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "Light",
    Medium: "Medium",
    Heavy: "Heavy",
  },
}));

describe("ToggleScrollSelectionButton Component", () => {
  const mockSetDisplay = jest.fn();
  const mockIcon = <Entypo name="heart" size={24} color="black" />;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the cross icon when display is true", () => {
    const { getByTestId } = render(
      <ToggleScrollSelectionButton
        display={true}
        setDisplay={mockSetDisplay}
        icon={mockIcon}
        position="left"
      />
    );

    const iconElement = getByTestId("icon_button_test");

    expect(iconElement.props.children.type).toBe(Entypo);
    expect(iconElement.props.children.props.name).toBe("cross");
  });

  it("renders the provided icon when display is false", () => {
    const { getByTestId } = render(
      <ToggleScrollSelectionButton
        display={false}
        setDisplay={mockSetDisplay}
        icon={mockIcon}
        position="right"
      />
    );

    const iconElement = getByTestId("icon_button_test");
    expect(iconElement.props.children).toEqual(mockIcon);
  });

  it("toggles the display state and triggers haptic feedback on press", () => {
    const { getByTestId } = render(
      <ToggleScrollSelectionButton
        display={false}
        setDisplay={mockSetDisplay}
        icon={mockIcon}
        position="right"
      />
    );

    const button = getByTestId("icon_button");
    fireEvent.press(button);

    expect(mockSetDisplay).toHaveBeenCalledTimes(1);
    expect(mockSetDisplay).toHaveBeenCalledWith(expect.any(Function));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it("applies the correct container styles based on the position prop", () => {
    const { getByTestId, receivedStyle } = render(
      <ToggleScrollSelectionButton
        display={false}
        setDisplay={mockSetDisplay}
        icon={mockIcon}
        position="left"
      />
    );

    const buttonLeft = getByTestId("icon_button");

    const leftStyle = buttonLeft.props.style;

    expect(leftStyle.left).toBe(10);
  });

  it("applies the correct container styles based on the position prop", () => {
    const { getByTestId } = render(
      <ToggleScrollSelectionButton
        display={false}
        setDisplay={mockSetDisplay}
        icon={mockIcon}
        position="right"
      />
    );

    const buttonRight = getByTestId("icon_button");

    const rightStyle = buttonRight.props.style;

    expect(rightStyle.right).toBe(10);
  });
});
