import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import Gameboard from "./Gameboard";
import { Outcome } from "./enums/Outcome";
import "@testing-library/jest-dom";

describe("Game board", () => {
  describe("on initial render", () => {
    const bombMap = [
      [
        { outcome: "💣", isRevealed: false },
        { outcome: "1", isRevealed: false },
      ],
      [
        { outcome: "1", isRevealed: false },
        { outcome: "1", isRevealed: false },
      ],
    ];
    it("should show the game board", () => {
      render(
        <Gameboard
          bombMap={bombMap}
          outcome={Outcome.Uncertain}
          revealCell={() => {}}
        />
      );
      expect(screen.getByTestId("game-board")).toBeInTheDocument();
    });

    it("should show all the buttons on the game board", () => {
      render(
        <Gameboard
          bombMap={bombMap}
          outcome={Outcome.Uncertain}
          revealCell={() => {}}
        />
      );
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(4);
    });

    it("should disable all the buttons when the outcome is certain", () => {
      render(
        <Gameboard
          bombMap={bombMap}
          outcome={Outcome.Success}
          revealCell={() => {}}
        />
      );
      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it("should call reveal cell when a button is clicked", async () => {
      const revealCell = jest.fn();
      render(
        <Gameboard
          bombMap={bombMap}
          outcome={Outcome.Uncertain}
          revealCell={revealCell}
        />
      );

      act(() => {
        screen.getAllByRole("button")[0].click();
      });

      await waitFor(() => {
        expect(revealCell).toHaveBeenCalledTimes(1);
      });
    });
  });
});
