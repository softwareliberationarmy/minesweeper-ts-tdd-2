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
  rows = 2,
  columns = 2,
}: Readonly<Props>) {
  const { bombMap, revealCell, outcome, resetGame } = useBombMap(rows, columns);
  const [message, setMessage] = useState<string>("Good luck!");

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

      <Gameboard bombMap={bombMap} revealCell={revealCell} outcome={outcome} />

      {outcome !== Outcome.Uncertain && (
        <button className="play-again" onClick={resetGame}>
          Play again
        </button>
      )}
    </div>
  );
}
