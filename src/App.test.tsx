import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

const mockFetch = jest.fn(
  () =>
    new Promise((resolve) => {
      resolve({
        ok: true,
        status: 200,
        json: async () => ({ response: { STATUS: "SUCCESS" } }),
      });
    })
);

(global as any).fetch = mockFetch;

describe("App", () => {
  beforeEach(() => {
    render(<App />);
    (fetch as jest.Mock).mockClear();
  });

  it("should display a message input with an accessible label", () => {
    screen.getByLabelText("Message");
  });

  it("should render a Submit button with a label of 'Send'", () => {
    screen.getByRole("button", { name: "Send" });
  });

  it("should set aria-disabled on the Send button when the Message textarea is empty", () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    expect(sendButton).toHaveAttribute("aria-disabled", "true");
  });

  it("should NOT disable the Send button when the Message textarea is populated", () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "example message");
    expect(sendButton).toHaveAttribute("aria-disabled", "false");
  });

  it.skip("should clear out the message textarea when 'Send' is clicked", async () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "example message");

    // Clicking this should clear the message input.
    userEvent.click(sendButton);

    // Now, the message input should be empty.
    await waitFor(() => {
      expect(messageInput).toHaveValue("");
    });

    // Send button should be disabled again since we just submitted a message, thus, the field is empty.
    expect(sendButton).toHaveAttribute("aria-disabled", "true");
  });

  it("should display the message after Send is clicked", () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "example message");
    userEvent.click(sendButton);
    screen.getByText("example message");
  });
});
