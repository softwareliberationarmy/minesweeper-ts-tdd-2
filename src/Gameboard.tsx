import React from "react";
import { Outcome } from "./enums/Outcome";

interface GameboardProps {
  bombMap: { isRevealed: boolean; outcome: string; isFlagged: boolean }[][];
  revealCell: (i: number, j: number) => void;
  outcome: Outcome;
  toggleFlag: (i: number, j: number) => void;
}

export default function Gameboard({
  bombMap,
  revealCell,
  outcome,
  toggleFlag,
}: Readonly<GameboardProps>) {
  const handleClick = (i: number, j: number) => {
    revealCell(i, j);
  };

  const handleRightClick = (e: React.MouseEvent, i: number, j: number) => {
    e.preventDefault();
    toggleFlag(i, j);
  };

  return (
    <div className="game-board" data-testid="game-board">
      {bombMap.map((row, i) => (
        <div className="board-row" key={i}>
          {row.map((cell, j) => {
            return cell.isRevealed ? (
              <div
                key={`${i}_${j}`}
                className="cell-outcome"
                data-testid="cell-outcome"
              >
                {cell.outcome}
              </div>
            ) : (
              <button
                key={`${i}_${j}`}
                className="cell-hidden"
                data-testid="cell-hidden"
                disabled={outcome !== Outcome.Uncertain}
                onClick={() => handleClick(i, j)}
                onContextMenu={(e) => handleRightClick(e, i, j)}
              >
                {cell.isFlagged ? "🚩" : ""}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
