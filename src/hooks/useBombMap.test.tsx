import { act, renderHook, waitFor } from "@testing-library/react";
import useBombMap from "./useBombMap";
import { Outcome } from "../enums/Outcome";

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

  it("should return a function to toggle the flag on a cell", async () => {
    const { result } = renderHook(() => useBombMap(2, 2));
    expect(result.current.bombMap[1][0].isFlagged).toBe(false);
    act(() => {
      result.current.toggleFlag(1, 0);
    });
    await waitFor(() => {
      expect(result.current.bombMap[1][0].isFlagged).toBe(true);
    });
    act(() => {
      result.current.toggleFlag(1, 0);
    });
    await waitFor(() => {
      expect(result.current.bombMap[1][0].isFlagged).toBe(false);
    });
  });

  it("should return an outcome of success when you reveal all the good squares", async () => {
    const { result } = renderHook(() => useBombMap(1, 1));
    expect(result.current.outcome).toBe(Outcome.Uncertain);

    act(() => {
      result.current.revealCell(0, 0);
    });

    await waitFor(() => {
      expect(result.current.bombMap[0][0].isRevealed).toBe(true);
    });
    await waitFor(() => {
      expect(result.current.outcome).toBe(Outcome.Success);
    });
  });

  it("should return an outcome of failure when you reveal a bomb", async () => {
    const { result } = renderHook(() => useBombMap(1, 2));
    expect(result.current.outcome).toBe(Outcome.Uncertain);

    act(() => {
      result.current.revealCell(0, 0);
    });

    act(() => {
      result.current.revealCell(0, 1);
    });

    await waitFor(() => {
      expect(result.current.outcome).toBe(Outcome.Failure);
    });
  });

  it("handles index out of range requests for revealCell", () => {
    const { result } = renderHook(() => useBombMap(1, 1));
    expect(result.current.outcome).toBe(Outcome.Uncertain);

    act(() => {
      result.current.revealCell(1, 1);
    });

    expect(result.current.outcome).toBe(Outcome.Uncertain);
  });

  it("should reset the game when you call resetGame", async () => {
    const { result } = renderHook(() => useBombMap(1, 1));
    expect(result.current.outcome).toBe(Outcome.Uncertain);

    act(() => {
      result.current.revealCell(0, 0);
    });

    await waitFor(() => {
      expect(result.current.outcome).toBe(Outcome.Success);
    });

    act(() => {
      result.current.resetGame();
    });

    await waitFor(() => {
      expect(result.current.outcome).toBe(Outcome.Uncertain);
      expect(result.current.bombMap[0][0].isRevealed).toBe(false);
    });
  });
});
