import React from "react";
import { render, screen } from "@testing-library/react-native";
import ComplementMessage from "../ComplementMessage";
import { mentorComplements } from "../../../EndOfSession/ReviewForMentor/ComplementSelections";

jest.mock("@/app/components/Effects/CelebrationAnimation", () => () => null);
jest.mock("@/app/components/Effects/SuccessAnimation", () => () => null);

describe("ComplementMessage", () => {
  const mockComplement = mentorComplements[0].title;

  it("renders the component correctly", () => {
    const message = { text: mockComplement };
    render(<ComplementMessage message={message} />);

    expect(screen.getByText(mockComplement)).toBeTruthy();
    expect(screen.getByText("+ 10 XP")).toBeTruthy();
  });

  it("displays the correct complement title and image", () => {
    const message = { text: mockComplement };
    render(<ComplementMessage message={message} />);

    const title = screen.getByText(mentorComplements[0].title);
    expect(title).toBeTruthy();

    const image = screen.getByTestId("complement_image_icon");

    expect(image.props.source).toEqual(mentorComplements[0].icon);
  });

  it("handles missing complement gracefully", () => {
    const message = { text: "Non-existent complement" };
    render(<ComplementMessage message={message} />);

    // Should not find a matching title
    expect(screen.queryByText("Non-existent complement")).toBeNull();
  });
});
