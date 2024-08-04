import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Gameboard from "./Gameboard";

describe("Gameboard", () => {
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
  });
});
