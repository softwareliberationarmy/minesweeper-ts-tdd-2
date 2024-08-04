interface Props {
  rows?: number;
  columns?: number;
}

export default function Gameboard({ rows = 2, columns = 2 }: Props) {
  return (
    <div>
      <h1>Minesweeper</h1>
      <div data-testid="game-board">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i}>
            {Array.from({ length: columns }).map((_, j) => (
              <button key={j} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
