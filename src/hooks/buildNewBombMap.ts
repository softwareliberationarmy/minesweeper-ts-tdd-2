export function getBombCount(cells: number) {
  const bombs = Math.floor(Math.sqrt(cells - 1));
  return bombs;
}

export function getBombLocations(cells: number, bombs: number) {
  const result: number[] = [];
  for (let i = 0; i < bombs; i++) {
    let added = false;
    while (!added) {
      const location = Math.floor(Math.random() * cells);
      if (!result.includes(location)) {
        result.push(location);
        added = true;
      }
    }
  }
  return result;
}

export default function buildNewBombMap(
  rows: number,
  columns: number
): { isRevealed: boolean; outcome: string }[][] {
  const cellCount = rows * columns;
  const bombCount = getBombCount(cellCount);
  const bombLocations = getBombLocations(cellCount, bombCount);

  const result: { isRevealed: boolean; outcome: string }[][] = [];
  for (let row = 0; row < rows; row++) {
    result.push([]);
    for (let col = 0; col < columns; col++) {
      const cellIndex = row * columns + col;
      if (bombLocations.includes(cellIndex)) {
        result[row].push({ isRevealed: false, outcome: "💣" });
      } else {
        result[row].push({ isRevealed: false, outcome: "" });
      }
    }
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (result[row][col].outcome === "💣") {
        //increment the surrounding cells
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              row + i >= 0 &&
              row + i < rows &&
              col + j >= 0 &&
              col + j < columns
            ) {
              if (result[row + i][col + j].outcome !== "💣") {
                result[row + i][col + j].outcome = (
                  +result[row + i][col + j].outcome + 1
                ).toString();
              }
            }
          }
        }
      }
    }
  }

  return result;
}
