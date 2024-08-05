export default function buildInitialBombMap(rows: number, columns: number) {
  return Array.from({ length: rows }).map(() =>
    Array.from({ length: columns }).map(() => {
      return { isRevealed: false, outcome: "0" };
    })
  );
}
