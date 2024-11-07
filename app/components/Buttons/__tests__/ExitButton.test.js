// fired toggle abd cleanUpFunctions display when passed
import React from "react";
import { Text, View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import IconButton from "../IconButton";
import "@testing-library/jest-native/extend-expect";
import ExitButton from "../ExitButton";

describe("Exit Button Component", () => {
  test("it renders correctly  and fires toggle function", () => {
    const mockToggleDisplay = jest.fn();
    const { getByTestId } = render(
      <ExitButton toggleDisplay={mockToggleDisplay} />
    );

    fireEvent.press(getByTestId("icon_button"));
    expect(mockToggleDisplay).toHaveBeenCalledWith(false);
  });

  test("calls cleanUp functions if provided when pressed", () => {
    const mockToggleDisplay = jest.fn();
    const mockCleanUp = jest.fn();

    render(
      <ExitButton
        toggleDisplay={mockToggleDisplay}
        cleanUpFunctions={mockCleanUp}
      />
    );
    fireEvent.press(screen.getByTestId("icon_button"));

    expect(mockCleanUp).toHaveBeenCalled();
    expect(mockCleanUp).toHaveBeenCalledTimes(1);
  });

  it("does not throw error if cleanUpFunctions is not provided", () => {
    const mockToggleDisplay = jest.fn();
    const { getByTestId } = render(
      <ExitButton toggleDisplay={mockToggleDisplay} />
    );

    expect(() => fireEvent.press(getByTestId("icon_button"))).not.toThrow();
  });
});
