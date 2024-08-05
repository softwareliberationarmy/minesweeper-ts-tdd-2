import buildInitialBombMap, { getBombCount } from "./buildInitialBombMap";

describe("build initial bomb map", () => {
  it("should return just a single 0 for a 1x1 grid", () => {
    expect(buildInitialBombMap(1, 1)).toEqual([
      [{ isRevealed: false, outcome: "0" }],
    ]);
  });

  it("should return a 1x2 grid with one bomb and one 1", () => {
    const result = buildInitialBombMap(1, 2);
    const allCells = result.flat();
    const bombCount = allCells.filter((cell) => cell.outcome === "X");
    expect(bombCount).toHaveLength(1);
    const onesCount = allCells.filter((cell) => cell.outcome === "1");
    expect(onesCount).toHaveLength(1);
  });
});

describe("get bomb count", () => {
  const testValues = [
    { cells: 1, bombs: 0 },
    { cells: 2, bombs: 1 },
    { cells: 3, bombs: 1 },
    { cells: 4, bombs: 1 },
    { cells: 5, bombs: 2 },
    { cells: 6, bombs: 2 },
    { cells: 9, bombs: 2 },
    { cells: 10, bombs: 3 },
  ];

  testValues.forEach(({ cells, bombs }) => {
    it(`should return ${bombs} for a grid of ${cells}`, () => {
      expect(getBombCount(cells)).toEqual(bombs);
    });
  });
});
