import { act, renderHook, waitFor } from "@testing-library/react";
import useBombMap from "./useBombMap";

describe("use bomb map hook", () => {
  it("should return a 2D array of objects matching the row and column counts", () => {
    const { result } = renderHook(() => useBombMap(2, 3));
    expect(result.current.bombMap.length).toEqual(2);
    result.current.bombMap.forEach((row) => {
      expect(row.length).toEqual(3);
      row.forEach((cell) => {
        expect(cell.isRevealed).toBe(false);
        expect(cell.outcome).not.toBeUndefined();
      });
    });
  });

  it("should return a function to reveal the cells in the array", async () => {
    const { result } = renderHook(() => useBombMap(2, 2));
    expect(result.current.bombMap[1][0].isRevealed).toBe(false);
    act(() => {
      result.current.revealCell(1, 0);
    });
    await waitFor(() => {
      expect(result.current.bombMap[1][0].isRevealed).toBe(true);
    });
  });
});
