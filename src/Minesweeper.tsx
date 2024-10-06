import React, { useEffect, useState } from "react";
import useBombMap from "./hooks/useBombMap";
import { Outcome } from "./enums/Outcome";
import Gameboard from "./Gameboard";
import "./Minesweeper.css";

interface Props {
  rows?: number;
  columns?: number;
}

export default function Minesweeper({
  rows: defaultRows = 2,
  columns: defaultColumns = 2,
}: Readonly<Props>) {
  const [message, setMessage] = useState<string>("Good luck!");
  const [rows, setRows] = useState<number>(defaultRows);
  const [columns, setColumns] = useState<number>(defaultColumns);
  const { bombMap, revealCell, outcome, resetGame, toggleFlag } = useBombMap(
    rows,
    columns
  );

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

      <div>
        <label htmlFor="row-selector">Rows</label>
        <select
          id="row-selector"
          value={rows}
          onChange={(val) => setRows(+val.currentTarget.value)}
        >
          {generateOptions()}
        </select>
        <label htmlFor="column-selector">Columns</label>
        <select
          id="column-selector"
          value={columns}
          onChange={(val) => setColumns(+val.currentTarget.value)}
        >
          {generateOptions()}
        </select>
      </div>

      <Gameboard
        bombMap={bombMap}
        revealCell={revealCell}
        outcome={outcome}
        toggleFlag={toggleFlag}
      />

      {outcome !== Outcome.Uncertain && (
        <button className="play-again" onClick={resetGame}>
          Play again
        </button>
      )}
    </div>
  );
}

function generateOptions(): React.ReactNode {
  return Array.from({ length: 20 }, (_, i) => (
    <option key={`option${i + 1}`} value={i + 1}>
      {i + 1}
    </option>
  ));
}
