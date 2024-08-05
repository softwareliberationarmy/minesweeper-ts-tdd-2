export function getBombCount(cells: number) {
  const bombs = Math.floor(Math.sqrt(cells - 1));
  return bombs;
}

export default function buildInitialBombMap(rows: number, columns: number) {
  if (rows === 1 && columns === 1) {
    return [[{ isRevealed: false, outcome: "0" }]];
  } else if (rows === 1 && columns === 2) {
    return [
      [
        { isRevealed: false, outcome: "X" },
        { isRevealed: false, outcome: "1" },
      ],
    ];
  }

  return Array.from({ length: rows }).map(() =>
    Array.from({ length: columns }).map(() => {
      return { isRevealed: false, outcome: "0" };
    })
  );
}
