import { render, screen } from "@testing-library/react-native";

import LoadingDots from "../LoadingDots";

test("renders LoadingDots with correct size and animation", () => {
  const size = 50; // Mock size for testing
  render(<LoadingDots size={size} />);

  const container = screen.getByTestId("loading-dots-test");

  expect(container.props.style.height).toBe(50);

  const lottieAnimation = screen.getByTestId("lottie-view-test");
  expect(lottieAnimation).toBeTruthy();
});
