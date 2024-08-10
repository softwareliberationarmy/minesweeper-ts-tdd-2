import { useEffect, useState } from "react";
import buildInitialBombMap from "./buildInitialBombMap";
import { Outcome } from "../enums/Outcome";

export default function useBombMap(rows: number, columns: number) {
  const [bombMap, setBombMap] = useState(() => {
    return buildInitialBombMap(rows, columns);
  });

  const [outcome, setOutcome] = useState(Outcome.Uncertain);

  const revealCell = (i: number, j: number): void => {
    setBombMap((prev) => {
      const updated = [...prev];
      updated[i] = [...updated[i]];
      updated[i][j] = { ...updated[i][j], isRevealed: true };
      return updated;
    });
  };

  useEffect(() => {
    if (
      bombMap.flat().some((cell) => cell.outcome === "X" && cell.isRevealed)
    ) {
      setOutcome(Outcome.Failure);
    } else if (
      bombMap
        .flat()
        .filter((cell) => cell.outcome !== "X")
        .every((cell) => cell.isRevealed)
    ) {
      setOutcome(Outcome.Success);
    }
  }, [bombMap]);

  return { bombMap, revealCell, outcome };
}
