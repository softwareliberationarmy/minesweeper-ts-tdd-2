import buildInitialBombMap, {
  getBombCount,
  getBombLocations,
} from "./buildInitialBombMap";

describe("build initial bomb map", () => {
  it("should return just a single 0 for a 1x1 grid", () => {
    expect(buildInitialBombMap(1, 1)).toEqual([
      [{ isRevealed: false, outcome: "" }],
    ]);
  });

  it("should return a 1x2 grid with one bomb and one 1", () => {
    const result = buildInitialBombMap(1, 2);
    const allCells = result.flat();
    const bombCount = allCells.filter((cell) => cell.outcome === "💣");
    expect(bombCount).toHaveLength(1);
    const onesCount = allCells.filter((cell) => cell.outcome === "1");
    expect(onesCount).toHaveLength(1);
  });

  it("should return a 2x2 grid with one bomb and three 1s", () => {
    const result = buildInitialBombMap(2, 2);
    const allCells = result.flat();
    const bombCount = allCells.filter((cell) => cell.outcome === "💣");
    expect(bombCount).toHaveLength(1);
    const onesCount = allCells.filter((cell) => cell.outcome === "1");
    expect(onesCount).toHaveLength(3);
  });

  it("should return a 1x4 grid with at least one empty outcome", () => {
    const result = buildInitialBombMap(1, 4);
    const allCells = result.flat();
    const emptyCount = allCells.filter((cell) => cell.outcome === "");
    expect(emptyCount).not.toHaveLength(0);
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
    { cells: 16, bombs: 3 },
    { cells: 17, bombs: 4 },
  ];

  testValues.forEach(({ cells, bombs }) => {
    it(`should return ${bombs} for a grid of ${cells}`, () => {
      expect(getBombCount(cells)).toEqual(bombs);
    });
  });
});

describe("get bomb locations", () => {
  it("should return an array of 0 for a 1x1 grid", () => {
    expect(getBombLocations(1, 0)).toEqual([]);
  });

  it("should return an array of 1 for a 1x2 grid", () => {
    const locations = getBombLocations(2, 1);
    expect(locations.length).toEqual(1);
    expect(locations[0]).toBeGreaterThan(-1);
    expect(locations[0]).toBeLessThan(2);
  });

  it("should return an array of 1 for a grid of 4", () => {
    const locations = getBombLocations(4, 1);
    expect(locations.length).toEqual(1);
    expect(locations[0]).toBeGreaterThan(-1);
    expect(locations[0]).toBeLessThan(4);
  });

  it("doesn't include duplicate values", () => {
    const locations = getBombLocations(2, 2);
    expect(locations.length).toEqual(2);
    expect(locations.includes(0)).toBeTruthy();
    expect(locations.includes(1)).toBeTruthy();
  });
});
