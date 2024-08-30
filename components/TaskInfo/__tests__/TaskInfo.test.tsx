import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskInfo from "../TaskInfo";

// mock the useSession hook from the next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ data: { user: { email: "test@gmail.com" } } })),
}));

// testing for TaskInfo component

describe("Render", () => {
  it("Should render the name of the user", () => {
    render(<TaskInfo />);

    const myElm = screen.getByText("Hello Andrew!");

    expect(myElm).toBeInTheDocument();
  });

  it("Should render addTask button", async () => {
    render(<TaskInfo />);

    const btn = screen.getByTestId("addTask-btn");

    expect(btn).toBeInTheDocument();
  });

  describe("user input track", () => {
    it("Should track user input in TaskInfo correctly when typed", async () => {
      render(<TaskInfo />);

      const textFieldInput = screen.getAllByTestId("task-input");

      for (const input of textFieldInput) {
        await userEvent.type(input, "testType");
        expect(input).toHaveValue("testType");
      }
    });
  });
});

describe("Actions", () => {
  it("Task should be empty or not exist when clicking add task button", async () => {
    render(<TaskInfo />);

    const btn = screen.getByTestId("addTask-btn");

    const textInput = screen.getAllByTestId("task-input");

    for (const input of textInput) {
      await userEvent.click(btn); // click button

      expect(input).toHaveValue("");
    }
  });

  it("Task should be generated with correct information", async () => {
    render(<TaskInfo />);

    const textInput = screen.getAllByTestId("task-input");
    const btn = screen.getByTestId("addTask-btn");

    for (const input of textInput) {
      await userEvent.type(input, "addingTempTask");
    }

    await userEvent.click(btn);

    for (const input of textInput) {
      expect(input).toHaveValue("addingTempTask");
    }
  });
});
