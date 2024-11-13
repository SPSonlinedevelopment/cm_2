import { render, screen } from "@testing-library/react-native";
import CelebrationAnimation from "../CelebrationAnimation";

// Mock the AnimatedLottieView

describe("CelebrationAnimation", () => {
  test("renders the animation at the bottom by default", () => {
    const size = 100;
    render(<CelebrationAnimation size={size} loop={true} position="bottom" />);

    const container = screen.getByTestId("celebration_animation");

    // Verify that the position is set to bottom
    expect(container.props.style.bottom).toBe("20%");
  });

  test("renders the animation at the top when position is 'top'", () => {
    const size = 100;
    render(<CelebrationAnimation size={size} loop={false} position="top" />);

    const container = screen.getByTestId("celebration_animation");

    // Verify that the position is set to bottom
    expect(container.props.style.top).toBe("20%");
  });

  test("height prop is sets height", () => {
    const size = 100;
    render(<CelebrationAnimation size={size} loop={false} position="top" />);

    const container = screen.getByTestId("celebration_animation");

    // Verify that the position is set to bottom
    expect(container.props.style.height).toBe(size);
  });

  test("passes the correct loop prop to AnimatedLottieView", () => {
    const size = 100;
    render(<CelebrationAnimation size={size} loop={true} position="bottom" />);

    // Verify that loop prop is passed as true to the AnimatedLottieView
    const lottieComponent = screen.getByTestId("lottie_view");

    expect(lottieComponent.props.loop).toBe(true);
  });
});
