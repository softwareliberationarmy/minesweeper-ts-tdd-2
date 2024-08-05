import React from "react";
import useBombMap from "./hooks/useBombMap";

interface Props {
  rows?: number;
  columns?: number;
}

export default function Gameboard({ rows = 2, columns = 2 }: Readonly<Props>) {
  const { bombMap, revealCell } = useBombMap(rows, columns);

  const handleClick = (i: number, j: number) => {
    revealCell(i, j);
  };

  return (
    <div>
      <h1>Minesweeper</h1>
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
