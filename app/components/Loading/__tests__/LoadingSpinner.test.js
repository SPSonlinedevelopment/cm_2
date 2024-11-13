import { render, screen } from "@testing-library/react-native";

import LoadingSpinner from "../LoadingSpinner";

test("renders LoadingDots with correct size and animation", () => {
  const size = 50; // Mock size for testing
  render(<LoadingSpinner size={size} />);

  const container = screen.getByTestId("loading-spinner-indicator");

  expect(container.props.style.height).toBe(50);

  const lottieAnimation = screen.getByTestId("lottie-view-test");
  expect(lottieAnimation).toBeTruthy();
});
