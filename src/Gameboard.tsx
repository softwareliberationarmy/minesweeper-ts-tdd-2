import React, { useEffect, useState } from "react";
import useBombMap from "./hooks/useBombMap";
import { Outcome } from "./enums/Outcome";
import "./Gameboard.css";

interface Props {
  rows?: number;
  columns?: number;
}

export default function Gameboard({ rows = 2, columns = 2 }: Readonly<Props>) {
  const { bombMap, revealCell, outcome } = useBombMap(rows, columns);
  const [message, setMessage] = useState<string>("Good luck!");

  const handleClick = (i: number, j: number) => {
    revealCell(i, j);
  };

  useEffect(() => {
    if (outcome === Outcome.Failure) {
      setMessage("Sorry, you lose!");
    } else if (outcome === Outcome.Success) {
      setMessage("Congratulations!");
    } else {
      setMessage("Good luck!");
    }
  }, [outcome]);

  return (
    <div className="board-page">
      <h1>Minesweeper</h1>
      <h2>{message}</h2>
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
                ></button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
