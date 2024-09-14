import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Minesweeper from "./Minesweeper";
import userEvent from "@testing-library/user-event";

const mockInitialBombMap = jest.fn();
jest.mock("./hooks/buildNewBombMap", () => {
  return jest.fn((rows, cols) => mockInitialBombMap(rows, cols));
});

const cell = (displays: string) => {
  return { isRevealed: false, outcome: displays };
};
const bomb = cell("💣");

const oneByOneBombMap = () => [[bomb]];
const oneByOneSuccessMap = () => [[cell("0")]];

describe("Minesweeper game", () => {
  mockInitialBombMap.mockReturnValue([
    [bomb, cell("1")],
    [cell("1"), cell("1")],
  ]);
  describe("on initial render", () => {
    it("should show the game name", () => {
      render(<Minesweeper />);
      expect(screen.getByText("Minesweeper")).toBeInTheDocument();
    });

    it("should show the game board", () => {
      render(<Minesweeper />);
      expect(screen.getByTestId("game-board")).toBeInTheDocument();
    });

    it("should show all the buttons on the game board", () => {
      render(<Minesweeper />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(4);
    });

    it("should not show a play again button", () => {
      render(<Minesweeper />);
      expect(screen.queryByText("Play again")).not.toBeInTheDocument();
    });
  });

  describe("when different rows and columns are selected", () => {
    it("should show the correct number of buttons", async () => {
      mockInitialBombMap.mockImplementation((rows, cols) => {
        return Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => cell("1"))
        );
      });

      const user = userEvent.setup();
      render(<Minesweeper />);

      await act(async () => {
        await user.selectOptions(screen.getByLabelText("Rows"), "5");
      });
      await act(async () => {
        await user.selectOptions(screen.getByLabelText("Columns"), "5");
      });

      await waitFor(() => {
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(25);
      });
    });
  });

  describe("when a button is clicked", () => {
    it("should show the number under the button when you click the button", async () => {
      mockInitialBombMap.mockReturnValue(oneByOneSuccessMap());
      const user = userEvent.setup();
      render(<Minesweeper rows={1} columns={1} />);
      expect(screen.queryByText("0")).not.toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
      await user.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("0")).toBeInTheDocument();
      });
    });
  });

  describe("when the game concludes", () => {
    it("shows a failure message when you click on a bomb", async () => {
      mockInitialBombMap.mockReturnValue(oneByOneBombMap());
      const user = userEvent.setup();
      render(<Minesweeper rows={1} columns={1} />);
      expect(screen.getByText("Good luck!")).toBeInTheDocument();

      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText("Sorry, you lose!")).toBeInTheDocument();
      });
    });

    it("shows a success message when you click on all non-bomb cells", async () => {
      mockInitialBombMap.mockReturnValue(oneByOneSuccessMap());
      const user = userEvent.setup();
      render(<Minesweeper rows={1} columns={1} />);
      expect(screen.getByText("Good luck!")).toBeInTheDocument();

      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText("Congratulations!")).toBeInTheDocument();
      });
    });

    it("doesn't allow any more buttons to be clicked", async () => {
      mockInitialBombMap.mockReturnValue([
        [bomb, cell("1")],
        [cell("1"), cell("1")],
      ]);
      render(<Minesweeper rows={2} columns={2} />);
      const button = screen.getAllByRole("button")[0];
      userEvent.click(button);
      await waitFor(() => {
        expect(screen.getAllByRole("button")[0]).toBeDisabled();
      });
    });

    it("shows a play again button when you lose", async () => {
      mockInitialBombMap.mockReturnValue(oneByOneBombMap());
      const user = userEvent.setup();
      render(<Minesweeper rows={1} columns={1} />);
      expect(screen.getByText("Good luck!")).toBeInTheDocument();

      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(
          screen.getByText("Play again", { selector: "button" })
        ).toBeInTheDocument();
      });
    });

    it("resets the gameboard when you click play again", async () => {
      mockInitialBombMap.mockReturnValue(oneByOneBombMap());
      const user = userEvent.setup();
      render(<Minesweeper rows={1} columns={1} />);
      expect(screen.getByText("Good luck!")).toBeInTheDocument();

      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(
          screen.getByText("Play again", { selector: "button" })
        ).toBeInTheDocument();
      });

      await user.click(screen.getByText("Play again", { selector: "button" }));

      await waitFor(() => {
        expect(screen.getByText("Good luck!")).toBeInTheDocument();
      });
    });
  });
});
