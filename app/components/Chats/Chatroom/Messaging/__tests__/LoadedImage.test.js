import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import LoadedImage, { FullScreenImage } from "../LoadedImage"; // Adjust path as necessary
import "@testing-library/jest-native/extend-expect";

describe("LoadedImage Component", () => {
  const mockUrl = "https://example.com/image.jpg";
  const mockCaption = "Sample Caption";

  it("displays image when loaded", () => {
    render(
      <LoadedImage url={mockUrl} thisUsersMessage={true} isPreview={false} />
    );

    // Ensure the image is displayed
    expect(screen.getByTestId("image_element")).toHaveProp("source", {
      url: mockUrl, // Adjusted key to "uri" instead of "url" for correct source
    });
  });

  it("opens FullScreenImage modal on image press", () => {
    const { getByTestId } = render(
      <LoadedImage url={mockUrl} thisUsersMessage={true} isPreview={false} />
    );
    const image = getByTestId("image_button");

    // Simulate a press to open the modal
    fireEvent.press(image);

    // Verify FullScreenImage modal is displayed
    expect(screen.getByTestId("icon_button")).toBeTruthy();
  });

  it("displays the caption text if provided", () => {
    render(
      <LoadedImage
        url={mockUrl}
        thisUsersMessage={true}
        caption={mockCaption}
        isPreview={false}
      />
    );

    // Check if caption text is rendered
    expect(screen.getByText(mockCaption)).toBeTruthy();
  });

  it("closes FullScreenImage modal when onClose is called", () => {
    render(
      <LoadedImage url={mockUrl} thisUsersMessage={true} isPreview={false} />
    );
    const image = screen.getByTestId("image_button");

    // Simulate a press to open the modal
    fireEvent.press(image);

    // Simulate closing the modal by calling the onClose function
    fireEvent.press(screen.getByTestId("icon_button"));

    // Verify FullScreenImage modal is no longer displayed
    expect(screen.queryByTestId("icon_button")).toBeNull();
  });
});

describe("FullScreenImage Component", () => {
  const mockUrl = "https://example.com/image.jpg";
  const mockOnClose = jest.fn();

  it("renders FullScreenImage with ExitButton and Image", () => {
    render(<FullScreenImage url={mockUrl} onClose={mockOnClose} />);

    // Verify ExitButton is displayed
    expect(screen.getByTestId("icon_button")).toBeTruthy();

    // Verify image is displayed with the correct source
    expect(screen.getByTestId("full_screen_image")).toHaveProp("source", {
      url: mockUrl, // Corrected to "uri" to match the Image source prop
    });
  });

  it("calls onClose when ExitButton is pressed", () => {
    render(<FullScreenImage url={mockUrl} onClose={mockOnClose} />);

    // Simulate pressing the ExitButton
    fireEvent.press(screen.getByTestId("icon_button"));

    // Verify onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});
