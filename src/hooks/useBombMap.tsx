import React from "react";
import buildInitialBombMap from "./buildInitialBombMap";

export default function useBombMap(
  rows: number,
  columns: number
): {
  bombMap: { isRevealed: boolean; outcome: string }[][];
  revealCell: (i: number, j: number) => void;
} {
  const [bombMap, setBombMap] = React.useState(() => {
    return buildInitialBombMap(rows, columns);
  });

  const revealCell = (i: number, j: number): void => {
    setBombMap((prev) => {
      const updated = [...prev];
      updated[i] = [...updated[i]];
      updated[i][j] = { ...updated[i][j], isRevealed: true };
      return updated;
    });
  };

  return { bombMap, revealCell };
}
