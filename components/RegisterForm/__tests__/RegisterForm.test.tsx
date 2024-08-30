import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../RegisterForm";

// mock the useRouter hook from the next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Render", () => {
  it("Should render register button", async () => {
    render(<RegisterForm />);

    const btn = screen.getByTestId("register-btn");

    expect(btn).toBeInTheDocument();
  });

  describe("user input track", () => {
    it("Should track user input correctly when typed", async () => {
      render(<RegisterForm />);

      const textFieldInput = screen.getAllByTestId("register-input");

      for (const input of textFieldInput) {
        await userEvent.type(input, "testType");
        expect(input).toHaveValue("testType");
      }
    });
  });
});

describe("Actions", () => {
  it("Should display error if you try to register with an empty field", async () => {
    render(<RegisterForm />);

    const inputs = screen.getAllByTestId("register-input");
    const btn = screen.getByTestId("register-btn");

    for (const input of inputs) {
      await userEvent.clear(input);
    }

    await userEvent.click(btn);

    expect(screen.getByText("All fields are necessary.")).toBeInTheDocument();
  });
});
