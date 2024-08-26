import React, { useEffect, useState } from "react";
import useBombMap from "./hooks/useBombMap";
import { Outcome } from "./enums/Outcome";

interface Props {
  rows?: number;
  columns?: number;
}

export default function Gameboard({ rows = 2, columns = 2 }: Readonly<Props>) {
  const { bombMap, revealCell, outcome } = useBombMap(rows, columns);
  const [message, setMessage] = useState<string>("Good luck!");

  const handleClick = (i: number, j: number) => {
    console.log("revealing cell", { i: i, j: j });

    revealCell(i, j);
  };

  useEffect(() => {
    console.log("outcome changed", outcome);

    if (outcome === Outcome.Failure) {
      console.log("setting message to failure");

      setMessage("Sorry, you lose!");
    } else if (outcome === Outcome.Success) {
      console.log("setting message to success");

      setMessage("Congratulations!");
    } else {
      console.log("setting message to good luck");

      setMessage("Good luck!");
    }
  }, [outcome]);

  return (
    <div>
      <h1>Minesweeper</h1>
      <h2>{message}</h2>
      <div data-testid="game-board">
        {bombMap.map((row, i) => (
          <div key={i}>
            {row.map((cell, j) => {
              return cell.isRevealed ? (
                <div key={`${i}_${j}`} data-testid="cell-outcome">
                  {cell.outcome}
                </div>
              ) : (
                <button
                  key={`${i}_${j}`}
                  data-testid="cell-hidden"
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
