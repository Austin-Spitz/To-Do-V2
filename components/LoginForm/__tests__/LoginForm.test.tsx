import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Render", () => {
  it("Should render login button", async () => {
    render(<LoginForm />);

    const btn = screen.getByTestId("login-btn");

    expect(btn).toBeInTheDocument();
  });

  describe("user input track", () => {
    it("Should track user input correctly when typed", async () => {
      render(<LoginForm />);

      const textFieldInput = screen.getAllByTestId("login-input");

      for (const input of textFieldInput) {
        await userEvent.type(input, "testType");
        expect(input).toHaveValue("testType");
      }
    });
  });
});

describe("Actions", () => {
  it("Should display error if you try to login with an empty field", async () => {
    render(<LoginForm />);

    const inputs = screen.getAllByTestId("login-input");
    const btn = screen.getByTestId("login-btn");

    for (const input of inputs) {
      await userEvent.clear(input);
    }

    await userEvent.click(btn);

    expect(
      screen.getByText("One or more empty fields. Try again")
    ).toBeInTheDocument();
  });
});
