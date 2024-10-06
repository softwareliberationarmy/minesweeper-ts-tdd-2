import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import Gameboard from "./Gameboard";
import { Outcome } from "./enums/Outcome";
import "@testing-library/jest-dom";

describe("Game board", () => {
  describe("on initial render", () => {
    const bombMap = [
      [
        { outcome: "💣", isRevealed: false, isFlagged: false },
        { outcome: "1", isRevealed: false, isFlagged: false },
      ],
      [
        { outcome: "1", isRevealed: false, isFlagged: false },
        { outcome: "1", isRevealed: false, isFlagged: false },
      ],
    ];
    it("should show the game board", () => {
      render(
        <Gameboard
          bombMap={bombMap}
          outcome={Outcome.Uncertain}
          revealCell={() => {}}
          toggleFlag={jest.fn()}
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
          toggleFlag={jest.fn()}
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
          toggleFlag={jest.fn()}
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
          toggleFlag={jest.fn()}
        />
      );

      act(() => {
        screen.getAllByRole("button")[0].click();
      });

      await waitFor(() => {
        expect(revealCell).toHaveBeenCalledTimes(1);
      });
    });

    it("should not show any flags at the start", async () => {
      render(
        <Gameboard
          bombMap={bombMap}
          outcome={Outcome.Uncertain}
          revealCell={jest.fn()}
          toggleFlag={jest.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.queryByText("🚩")).toBeNull();
      });
    });

    it("should call toggleFlag when a button is right-clicked", async () => {
      const toggleFlag = jest.fn();
      render(
        <Gameboard
          bombMap={bombMap}
          outcome={Outcome.Uncertain}
          revealCell={jest.fn()}
          toggleFlag={toggleFlag}
        />
      );

      act(() => {
        screen
          .getAllByRole("button")[0]
          .dispatchEvent(new MouseEvent("contextmenu", { bubbles: true }));
      });

      await waitFor(() => {
        expect(toggleFlag).toHaveBeenCalledWith(0, 0);
      });
    });

    it("should post a flag for flagged cells", async () => {
      const flaggedBombMap = [
        [
          { outcome: "💣", isRevealed: false, isFlagged: true },
          { outcome: "1", isRevealed: false, isFlagged: false },
        ],
        [
          { outcome: "1", isRevealed: false, isFlagged: false },
          { outcome: "1", isRevealed: false, isFlagged: false },
        ],
      ];
      render(
        <Gameboard
          bombMap={flaggedBombMap}
          outcome={Outcome.Uncertain}
          revealCell={jest.fn()}
          toggleFlag={jest.fn()}
        />
      );

      await waitFor(() => {
        expect(
          screen.getByText("🚩", { selector: "button" })
        ).toBeInTheDocument();
      });
    });
  });
});
