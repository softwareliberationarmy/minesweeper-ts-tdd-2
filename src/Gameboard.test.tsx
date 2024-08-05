import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Gameboard from "./Gameboard";
import userEvent from "@testing-library/user-event";

const mockBombMap = jest.fn();
jest.mock("./hooks/buildInitialBombMap", () => {
  return jest.fn(() => mockBombMap());
});

describe("Gameboard", () => {
  mockBombMap.mockReturnValue([
    [
      { isRevealed: false, outcome: "X" },
      { isRevealed: false, outcome: "1" },
    ],
    [
      { isRevealed: false, outcome: "1" },
      { isRevealed: false, outcome: "1" },
    ],
  ]);
  describe("on initial render", () => {
    it("should show the game name", () => {
      render(<Gameboard />);
      expect(screen.getByText("Minesweeper")).toBeInTheDocument();
    });

    it("should show the game board", () => {
      render(<Gameboard />);
      expect(screen.getByTestId("game-board")).toBeInTheDocument();
    });

    it("should show all the buttons on the game board", () => {
      render(<Gameboard rows={2} columns={2} />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(4);
    });

    it("should show the number under the button when you click the button", async () => {
      mockBombMap.mockReturnValue([[{ isRevealed: false, outcome: "0" }]]);
      const user = userEvent.setup();
      render(<Gameboard rows={1} columns={1} />);
      expect(screen.queryByText("0")).not.toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
      await user.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("0")).toBeInTheDocument();
      });
    });
  });
});
